import React from 'react'
import { render, waitFor } from '@testing-library/react'
import GitHubReadme from './github-readme'
import 'whatwg-fetch'

describe('GitHubReadme', () => {
  test('renders the readme.md file', () => {
    render(<GitHubReadme username="lacymorrow" repo="crossover" />)
  })

  // Regression test for https://github.com/lacymorrow/react-github-readme-md/issues/6
  // Formatting (bold/italic/link/code) inside GitHub alert blockquotes must be parsed,
  // not rendered as literal markdown.
  test('parses inline formatting inside GitHub alerts', async () => {
    const markdown = [
      '> [!IMPORTANT]',
      '> This library is **feature-complete** and has a [link](https://example.com) and `code`.',
      '',
      '> [!NOTE]',
      '> *italic* text here.',
    ].join('\n')

    const originalFetch = global.fetch
    global.fetch = jest.fn((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString()
      const hostname = new URL(url).hostname
      if (hostname === 'api.github.com') {
        return Promise.resolve(
          new Response(JSON.stringify({ download_url: 'https://example.com/README.md' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        )
      }
      return Promise.resolve(new Response(markdown, { status: 200 }))
    }) as jest.Mock

    try {
      const { container } = render(<GitHubReadme username="lacymorrow" repo="album-art" />)

      await waitFor(() => {
        expect(container.querySelector('.markdown-alert')).not.toBeNull()
      })

      const importantAlert = container.querySelector('.markdown-alert-important')
      expect(importantAlert).not.toBeNull()
      expect(importantAlert!.querySelector('strong')?.textContent).toBe('feature-complete')
      expect(importantAlert!.querySelector('a')?.getAttribute('href')).toBe('https://example.com')
      expect(importantAlert!.querySelector('code')?.textContent).toBe('code')

      const noteAlert = container.querySelector('.markdown-alert-note')
      expect(noteAlert).not.toBeNull()
      expect(noteAlert!.querySelector('em')?.textContent).toBe('italic')

      expect(container.innerHTML).not.toContain('**feature-complete**')
    } finally {
      global.fetch = originalFetch
    }
  })
  // Regression test for https://github.com/lacymorrow/react-github-readme-md/issues/7
  // A README rendered off github.com must point its relative images and links
  // back at the repository instead of the host page's origin.
  test('resolves relative images and links against the repository', async () => {
    const markdown = [
      '<p align="center">',
      '  <img src="images/logo.png" alt="Logo" width="128">',
      '</p>',
      '',
      '![Demo](images/demo.gif)',
      '',
      '[![Badge](https://img.shields.io/badge.svg)](https://example.com)',
      '',
      '[Contributing](CONTRIBUTING.md)',
    ].join('\n')

    const originalFetch = global.fetch
    global.fetch = jest.fn((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString()
      if (new URL(url).hostname === 'api.github.com') {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              path: 'README.md',
              download_url:
                'https://raw.githubusercontent.com/lacymorrow/vscode-if-end-marker/main/README.md',
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          )
        )
      }
      return Promise.resolve(new Response(markdown, { status: 200 }))
    }) as jest.Mock

    try {
      const { container } = render(
        <GitHubReadme username="lacymorrow" repo="vscode-if-end-marker" />
      )

      await waitFor(() => {
        expect(container.querySelector('img')).not.toBeNull()
      })

      const sources = Array.from(container.querySelectorAll('img')).map((img) =>
        img.getAttribute('src')
      )
      expect(sources).toContain(
        'https://raw.githubusercontent.com/lacymorrow/vscode-if-end-marker/main/images/logo.png'
      )
      expect(sources).toContain(
        'https://raw.githubusercontent.com/lacymorrow/vscode-if-end-marker/main/images/demo.gif'
      )
      // Absolute badge URLs are untouched.
      expect(sources).toContain('https://img.shields.io/badge.svg')

      const hrefs = Array.from(container.querySelectorAll('a')).map((a) =>
        a.getAttribute('href')
      )
      expect(hrefs).toContain(
        'https://github.com/lacymorrow/vscode-if-end-marker/blob/main/CONTRIBUTING.md'
      )
      expect(hrefs).toContain('https://example.com')
    } finally {
      global.fetch = originalFetch
    }
  })
})

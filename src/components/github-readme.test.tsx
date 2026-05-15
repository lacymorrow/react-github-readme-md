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
      if (url.includes('api.github.com')) {
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
})

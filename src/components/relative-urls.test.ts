import { buildReadmeBase, rewriteRelativeUrls } from './relative-urls'

const DOWNLOAD_URL =
  'https://raw.githubusercontent.com/lacymorrow/vscode-if-end-marker/main/README.md'

const base = buildReadmeBase(DOWNLOAD_URL, 'README.md')!

describe('buildReadmeBase', () => {
  test('derives raw and blob bases from the download URL', () => {
    expect(base).toEqual({
      imageDir:
        'https://raw.githubusercontent.com/lacymorrow/vscode-if-end-marker/main/',
      imageRoot:
        'https://raw.githubusercontent.com/lacymorrow/vscode-if-end-marker/main/',
      linkDir: 'https://github.com/lacymorrow/vscode-if-end-marker/blob/main/',
      linkRoot: 'https://github.com/lacymorrow/vscode-if-end-marker/blob/main/',
    })
  })

  test('resolves a README that lives in a subdirectory', () => {
    const nested = buildReadmeBase(
      'https://raw.githubusercontent.com/o/r/main/docs/README.md',
      'docs/README.md'
    )
    expect(nested).toEqual({
      imageDir: 'https://raw.githubusercontent.com/o/r/main/docs/',
      imageRoot: 'https://raw.githubusercontent.com/o/r/main/',
      linkDir: 'https://github.com/o/r/blob/main/docs/',
      linkRoot: 'https://github.com/o/r/blob/main/',
    })
  })

  test('keeps a ref containing slashes intact', () => {
    expect(
      buildReadmeBase(
        'https://raw.githubusercontent.com/o/r/release/v2/README.md',
        'README.md'
      )?.linkRoot
    ).toBe('https://github.com/o/r/blob/release/v2/')
  })

  test('falls back to the README directory for a non-GitHub src', () => {
    expect(buildReadmeBase('https://example.com/docs/README.md')).toEqual({
      imageDir: 'https://example.com/docs/',
      imageRoot: 'https://example.com/docs/',
      linkDir: 'https://example.com/docs/',
      linkRoot: 'https://example.com/docs/',
    })
  })

  test('returns undefined for an unparseable URL', () => {
    expect(buildReadmeBase('not a url')).toBeUndefined()
  })
})

describe('rewriteRelativeUrls', () => {
  test('rewrites a relative markdown image', () => {
    expect(rewriteRelativeUrls('<img src="images/demo.gif" alt="Demo">', base)).toBe(
      '<img src="https://raw.githubusercontent.com/lacymorrow/vscode-if-end-marker/main/images/demo.gif" alt="Demo">'
    )
  })

  test('rewrites a relative raw-HTML image and keeps its other attributes', () => {
    expect(
      rewriteRelativeUrls(
        '<img src="./images/logo.png" alt="Logo" width="128">',
        base
      )
    ).toBe(
      '<img src="https://raw.githubusercontent.com/lacymorrow/vscode-if-end-marker/main/images/logo.png" alt="Logo" width="128">'
    )
  })

  test('resolves a root-relative image against the repository root', () => {
    const nested = buildReadmeBase(
      'https://raw.githubusercontent.com/o/r/main/docs/README.md',
      'docs/README.md'
    )!
    expect(rewriteRelativeUrls('<img src="/images/a.png">', nested)).toBe(
      '<img src="https://raw.githubusercontent.com/o/r/main/images/a.png">'
    )
  })

  test('points relative links at the blob view', () => {
    expect(rewriteRelativeUrls('<a href="CONTRIBUTING.md">Contribute</a>', base)).toBe(
      '<a href="https://github.com/lacymorrow/vscode-if-end-marker/blob/main/CONTRIBUTING.md">Contribute</a>'
    )
  })

  test('leaves absolute URLs, anchors and mailto alone', () => {
    const html = [
      '<img src="https://img.shields.io/badge.svg">',
      '<img src="//cdn.example.com/a.png">',
      '<img src="data:image/png;base64,AAAA">',
      '<a href="#usage">Usage</a>',
      '<a href="mailto:me@lacymorrow.com">Email</a>',
    ].join('')
    expect(rewriteRelativeUrls(html, base)).toBe(html)
  })

  test('leaves escaped markup inside code blocks alone', () => {
    const html =
      '<pre><code>&lt;img src="images/logo.png"&gt;\n</code></pre>'
    expect(rewriteRelativeUrls(html, base)).toBe(html)
  })

  test('preserves single-quoted attributes', () => {
    expect(rewriteRelativeUrls("<img src='images/a.png'>", base)).toBe(
      "<img src='https://raw.githubusercontent.com/lacymorrow/vscode-if-end-marker/main/images/a.png'>"
    )
  })

  test('rewrites a video poster', () => {
    expect(rewriteRelativeUrls('<video poster="images/p.jpg"></video>', base)).toBe(
      '<video poster="https://raw.githubusercontent.com/lacymorrow/vscode-if-end-marker/main/images/p.jpg"></video>'
    )
  })
})

describe('rewriteRelativeUrls: srcset and raw ">"', () => {
  it('resolves every srcset candidate and keeps descriptors', () => {
    const out = rewriteRelativeUrls(
      '<picture><source srcset="dark.png 1x, /img/dark@2x.png 2x, https://x.io/a.png 480w" media="(prefers-color-scheme: dark)"></picture>',
      base
    )
    expect(out).not.toMatch(/srcset="dark\.png/)
    expect(out).toContain('https://x.io/a.png 480w')
    expect(out).toMatch(/srcset="https:\/\/raw\.githubusercontent\.com\/[^ ]*dark\.png 1x, https:\/\/raw\.githubusercontent\.com\/[^ ]*img\/dark@2x\.png 2x, https:\/\/x\.io\/a\.png 480w"/)
  })

  it('resolves a srcset with no space after commas', () => {
    const out = rewriteRelativeUrls('<img srcset="a.png 1x,b.png 2x">', base)
    expect(out).not.toMatch(/srcset="a\.png/)
    expect(out).not.toMatch(/,b\.png/)
  })

  it('rewrites an img whose alt contains a raw ">"', () => {
    const out = rewriteRelativeUrls('<img alt="a > b" src="images/x.png">', base)
    expect(out).toContain('alt="a > b"')
    expect(out).toMatch(/src="https:\/\/raw\.githubusercontent\.com\/.*images\/x\.png"/)
  })
})

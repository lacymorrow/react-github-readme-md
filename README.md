<div align="center">
  <a href="https://github.com/lacymorrow/react-github-readme-md">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lacymorrow/react-github-readme-md/main/.github/assets/logo-horizontal-dark.svg">
      <img src="https://raw.githubusercontent.com/lacymorrow/react-github-readme-md/main/.github/assets/logo-horizontal.svg" alt="react-github-readme-md" width="420">
    </picture>
  </a>

  <p><strong>Render any GitHub README inside a React app</strong> ➔ GitHub styling, dark mode, GFM alerts, heading anchors, fuzzy links.</p>

  <p>
    <a href="https://www.npmjs.com/package/react-github-readme-md"><img alt="npm version" src="https://img.shields.io/npm/v/react-github-readme-md?style=flat"></a>
    <a href="https://www.npmjs.com/package/react-github-readme-md"><img alt="npm downloads" src="https://img.shields.io/npm/dm/react-github-readme-md?style=flat"></a>
    <a href="https://github.com/lacymorrow/react-github-readme-md/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/lacymorrow/react-github-readme-md/ci.yml?style=flat&label=CI"></a>
    <a href="./LICENSE"><img alt="License" src="https://img.shields.io/npm/l/react-github-readme-md?style=flat"></a>
    <a href="https://www.chromatic.com/component?appId=6528a9ef83709c394594fc93&csfId=lacymorrow-react-github-readme-md"><img alt="Storybook" src="https://img.shields.io/badge/Storybook-demo-ff4785?style=flat"></a>
  </p>
</div>

---

> [!IMPORTANT]
> GFM alerts work too! Like this one. Notes, warnings, tips — they all render with the same styling you see on GitHub.

## Features

- Render any Markdown file with **GitHub native styling**
- **Light + dark** modes
- [`marked`](https://github.com/markedjs/marked)-powered with plugins for **GFM alerts**, **heading anchors**, and **fuzzy links**
- Works on both the client and server (SSR-safe)
- TypeScript types included
- Tiny API: one component, two ways to load content

## Install

```bash
npm install react-github-readme-md
```

## Usage

### From a GitHub repo

```jsx
import { GitHubReadme } from "react-github-readme-md";

<GitHubReadme username="lacymorrow" repo="react-github-readme-md" />;
```

### From a path or URL

```jsx
<GitHubReadme src="path/to/my/file.md" />
// or
<GitHubReadme src="https://example.com/some.md" />
```

> [!TIP]
> Live, interactive demo on [Chromatic / Storybook](https://main--6528a9ef83709c394594fc93.chromatic.com).

> [!NOTE]
> `.markdown-body` is `width: 100%` by default so `<pre>` blocks don't overflow. Override via the `className` prop or your own CSS.

## API

### `<GitHubReadme />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `username` | `string` | | GitHub user/org. **Required** if `src` is not provided. |
| `repo` | `string` | | GitHub repo name. **Required** if `src` is not provided. |
| `src` | `string` | | Path or URL to a Markdown file. **Required** if `username` + `repo` aren't provided. |
| `addHeadingIds` | `boolean` | `true` | Adds `id` attributes to headings (via [marked-gfm-heading-id](https://www.npmjs.com/package/marked-gfm-heading-id)) so anchor links work. |
| `linkify` | `boolean` | `false` | Auto-link bare URLs in text (via [marked-linkify-it](https://www.npmjs.com/package/marked-linkify-it)). |
| `className` | `string` | | Forwarded to the rendered container. |

## Plugins

shipped with the box:

- **GFM alerts** — `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`. Via [marked-alert](https://github.com/bent10/marked-extensions/tree/main/packages/alerts). The bundled GitHub styles cover the alert blocks — no Tailwind required.
- **Heading anchors** — Auto-generated `id` slugs. Via [marked-gfm-heading-id](https://www.npmjs.com/package/marked-gfm-heading-id).
- **Fuzzy links** — Bare URLs (e.g. `google.com`) become clickable. Via [marked-linkify-it](https://www.npmjs.com/package/marked-linkify-it).

## Playground

➔ **[Open in StackBlitz](https://stackblitz.com/github/lacymorrow/react-github-readme-md/tree/main/examples/stackblitz)** — a tiny Vite + React + TS app with editable `username` / `repo` inputs that re-renders the chosen README live.

Local copy: [`examples/stackblitz/`](./examples/stackblitz)

## Related

- Other utilities by the author: [shipx](https://github.com/lacymorrow/shipx) · [react-is-online-context](https://github.com/lacymorrow/react-is-online-context).

## Acknowledgments

- [@sindresorhus](https://github.com/sindresorhus) for [generate-github-markdown-css](https://github.com/sindresorhus/generate-github-markdown-css) — the source of the bundled GitHub styles.
- [marked](https://github.com/markedjs/marked) — the markdown parser.
- [marked-alert](https://github.com/bent10/marked-extensions), [marked-gfm-heading-id](https://www.npmjs.com/package/marked-gfm-heading-id), [marked-linkify-it](https://www.npmjs.com/package/marked-linkify-it) — the plugin trifecta.

## License

[MIT](./LICENSE) © [Lacy Morrow](https://lacymorrow.com)

<div align="center">
  <sub>If this saved you time, consider <a href="https://github.com/sponsors/lacymorrow">sponsoring on GitHub</a>, <a href="https://patreon.com/lacymorrow">supporting on Patreon</a>, or <a href="https://buymeacoffee.com/lm">buying a coffee</a>.</sub>
</div>

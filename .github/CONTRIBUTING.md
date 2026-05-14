# Contributing to react-github-readme-md

Thanks for considering a contribution!

## Setup

```bash
git clone https://github.com/lacymorrow/react-github-readme-md.git
cd react-github-readme-md
npm install
```

## Develop

```bash
npm run storybook         # Storybook on :6006
npm run build             # rollup → dist/
npm test                  # jest
```

## Updating GitHub-flavored CSS

```bash
npm run generate-css      # regenerate src/components/github-markdown.css
```

After regenerating, swap the `body` selectors for a `.dark` class so dark mode works (see comment in the script).

## Conventions

- [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`).
- Keep PRs focused.
- The component has one prop API: `username + repo` or `src`. Changes that break either are a major version bump.

## Releasing

```bash
npm run release            # build + publish
```

## Code of conduct

Be kind.

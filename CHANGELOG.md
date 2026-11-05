# Changelog

## [Unreleased]

### Fixed

- Relative images and links now resolve against the repository instead of the
  host page's origin. A README using `images/logo.png` renders that image on
  any site, not a broken-image icon. Images point at `raw.githubusercontent.com`
  and links at the `blob` view, both derived from the README's own download URL,
  so a README in a subdirectory or on a non-default branch resolves correctly.
  Absolute URLs, in-page anchors and `mailto:` are left alone.
- `rollup -c` builds again. The TypeScript plugin now rejects a `declarationDir`
  that sits outside the Rollup output directory, so both bundles share
  `dir: "dist"`. Published file paths are unchanged.
- The published package no longer ships declaration files for tests, stories and
  the StackBlitz example.
- `jest` runs again. `marked` and its extensions are ESM only and were being
  skipped as `node_modules`.

### Added

- Centered README hero, logo (blue Markdown M↓ icon on rounded square), 5 modern badges (incl. Storybook).
- StackBlitz playground (`examples/stackblitz/`) — Vite + React + TS app with live `username` / `repo` inputs.
- `.github/` community files: FUNDING, dependabot, ISSUE_TEMPLATE, PR template, SECURITY, CONTRIBUTING.
- CI smoke-test workflow on Node 18/20/22.
- Branded 1280×640 social preview banner.
- CodeQL security scanning + Dependabot auto-merge workflow.

### Changed

- README: removed the "you may need Tailwind CSS" note for GFM alerts — bundled GitHub styles cover them.
- npm keywords expanded (marked, gfm, renderer, viewer, documentation, react-component).

## [1.3.1] - 2024-09-10

### Fixed

- Fixed an issue with marked component crashing.

### Updated

- Updated to latest versions of marked and related packages
- Updated storybook and eslint
- Synced github css.

## [1.1.0] - 2023-11-15

### Added

- Support for GitHub Flavored Markdown (GFM) alerts
- New `linkify` prop to enable automatic link parsing
- Dark mode support for better theme compatibility
- Storybook integration for component documentation and testing

### Changed

- Improved error handling and logging
- Updated styling to more closely match GitHub's markdown rendering
- Refactored component structure for better maintainability

### Fixed

- Issue with preformatted text overflowing container
- Various minor styling inconsistencies

### Dependencies

- Updated to latest versions of marked and related packages
- Added new dependencies for enhanced markdown parsing (marked-linkify-it, marked-alert)

### Documentation

- Added Storybook stories for light and dark mode examples
- Improved README with more detailed usage instructions and examples

### Development

- Integrated Rollup for more efficient bundling
- Added TypeScript support for improved type safety
- Implemented basic unit testing setup

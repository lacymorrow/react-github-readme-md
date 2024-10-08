# react-github-readme-md [<img src="https://github.com/lacymorrow/crossover/raw/master/src/static/meta/patreon-button.webp" style="height:40px;" height="40" align="right" />](https://www.patreon.com/bePatron?u=55065733)
[![npm version](https://badge.fury.io/js/react-github-readme-md.svg)](https://badge.fury.io/js/react-github-readme-md) [![Maintainability](https://api.codeclimate.com/v1/badges/182efedf2a8b7f1ac89c/maintainability)](https://codeclimate.com/github/lacymorrow/react-github-readme-md/maintainability)

> Render the README.md file of a GitHub Repository in React

[**Storybook Demo**](https://www.chromatic.com/component?appId=6528a9ef83709c394594fc93&csfId=lacymorrow-react-github-readme-md&buildNumber=5&k=6528ae3054fd2afdd25fb253-1200px-interactive-true&h=3&b=-1)

## Features
 * Render any Markdown file with GitHub styling
 * Supports both `light` and `dark` modes
 * Marked plugins add support for fuzzy links, heading anchors, and [GFM alerts](https://github.com/orgs/community/discussions/16925)
 * Works on both the client and server

> [!IMPORTANT]  
> GFM alerts work too!


## Install

Using [NPM](https://npmjs.com):

```bash
$ npm install react-github-readme-md
```


## Usage
```js
import { GitHubReadme } from "react-github-readme-md";

// ...

<GitHubReadme username="lacymorrow" repo="react-github-readme-md" />

// or 
// <GitHubReadme src="path/to/my/file.md />

```

#### Notes

`.markdown-body` class has `width: 100%` by default to prevent `<pre>` elements from overflowing its container. You can override this by passing a `className` prop or setting the `width` in your own CSS.

## API

### `props.username`

The GitHub username.

__**Required**__ _(if `src` is not provided)_
Type: `string`

#### `props.repo`

The specified GitHub repository where the `README.md` is located.

__**Required**__  _(if `src` is not provided)_
Type: `string`

#### `props.src`

A path to a Markdown file. This can be a local path or a URL.

__**Required**__ _(if `username` and `repo` are not provided)_
Type: `string`


#### `props.addHeadingIds`

Uses `marked-gfm-heading-id` to add `id` attributes to headings in the markdown so that `# Heading` becomes `<h1 id="heading">Heading</h1> and anchor links work.

_optional_  
Type: `boolean`
default: `true`

#### `props.linkify`

Uses `marked-linkify-it` to parse fuzzy links in the markdown like google.com and turn them into links.

_optional_  
Type: `boolean`
default: `false`


## Plugins

### Fuzzy Links

See the [marked-linkify-it](https://www.npmjs.com/package/marked-linkify-it) package for more information.

### Heading Anchors

See the [marked-gfm-heading-id](https://www.npmjs.com/package/marked-gfm-heading-id) package for more information.

### GFM Alerts

You may need Tailwind CSS installed for the alerts to display correctly.
See the [marked-alerts](https://github.com/bent10/marked-extensions/tree/main/packages/alerts) package for more information.


## Credit

Thanks to [Sindresorhus](https://github.com/sindresorhus) for his [`generate-github-markdown-css`](https://github.com/sindresorhus/generate-github-markdown-css) repo, used to generate the styles!

##### Also
- [marked](https://github.com/markedjs/marked)
- [marked-gfm-heading-id](https://www.npmjs.com/package/marked-gfm-heading-id)
- [marked-linkify-it](https://www.npmjs.com/package/marked-linkify-it)

## License
[MIT](http://opensource.org/licenses/MIT) © [Lacy Morrow](http://lacymorrow.com)

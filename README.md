# react-github-readme-md [<img src="https://github.com/lacymorrow/crossover/raw/master/src/static/meta/patreon-button.webp" style="height:40px;" height="40" align="right" />](https://www.patreon.com/bePatron?u=55065733)
[![npm version](https://badge.fury.io/js/react-github-readme-md.svg)](https://badge.fury.io/js/react-github-readme-md) [![Maintainability](https://api.codeclimate.com/v1/badges/c3e8871f2b6009bd97e2/maintainability)](https://codeclimate.com/github/lacymorrow/react-github-readme-md/maintainability) [![Try movie-art on RunKit](https://badge.runkitcdn.com/react-github-readme-md.svg)](https://npm.runkit.com/react-github-readme-md)

> Render the README.md file of a GitHub Repository in React

Try switching your system between light and dark mode or add a `.dark` class to a parent element to see the dark theme.

## Features
 * Supports both `light` and `dark` modes
 * Works in both the client and server


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
```


## API

### `props.username`

The GitHub username.

*Required*  
Type: `string`

#### `props.repo`

The specified GitHub repository where the `README.md` is located.

*Required*  
Type: `string`


## Credit

Thanks to [Sindresorhus](https://github.com/sindresorhus) for his [`generate-github-markdown-css`](https://github.com/sindresorhus/generate-github-markdown-css) repo, used to generate the styles!

## License
[MIT](http://opensource.org/licenses/MIT) © [Lacy Morrow](http://lacymorrow.com)

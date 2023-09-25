# react-github-readme-md [<img src="https://github.com/lacymorrow/crossover/raw/master/src/static/meta/patreon-button.webp" style="height:40px;" height="40" align="right" />](https://www.patreon.com/bePatron?u=55065733)
[![npm version](https://badge.fury.io/js/react-github-readme-md.svg)](https://badge.fury.io/js/react-github-readme-md) [![Maintainability](https://api.codeclimate.com/v1/badges/c3e8871f2b6009bd97e2/maintainability)](https://codeclimate.com/github/lacymorrow/react-github-readme-md/maintainability) [![Try movie-art on RunKit](https://badge.runkitcdn.com/react-github-readme-md.svg)](https://npm.runkit.com/react-github-readme-md)

> Render the README.md file of a GitHub Repository in React

Try switching your system between light and dark mode or add a `.dark` class to the `body` element to see the dark theme.

#### [Try it on RunKit](https://runkit.com/lacymorrow/album-art) _([Output](https://runkit.io/lacymorrow/album-art/branches/master?search=Ben+Folds&album=Songs+for+Silverman))_


###### NOTE: Last.fm [cannabilized their own API](https://getsatisfaction.com/lastfm/topics/api-announcement-dac8oefw5vrxq) and broke many applications, including this one. This library now uses Spotify for image data. The usage for `album-art` has changed slightly but is fully backwards-compatible. Please report any errors.


## Features
 * Use anywhere, browser or Node - UMD _([Browser Support](https://caniuse.com/#feat=fetch))_
 * Works in React + NextJS client/server (uses [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch))
 * Promise and Callback API
 * Fetch images for albums or artists
 * Multiple size options
 * Uses Spotify for image data


## Install

Using [NPM](https://npmjs.com):

```bash
$ npm install album-art
```

In the browser:

```html
<!-- albumArt window global -->
<script type="text/javascript" src="https://unpkg.com/album-art"></script>
```
(via Unpkg, or via [JSDelivr](https://cdn.jsdelivr.net/npm/album-art/index.min.js))



## Usage
```js
const albumArt = require( 'album-art' )

await albumArt( 'Rush' ).then( console.log )
//=> http://path/to/rush.jpg
```

##### Callback
```js
await albumArt( 'Rush', ( error, response ) => {
   console.log( response )

   //=> http://path/to/rush.jpg
})
```

##### Usage with album and size options
```js
await albumArt( 'Rush', {album: '2112', size: 'small'} )
  .then( console.log )

//=> http://path/to/rush_2112_small.jpg
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

[MIT](http://opensource.org/licenses/MIT) © [Lacy Morrow](http://lacymorrow.com)

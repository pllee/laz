# laz

Lazily define exports for simplicity and startup speed.  Values are only required when used/evaluated.
Works with npm modules and local requires.

```
npm install laz
```

#Usage

```js
//lib1
module.exports = {
  _: require('_'),
  settings: require('./utils/settings'),
  bookshelf: require('bookshelf')
}

```
Turns in to

```js
//lib1
var lazyRequire = require('laz').lazyRequire(require),
module.exports = lazyRequire({
    _:'_',
    settings: './utils/settings',
    bookshelf: 'bookshelf'
});
```

With laz only what is evaluated will get "required"

```js
var lib1 = require('lib1'),
    settings = lib1.settings;
    console.log(settings);
// only settings is evaluated/required _ and bookshelf are not loaded.
```
This helps for speed but also clarity.  Modules should not need to know if they are being used or not and code using them should not have to list its dependencies.  For example the above example would not kill the process because of https://github.com/tgriesser/bookshelf/issues/405, an issue the bookshelf should have no intention of "fixing"


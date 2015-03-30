```
┌─┐┌─┐┌┐┌┌─┐┬┌─┐┌─┐
│  │ ││││├┤ ││ ┬│ │
└─┘└─┘┘└┘└  ┴└─┘└─┘
```


configo
==================

Hierarchical configuration with files and environment variables for node and the browser.

[![NPM Version](https://img.shields.io/npm/v/configo.svg)](https://www.npmjs.org/package/configo)
[![Code Climate](https://codeclimate.com/github/naoufal/configo/badges/gpa.svg)](https://codeclimate.com/github/naoufal/configo)

## Install

```shell
npm i --save configo
```

## Usage

<span>1. Create a `config` folder at the root of your project.  Within it, create a `default` folder.</span>
```shell
mkdir config
mkdir config/default
```
<span>2. Within the `default` folder, create a [`private.js`](https://github.com/naoufal/configo/blob/master/config/default/private.js) file that exports an `Object` containing your private configuration variables.  Once that's done, create a [`public.js`](https://github.com/naoufal/configo/blob/master/config/default/public.js) file that does the same but for your publicly accessible configuration variables. </span>
```js
// ./config/default/private.js
module.exports = {
  WHO_IS_BATMAN: 'Bruce Wayne'
};
```
```js
// ./config/default/public.js
module.exports = {
  NODE_ENV: process.env.NODE_ENV
};
```
<span>3. Require `configo` on the server and in browsers (using [browserify](http://browserify.org/)) and easily access your configuration variables.</span>
```js
// On the server
var conf = require('configo');

console.log(conf.get('WHO_IS_BATMAN')); // Bruce Wayne
console.log(conf.get('NODE_ENV'));      // production
```
```js
// In browsers
var conf = require('configo');

console.log(conf.get('WHO_IS_BATMAN')); // undefined
console.log(conf.get('NODE_ENV'));      // production
```

_NOTE: Your private configuration variables are not included in the outputted browserify file._

## Functions

### get(key)
Retrieves a key from your config.

__Arguments__
- `key` - The variable you want to retrieve from your configuration.

__Examples__
```js
var conf = require('configo');

var AWS_SECRET_KEY = conf.get('AWS_SECRET_KEY'); // SUPERSECRETAWSSECRETKEY
```
<hr>

### set(key, value)
Overwrites a variable in your configuration or sets a new one if the variable doesn't exist.

__Arguments__
- `key` - The name of the variable you want to overwrite or sets it on your configo instance.
- `value` - The value you want to store.

__Examples__
```js
var conf = require('configo');

conf.set('FOO', 'bar');
console.log(conf.get('FOO')); // bar
```
<hr>

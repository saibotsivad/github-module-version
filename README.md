# github-module-version [![Build Status](https://travis-ci.org/tobiaslabs/github-module-version.svg?branch=master)](https://travis-ci.org/sdmp/github-module-version)

[![Greenkeeper badge](https://badges.greenkeeper.io/saibotsivad/github-module-version.svg)](https://greenkeeper.io/)

For a Github repo, get the most recent commit that changed the `properties.json` file.

Returns the commit information, and the entire `properties.json` object.

# using

Install it the normal way:

```sh
npm install github-module-version
```

You can use it with a callback:

```js
var moduleVersion = require('github-module-version')
var module = {
	user: 'github-user',
	repo: 'repo-name'
}
moduleVersion(module, function(err, data) {
	// data object
})
```

Or you can use it as a promise:

```js
var moduleVersion = require('github-module-version')
var module = {
	user: 'github-user',
	repo: 'repo-name'
}
moduleVersion(module).then(function(data) {
	// data object
}, function(err) {
	// err object
})
```

The data object is an object with the commit and the `properties.json` object, e.g.:

```js
var data = {
	commit: {
		sha: // hash of commit
	},
	properties: {
		version: // version at the commit
	}
}
```

# license

[VOL](http://veryopenlicense.com)

# github-module-version [![Build Status](https://travis-ci.org/tobiaslabs/github-module-version.svg?branch=master)](https://travis-ci.org/sdmp/github-module-version)

[![NPM](https://nodei.co/npm/github-module-version.png)](https://nodei.co/npm/github-module-version/)

For a Github repo, get the most recent commit that changed the `properties.json` file.

Returns the commit information, and the entire `properties.json` object.

# using

Install it the normal way:

	npm install github-module-version

You can use it with a callback:

	var moduleVersion = require('github-module-version')
	var module = {
		user: 'github-user',
		repo: 'repo-name'
	}
	moduleVersion(module, function(err, data) {
		// data object
	})

Or you can use it as a promise:

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

The data object is an object with the commit and the `properties.json` object, e.g.:

	var data = {
		commit: {
			sha: // hash of commit
		},
		properties: {
			version: // version at the commit
		}
	}

# license

Everything in this repository is released under the [VOL](http://veryopenlicense.com).

<3

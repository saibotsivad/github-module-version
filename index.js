var Promise = require('promise')
var https = require('https')
var GitHubApi = require('github')

module.exports = function getRecentCommit(module, cb) {
	var github = new GitHubApi({
		version: '3.0.0',
		protocol: 'https',
		timeout: 5000,
		headers: {
			'user-agent': 'npmupdater'
		}
	})

	var promiseMaybe = new Promise(function(resolve, reject) {
		if (!module || !module.user || !module.repo) {
			reject('Must include Github user and repo.')
		} else {
			github.repos.getCommits({
				user: module.user,
				repo: module.repo,
				path: 'package.json',
				page: 1,
				per_page: 1
			}, function(err, data) {
				if (err) {
					reject({ githubError: err })
				} else {
					if (!Array.isArray(data) || data.length !== 1) {
						reject({ commitDataError: true })
					} else {
						var sha = data[0].sha
						https.get('https://raw.githubusercontent.com/' + module.user + '/' + module.repo + '/' + sha + '/package.json', function(res) {
							res.on('data', function(d) {
								try {
									var properties = JSON.parse(d)
									resolve({
										user: module.user,
										repo: module.repo,
										commit: data[0],
										properties: properties
									})
								} catch (ignore) {
									reject({ jsonParseError: 'Error parsing JSON data of package.json' })
								}
							})
						}).on('error', function(err) {
							reject({
								getPackageJsonError: err,
								sha: sha
							})
						})
					}
				}
			})
		}
	})

	if (typeof cb === 'function') {
		promiseMaybe.then(function(commit) {
			cb(false, commit)
		}, function(err) {
			cb(err)
		})
	} else {
		return promiseMaybe
	}
}

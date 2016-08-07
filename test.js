var test = require('tape')
var moduleVersion = require('./index')

var testRepo = {
	user: 'saibotsivad',
	repo: 'test-github-module-version'
}

test('callback version', function(t) {
	moduleVersion(testRepo, function(err, data) {
		assertCommitProperties(t, err, data)
	})
})

test('promise version', function(t) {
	moduleVersion(testRepo).then(function(data) {
		assertCommitProperties(t, false, data)
	})
})

function assertCommitProperties(t, err, data) {
	t.notOk(err, 'there should not be an error')
	t.ok(data, 'there should be a data object')
	t.ok(data.commit, 'there should be a commit')
	t.equal(data.commit.sha, '1c6f9028750447871f280fab70355636126076f4', 'the commit hash should be correct')
	t.ok(data.properties, 'there should be a properties object')
	t.equal(data.properties.version, '0.0.4', 'the version number should be correct')
	t.equal(data.properties.license, 'VOL', 'it should have the data from the properties.json')
	t.end()
}

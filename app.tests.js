var server = require('./bin/www'),
    superagent = require('superagent'),
    expect = require('expect.js'),
    db = require('./config/mongodb.js').db('sgo'),
    test_files = ['blog'],
    tests_done = [],
    access = db.collection('access');

function runTests(client_tokens) {

    var saw = require('./util/superagent-wrapper.js')(superagent, client_tokens);

    function tearDown(name) {
        tests_done.push(name);
        if (test_files.length === tests_done.length) {
            access.removeById(client_tokens._id, function() {
                console.log('Temporary client access has been deleted!');
            });
        }
    }

    for (var i=0; i < test_files.length; i++) {
        require('./tests/' + test_files[i] + '.tests.js')(saw, expect, tearDown);
    }
}

require('./tests/access.tests.js')(expect, db, runTests);
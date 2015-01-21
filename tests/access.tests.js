module.exports = function(expect, db, finished) {
    describe('access tests', function(){
        it('generating access tokens', function(done){
            var slugify = require('slugify'),
                client_id = slugify(new Date().toISOString()),
                client_secret = slugify(new Date().toUTCString());

            db.collection('access').insert({"client-id": client_id, "client-secret": client_secret}, {}, function(e, result){
                expect(e).to.eql(null);
                done();
                finished(result[0]);
            });
        });
    });
};
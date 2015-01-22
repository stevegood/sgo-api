module.exports = function(superagent, expect, db, finished) {
    describe('access tests', function(){
        it('generating access tokens', function(done){
            var client_tokens = require('../services/token-service').generateClientTokens();

            db.collection('access').insert(client_tokens, {}, function(e, result){
                expect(e).to.eql(null);
                done();
                finished(result[0]);
            });
        });

        it('test random client token generator', function(done){
            superagent.get('http://localhost:3000/access/random-client-tokens')
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(typeof res.body).to.eql('object');
                    expect(res.body["client-id"].length).to.eql(32);
                    expect(res.body["client-secret"].length).to.eql(64);

                    done();
                })
        });
    });
};

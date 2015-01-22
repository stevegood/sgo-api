/**
 * Created by steve on 1/21/15.
 */

var randToken = require('rand-token');

function TokenService() {

    function generateClientTokens() {
        return {
            "client-id": idToken(),
            "client-secret": secretToken()
        }
    }

    function idToken() {
        return randToken.generate(32);
    }

    function secretToken() {
        return randToken.generate(64);
    }

    return {
        generateClientTokens: generateClientTokens
    };
}

module.exports = new TokenService();

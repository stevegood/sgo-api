/**
 * Created by steve on 1/21/15.
 */

var tokenService = require('../services/token-service');

module.exports = function(db) {
    var collection = db.collection('access');
    return {
        generateRandom: function(req, res, next) {
            res.send(tokenService.generateClientTokens());
        }
    }
};

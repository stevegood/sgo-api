module.exports = function(db){

    function invalidTokens(res) {
        res.status = 401;
        res.send({
            status: res.status,
            message: 'Invalid client-id or client-secret!'
        });
    }

    return function(req, res, next) {
        if (!req.header('client-id') || !req.header('client-secret')) {
           invalidTokens(res);
        } else {
            var access = db.collection('access');
            access.findOne({"client-id": req.header('client-id'), "client-secret": req.header('client-secret')}, function(e, result){
                if (!result) {
                    invalidTokens(res);
                } else {
                    next();
                }
            });
        }
    };
};
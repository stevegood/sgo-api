module.exports = function(db) {
    var collection = db.collection('blog'),
        slugify = require('slugify');

    return {
        create: function(req, res, next) {
            req.body.slug = slugify(req.body.title.toLowerCase());
            collection.insert(req.body, {}, function(e, result){
                if (e) return next(e);
                res.send(result[0]);
            });
        },

        delete: function(req, res, next) {
            collection.findOne({slug: req.params.slug}, function(e, result){
                if (e) return next(e);
                collection.removeById(result._id, function(e, result){
                    if (e) return next(e);
                    res.send({message: result === 1 ? 'success' : 'error'});
                });
            });
        },

        withSlug: function(req, res, next) {
            collection.findOne({slug: req.params.slug}, function(e, result){
                if (e) return next(e);
                res.send(result);
            })
        },

        update: function(req, res, next) {
            collection.findOne({slug: req.params.slug}, function(e, result){
                if (e) return next(e);
                var _id = result._id;
                collection.updateById(_id, req.body, function(e, result){
                    if (e) return next(e);
                    collection.findById(_id, function(e, result){
                        if (e) return next(e);
                        res.send(result);
                    });
                });
            });
        },

        list: function(req, res, next) {
            var page = req.query.page || 1,
                limit = req.query.limit || 5;

            if (limit > 25) {
                limit = 25;
            }

            collection.find({}, null, {limit: limit, skip: page-1, sort: [['datePublished', -1]]}).toArray(function(e, result){
                if (e) return next(e);
                res.send(result);
            });
        }
    }
};
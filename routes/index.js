var express = require('express'),
    router = express.Router();

module.exports = function(db){
  var blog = require('./blog.js')(db),
      access = require('./access.js')(db);

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  // blog
  router.post('/v1/blog', blog.create);
  router.get('/v1/blog', blog.list);
  router.get('/v1/blog/:slug', blog.withSlug);
  router.put('/v1/blog/:slug', blog.update);
  router.delete('/v1/blog/:slug', blog.delete);

  // access
  router.get('/access/random-client-tokens', access.generateRandom);

  return router;
};

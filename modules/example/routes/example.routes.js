const Router = require('restify-router').Router;
const router = new Router();

router.post('/example', function(req, res, next) {
  res.send({ status: 'success' });

  return next();
});

module.exports = router;

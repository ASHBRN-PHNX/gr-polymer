const config = require('./build/polymer.json');
const restify = require('restify');
const prpl = require('prpl-server');

const server = restify.createServer();

const basicAuth = function(req, res, next) {
  res.header('WWW-Authenticate', 'Basic realm="Guest Registration App"');

  if (
    !req.authorization ||
    !req.authorization.basic ||
    !req.authorization.basic.password
  ) {
    res.send(401);
    return next(false);
  }

  checkUserPassword(req.authorization.basic.password, function(err, data) {
    if (err || !data) {
      res.send(401);
      return next(false);
    } else return next();
  });
};

server.use(basicAuth);

server.get('/*', prpl.makeHandler('/build/', config));

server.listen(80, () => {
  console.log('%s listening at %s', server.name, server.url);
});

module.exports = app => {
  require('../modules/authenticate/routes/authenticate.v1.routes')(app);
  require('../modules/example/routes/example.v1.routes')(app);
};

const config = require(`../../../config/config.${process.env.NODE_ENV}.js`);

const authenticateController = require('../controllers/authenticate.v1.controller.js');

module.exports = app => {
  const routePath = `${config.PATH}login`;

  app.post(
    { path: routePath, version: '1.0.0' },
    authenticateController.register
  );
};

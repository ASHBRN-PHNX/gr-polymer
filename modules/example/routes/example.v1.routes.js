const config = require(`../../../config/config.${process.env.NODE_ENV}.json`);

const exampleController = require('../controllers/example.v1.controller.js');

module.exports = app => {
  const routePath = `${config.BASE_PATH}example`;

  app.get({ path: routePath, version: '1.0.0' }, exampleController.get);
};

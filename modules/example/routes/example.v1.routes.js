const config = require(`../../../config/config.${process.env.NODE_ENV}.json`);

const exampleController = require('../controllers/example.v1.controller.js');

module.exports = server => {
  const basePath = `${config.server.basePath}example`;

  server.get({ path: basePath, version: '1.0.0' }, exampleController.get);
};

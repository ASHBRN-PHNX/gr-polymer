'use strict';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const prpl = require('prpl-server');
const restify = require('restify');

const config = require(`./config/config.${process.env.NODE_ENV}.json`);
const prplConfig = require('./build/polymer.json');

/**
 * Frontend Server
 */
const prplServer = restify.createServer();

prplServer.get('/*', prpl.makeHandler('./build/', prplConfig));
prplServer.listen(80);

/**
 * Backend Server
 */
const restifyServer = restify.createServer({
  name: config.server.name,
  version: config.server.defaultVersion,
  acceptable: config.server.acceptable,
});

restifyServer.use(restify.plugins.acceptParser(restifyServer.acceptable));
restifyServer.use(restify.plugins.bodyParser());
restifyServer.use(restify.plugins.queryParser());

restifyServer.listen(config.server.port, () => {
  require('./routes/routes')(restifyServer);
});

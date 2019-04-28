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
prplServer.listen(80, () => {
  console.log(`\n\n------------------------------`);
  console.log(`\t PRPL Server `);
  console.log(`------------------------------`);
  console.log(`Listening on port: 80`);
  console.log(`Server name: prplServer`);
});

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
  console.log(`\n------------------------------`);
  console.log(`\t RestifyServer `);
  console.log(`------------------------------`);
  console.log(`Listening on port: ${config.server.port}`);
  console.log(`Server name: ${config.server.name}`);
  console.log(`Environment: ${process.env.NODE_ENV}\n`);

  require('./routes/routes')(restifyServer);
});

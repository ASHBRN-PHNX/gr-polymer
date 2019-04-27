'use strict';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const glob = require('glob');
const path = require('path');
const prpl = require('prpl-server');
const restify = require('restify');

const config = require('./config/config');
const prplConfig = require('./build/polymer.json');

const Router = require('restify-router').Router;
const router = new Router();

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

glob
  .sync(path.join(__dirname, 'modules/*/routes/*.js'))
  .map(file => router.add('/v1', require(file)));

restifyServer.listen(config.server.port);

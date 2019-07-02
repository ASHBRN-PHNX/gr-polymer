'use strict';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const prpl = require('prpl-server');
const restify = require('restify');

const prplConfig = require('./build/polymer.json');

const prplServer = restify.createServer();

prplServer.get('/*', prpl.makeHandler('./build/', prplConfig));

prplServer.listen(80, () => {
  console.log(`\n\n------------------------------`);
  console.log(`\t PRPL Server `);
  console.log(`------------------------------`);
  console.log(`Listening on port: 80`);
  console.log(`Server name: prplServer`);
});

#!/usr/bin/env node
require('babel-polyfill');
require('../lib/cli/index.js')(process.argv.slice(2));

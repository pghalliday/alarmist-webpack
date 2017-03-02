#!/usr/bin/env node
require('babel-polyfill');
require('../lib/cli/index.js').default(process.argv.slice(2));

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cli;

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cli(argv) {
  var args = (0, _minimist2.default)(argv, {
    string: ['name', 'config'],
    alias: {
      name: 'n',
      config: 'c'
    },
    default: {
      name: _constants.DEFAULT_JOB_NAME,
      config: _constants.DEFAULT_WEBPACK_CONFIG
    }
  });
  var config = require(_path2.default.resolve(process.cwd(), args.config));
  _2.default.watch(args.name, config);
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = help;
exports.parse = parse;

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _optionDefault = require('./utils/option-default');

var _optionDefault2 = _interopRequireDefault(_optionDefault);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cliclopts = require('cliclopts');

var _cliclopts2 = _interopRequireDefault(_cliclopts);

var _constants = require('../constants');

var _constants2 = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// istanbul ignore next
var toBool = function toBool(value) {
  return value === 'true';
};

var defaultColor = (0, _optionDefault2.default)(_constants2.FORCE_COLOR_VAR, _constants2.DEFAULT_COLOR_OPTION, toBool);

var defaultWorkingDirectory = (0, _optionDefault2.default)(_constants2.WORKING_DIRECTORY_VAR, _constants2.DEFAULT_WORKING_DIR);

var defaultName = (0, _optionDefault2.default)(_constants2.NAME_VAR, _constants2.DEFAULT_JOB_NAME);

var defaultWebpackConfig = (0, _optionDefault2.default)(_constants2.WEBPACK_CONFIG_VAR, _constants.DEFAULT_WEBPACK_CONFIG);

var cliOpts = (0, _cliclopts2.default)([{
  name: 'name',
  abbr: 'n',
  default: defaultName,
  help: 'The name to use for the job'
}, {
  name: 'working-dir',
  abbr: 'w',
  default: defaultWorkingDirectory,
  help: 'The directory in which to write logs, etc'
}, {
  name: 'config',
  abbr: 'f',
  default: defaultWebpackConfig,
  help: 'webpack config file path'
}, {
  name: 'colors',
  abbr: 'c',
  boolean: true,
  default: defaultColor,
  help: 'turn on colors for webpack stats report'
}, {
  name: 'help',
  abbr: 'h',
  alias: ['?'],
  boolean: true,
  help: 'Show help'
}, {
  name: 'version',
  abbr: 'v',
  boolean: true,
  help: 'Show version number'
}]);

function help() {
  return _constants2.USAGE_TEXT + cliOpts.usage() + '\n';
}

function parse(argv) {
  var parsed = (0, _minimist2.default)(argv, Object.assign(cliOpts.options(), {
    stopEarly: true
  }));
  if (parsed.version) {
    return {
      version: true
    };
  }
  if (parsed.help) {
    return {
      help: true
    };
  }
  if (parsed['working-dir'] instanceof Array) {
    return {
      error: _constants2.MULTIPLE_WORKING_DIRECTORIES_ERROR
    };
  }
  var name = parsed['name'];
  var config = parsed['config'];
  var color = parsed['colors'];
  var workingDir = parsed['working-dir'];
  return {
    name: name,
    config: config,
    color: color,
    workingDir: workingDir,
    help: false,
    version: false
  };
};
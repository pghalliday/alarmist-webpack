'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var WORKING_DIRECTORY_VAR = exports.WORKING_DIRECTORY_VAR = 'ALARMIST_WORKING_DIRECTORY';
var FORCE_COLOR_VAR = exports.FORCE_COLOR_VAR = 'FORCE_COLOR';
var NAME_VAR = exports.NAME_VAR = 'ALARMIST_WEBPACK_NAME';
var WEBPACK_CONFIG_VAR = exports.WEBPACK_CONFIG_VAR = 'ALARMIST_WEBPACK_CONFIG';
var DEFAULT_JOB_NAME = exports.DEFAULT_JOB_NAME = 'webpack';
var DEFAULT_WORKING_DIR = exports.DEFAULT_WORKING_DIR = '.alarmist';
var DEFAULT_COLOR_OPTION = exports.DEFAULT_COLOR_OPTION = true;
var USAGE_TEXT = exports.USAGE_TEXT = '\nUsage: alarmist-webpack [options]\n\nStart webpack in watch mode. The working directory\nshould match the working directory of the monitor and usually this will\nbe the default. If the job is started via a watcher started\nby the monitor then the \'ALARMIST_WORKING_DIRECTORY\' environment\nvariable will have already been set.\n\nEnvironment Variables:\n\n' + FORCE_COLOR_VAR + '\n' + WORKING_DIRECTORY_VAR + '\n' + NAME_VAR + '\n' + WEBPACK_CONFIG_VAR + '\n\nOptions:\n';
// eslint-disable-next-line max-len
var MULTIPLE_WORKING_DIRECTORIES_ERROR = exports.MULTIPLE_WORKING_DIRECTORIES_ERROR = 'Working directory specified multiple times';
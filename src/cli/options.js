import minimist from 'minimist';
import optionDefault from './utils/option-default';
import _ from 'lodash';
import cliclopts from 'cliclopts';
import {
  DEFAULT_WEBPACK_CONFIG,
} from '../constants';
import {
  WORKING_DIRECTORY_VAR,
  FORCE_COLOR_VAR,
  NAME_VAR,
  WEBPACK_CONFIG_VAR,
  DEFAULT_JOB_NAME,
  DEFAULT_WORKING_DIR,
  DEFAULT_COLOR_OPTION,
  MULTIPLE_WORKING_DIRECTORIES_ERROR,
  USAGE_TEXT,
} from './constants';

// istanbul ignore next
const toBool = (value) => value === 'true';

const defaultColor = optionDefault(
  FORCE_COLOR_VAR,
  DEFAULT_COLOR_OPTION,
  toBool,
);

const defaultWorkingDirectory = optionDefault(
  WORKING_DIRECTORY_VAR,
  DEFAULT_WORKING_DIR,
);

const defaultName = optionDefault(
  NAME_VAR,
  DEFAULT_JOB_NAME,
);

const defaultWebpackConfig = optionDefault(
  WEBPACK_CONFIG_VAR,
  DEFAULT_WEBPACK_CONFIG,
);

const cliOpts = cliclopts([{
  name: 'name',
  abbr: 'n',
  default: defaultName,
  help: 'The name to use for the job',
}, {
  name: 'working-dir',
  abbr: 'w',
  default: defaultWorkingDirectory,
  help: 'The directory in which to write logs, etc',
}, {
  name: 'config',
  abbr: 'f',
  default: defaultWebpackConfig,
  help: 'webpack config file path',
}, {
  name: 'colors',
  abbr: 'c',
  boolean: true,
  default: defaultColor,
  help: 'turn on colors for webpack stats report',
}, {
  name: 'help',
  abbr: 'h',
  alias: ['?'],
  boolean: true,
  help: 'Show help',
}, {
  name: 'version',
  abbr: 'v',
  boolean: true,
  help: 'Show version number',
}]);

export function help() {
  return USAGE_TEXT + cliOpts.usage() + '\n';
}

export function parse(argv) {
  const parsed = minimist(argv, Object.assign(cliOpts.options(), {
    stopEarly: true,
  }));
  if (parsed.version) {
    return {
      version: true,
    };
  }
  if (parsed.help) {
    return {
      help: true,
    };
  }
  if (parsed['working-dir'] instanceof Array) {
    return {
      error: MULTIPLE_WORKING_DIRECTORIES_ERROR,
    };
  }
  const name = parsed['name'];
  const config = parsed['config'];
  const color = parsed['colors'];
  const workingDir = parsed['working-dir'];
  return {
    name,
    config,
    color,
    workingDir,
    help: false,
    version: false,
  };
};

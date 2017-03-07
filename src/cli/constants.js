export const WORKING_DIRECTORY_VAR = 'ALARMIST_WORKING_DIRECTORY';
export const FORCE_COLOR_VAR = 'FORCE_COLOR';
export const NAME_VAR = 'ALARMIST_WEBPACK_NAME';
export const WEBPACK_CONFIG_VAR = 'ALARMIST_WEBPACK_CONFIG';
export const DEFAULT_JOB_NAME = 'webpack';
export const DEFAULT_WORKING_DIR = '.alarmist';
export const DEFAULT_COLOR_OPTION = true;
export const USAGE_TEXT = `
Usage: alarmist-webpack [options]

Start webpack in watch mode. The working directory
should match the working directory of the monitor and usually this will
be the default. If the job is started via a watcher started
by the monitor then the 'ALARMIST_WORKING_DIRECTORY' environment
variable will have already been set.

Environment Variables:

${FORCE_COLOR_VAR}
${WORKING_DIRECTORY_VAR}
${NAME_VAR}
${WEBPACK_CONFIG_VAR}

Options:
`;
// eslint-disable-next-line max-len
export const MULTIPLE_WORKING_DIRECTORIES_ERROR = 'Working directory specified multiple times';

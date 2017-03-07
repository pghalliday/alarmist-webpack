import {
  help,
  parse,
} from '../../../src/cli/options';
import _ from 'lodash';
import {
  DEFAULT_WEBPACK_CONFIG,
} from '../../../src/constants';
import {
  DEFAULT_JOB_NAME,
  DEFAULT_WORKING_DIR,
  DEFAULT_COLOR_OPTION,
  MULTIPLE_WORKING_DIRECTORIES_ERROR,
  USAGE_TEXT,
} from '../../../src/cli/constants';

const workingDir = 'working dir';
const name = 'name';
const config = 'webpack config';

const fullVersionOption = [
  '--version',
];

const shortVersionOption = [
  '-v',
];

const fullHelpOption = [
  '--help',
];

const shortHelpOption = [
  '-h',
];

const aliasHelpOption = [
  '-?',
];

const noOptions = [
];

const shortOptions = [
  '-n',
  name,
  '-f',
  config,
  '-c',
  '-w',
  workingDir,
];

const fullOptions = [
  '--name',
  name,
  '--config',
  config,
  '--colors',
  '--working-dir',
  workingDir,
];

const negatedOptions = [
  '--no-colors',
];

const workingDirectories = [
  '--working-dir',
  workingDir,
  '--working-dir',
  workingDir,
];

let options;

describe('cli', () => {
  describe('options', () => {
    describe('#help', () => {
      it('should return the help message', () => {
        help().should.match(
          new RegExp('^' + _.escapeRegExp(USAGE_TEXT))
        );
      });
    });

    describe('#parse', () => {
      _.forEach({
        'with no multiple working directories specified': {
          argv: workingDirectories,
          error: MULTIPLE_WORKING_DIRECTORIES_ERROR,
        },
      }, (value, key) => {
        describe(key, () => {
          before(() => {
            options = parse(value.argv);
          });

          it('should set the error', () => {
            options.error.should.eql(value.error);
          });
        });
      });

      _.forEach({
        'with the full version option': fullVersionOption,
        'with the short version option': shortVersionOption,
      }, (value, key) => {
        describe(key, () => {
          before(() => {
            options = parse(value);
          });

          it('should set the version flag to true', () => {
            options.version.should.eql(true);
          });

          it('should not set the error', () => {
            expect(options.error).to.not.be.ok;
          });
        });
      });

      _.forEach({
        'with the full help option': fullHelpOption,
        'with the short help option': shortHelpOption,
        'with the alias help option': aliasHelpOption,
      }, (value, key) => {
        describe(key, () => {
          before(() => {
            options = parse(value);
          });

          it('should set the help flag to true', () => {
            options.help.should.eql(true);
          });

          it('should not set the error', () => {
            expect(options.error).to.not.be.ok;
          });
        });
      });

      _.forEach({
        'with no options': {
          argv: noOptions,
          name: DEFAULT_JOB_NAME,
          config: DEFAULT_WEBPACK_CONFIG,
          color: DEFAULT_COLOR_OPTION,
          workingDir: DEFAULT_WORKING_DIR,
        },
        'with short options': {
          argv: shortOptions,
          name,
          config,
          color: true,
          workingDir,
        },
        'with full options': {
          argv: fullOptions,
          name,
          config,
          color: true,
          workingDir,
        },
        'with negated options': {
          argv: negatedOptions,
          name: DEFAULT_JOB_NAME,
          config: DEFAULT_WEBPACK_CONFIG,
          color: false,
          workingDir: DEFAULT_WORKING_DIR,
        },
      }, (value, key) => {
        describe(key, () => {
          before(() => {
            options = parse(value.argv);
          });

          it('should set the name', () => {
            options.name.should.eql(value.name);
          });

          it('should set the webpack config', () => {
            options.config.should.eql(value.config);
          });

          it('should set the color option', () => {
            options.color.should.eql(value.color);
          });

          it('should set the working directory', () => {
            options.workingDir.should.eql(value.workingDir);
          });

          it('should set the help flag to false', () => {
            options.help.should.eql(false);
          });

          it('should set the version flag to false', () => {
            options.version.should.eql(false);
          });

          it('should not set the error', () => {
            expect(options.error).to.not.be.ok;
          });
        });
      });
    });
  });
});

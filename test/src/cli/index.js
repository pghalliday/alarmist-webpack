import cli from '../../../src/cli';
import alarmistWebpack from '../../../src';
import path from 'path';
import {
  DEFAULT_WEBPACK_CONFIG,
} from '../../../src/constants';
import {
  DEFAULT_JOB_NAME,
  DEFAULT_COLOR_OPTION,
  DEFAULT_WORKING_DIR,
} from '../../../src/cli/constants';

const config = require(
  path.resolve(process.cwd(), DEFAULT_WEBPACK_CONFIG)
);

describe('cli', () => {
  before(() => {
    sinon.stub(alarmistWebpack, 'watch', () => Promise.resolve());
    cli([]);
  });
  after(() => {
    alarmistWebpack.watch.restore();
  });

  it('should start the watcher', () => {
    alarmistWebpack.watch.should.have.been.calledWith({
      name: DEFAULT_JOB_NAME,
      workingDir: DEFAULT_WORKING_DIR,
      color: DEFAULT_COLOR_OPTION,
      config,
    });
  });
});

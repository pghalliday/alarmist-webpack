import cli from '../../../src/cli';
import alarmistWebpack from '../../../src';
import path from 'path';
import {
  DEFAULT_WEBPACK_CONFIG,
  DEFAULT_JOB_NAME,
} from '../../../src/constants';

const overrideFixture = './test/fixtures/config/override.js';
const overrideConfig = require(path.resolve(process.cwd(), overrideFixture));
const defaultConfig = require(
  path.resolve(process.cwd(), DEFAULT_WEBPACK_CONFIG)
);
const name = 'name';

describe('cli', () => {
  before(() => {
    sinon.stub(alarmistWebpack, 'watch', () => Promise.resolve());
  });
  after(() => {
    alarmistWebpack.watch.restore();
  });

  describe('without a config path or name', () => {
    before(() => {
      alarmistWebpack.watch.reset();
      cli([]);
    });

    it('should start the watcher', () => {
      alarmistWebpack.watch.should.have.been.calledWith(
        DEFAULT_JOB_NAME, defaultConfig
      );
    });
  });

  describe('with a config path', () => {
    before(() => {
      alarmistWebpack.watch.reset();
      cli(['-c', overrideFixture]);
    });

    it('should start the watcher', () => {
      alarmistWebpack.watch.should.have.been.calledWith(
        DEFAULT_JOB_NAME, overrideConfig
      );
    });
  });

  describe('with a name', () => {
    before(() => {
      alarmistWebpack.watch.reset();
      cli(['-n', name]);
    });

    it('should start the watcher', () => {
      alarmistWebpack.watch.should.have.been.calledWith(
        name, defaultConfig
      );
    });
  });
});

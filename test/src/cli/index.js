import cli from '../../../src/cli';
import alarmistWebpack from '../../../src';
import path from 'path';
import {
  DEFAULT_WEBPACK_CONFIG,
} from '../../../src/constants';

const overrideFixture = './test/fixtures/config/override.js';
const overrideConfig = require(path.resolve(process.cwd(), overrideFixture));
const defaultConfig = require(
  path.resolve(process.cwd(), DEFAULT_WEBPACK_CONFIG)
);

describe('cli', () => {
  before(() => {
    sinon.stub(alarmistWebpack, 'watch', () => Promise.resolve());
  });
  after(() => {
    alarmistWebpack.watch.restore();
  });

  describe('without a config path', () => {
    before(() => {
      alarmistWebpack.watch.reset();
      cli([]);
    });

    it('should start the watcher', () => {
      alarmistWebpack.watch.should.have.been.calledWith(defaultConfig);
    });
  });

  describe('with a config path', () => {
    before(() => {
      alarmistWebpack.watch.reset();
      cli([overrideFixture]);
    });

    it('should start the watcher', () => {
      alarmistWebpack.watch.should.have.been.calledWith(overrideConfig);
    });
  });
});

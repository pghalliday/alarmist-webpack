import alarmistWebpack from '../../src';
import alarmist from 'alarmist';
import {job} from '../helpers/alarmist';

const name = 'name';
const workingDir = 'working dir';
const color = false;
let watcher;

describe('alarmistWebpack', () => {
  describe('#watch', () => {
    describe('with a successful build', () => {
      before((done) => {
        job.reset(done);
        watcher = alarmistWebpack.watch({
          name,
          workingDir,
          color,
          config: {
            entry: './test/fixtures/webpack/success/index.js',
            output: {
              path: './.temp',
              filename: 'bundle.js',
            },
          },
        });
      });
      after((done) => {
        watcher.close(done);
      });

      it('should set the job name', () => {
        alarmist.createJob.should.have.been.calledWith({
          name,
          workingDir,
        });
      });

      it('should log the output', () => {
        job.logBuffer.toString().should.match(/Hash:/);
      });

      it('should not submit an error', () => {
        job.end.should.have.been.calledWithExactly(undefined);
      });
    });

    describe('with a failing build', () => {
      before((done) => {
        job.reset(done);
        watcher = alarmistWebpack.watch({
          name,
          workingDir,
          color,
          config: {
            entry: './test/fixtures/webpack/fail/index.js',
            output: {
              path: './.temp',
              filename: 'bundle.js',
            },
          },
        });
      });
      after((done) => {
        watcher.close(done);
      });

      it('should set the job name', () => {
        alarmist.createJob.should.have.been.calledWith({
          name,
          workingDir,
        });
      });

      it('should log the output', () => {
        job.logBuffer.toString().should.match(/Hash:/);
      });

      it('should submit an error', () => {
        job.end.should.have.been.calledWith('webpack build failed');
      });
    });
  });
});

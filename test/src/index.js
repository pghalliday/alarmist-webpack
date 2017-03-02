import alarmistWebpack from '../../src';
import alarmist from 'alarmist';
import {job} from '../helpers/alarmist';

const name = 'name';
let watcher;

describe('alarmistWebpack', () => {
  describe('#watch', () => {
    describe('with a successful build', () => {
      before((done) => {
        job.reset(done);
        watcher = alarmistWebpack.watch(name, {
          entry: './test/fixtures/webpack/success/index.js',
          output: {
            path: './.temp',
            filename: 'bundle.js',
          },
        });
      });
      after((done) => {
        watcher.close(done);
      });

      it('should set the job name', () => {
        alarmist.createJob.should.have.been.calledWith({
          name,
        });
      });

      it('should log the output', () => {
        job.logBuffer.toString().should.match(/Hash:/);
      });

      it('should submit an exit code of 0', () => {
        job.exit.should.have.been.calledWith(0);
      });
    });

    describe('with a failing build', () => {
      before((done) => {
        job.reset(done);
        watcher = alarmistWebpack.watch(name, {
          entry: './test/fixtures/webpack/fail/index.js',
          output: {
            path: './.temp',
            filename: 'bundle.js',
          },
        });
      });
      after((done) => {
        watcher.close(done);
      });

      it('should set the job name', () => {
        alarmist.createJob.should.have.been.calledWith({
          name,
        });
      });

      it('should log the output', () => {
        job.logBuffer.toString().should.match(/Hash:/);
      });

      it('should submit an exit code of 1', () => {
        job.exit.should.have.been.calledWith(1);
      });
    });
  });
});

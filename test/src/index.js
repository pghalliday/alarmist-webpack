import alarmistWebpack from '../../src';
import alarmist from 'alarmist';
import {Writable} from 'stream';

const name = 'name';

const job = {
  complete: sinon.spy(() => job.callback()),
  log: new Writable({
    write: (chunk, encoding, callback) => {
      job.logBuffer = Buffer.concat([job.logBuffer, chunk]);
      callback();
    },
  }),
  reset: (callback) => {
    job.callback = callback;
    job.logBuffer = Buffer.alloc(0);
    job.complete.reset();
  },
};

let watcher;

describe('alarmistWebpack', () => {
  describe('#watch', () => {
    describe('with a successful build', () => {
      before((done) => {
        job.reset(done);
        sinon.stub(alarmist, 'createJob', async () => Promise.resolve(job));
        watcher = alarmistWebpack.watch(name, {
          entry: './test/fixtures/webpack/success/index.js',
          output: {
            path: './.temp',
            filename: 'bundle.js',
          },
        });
      });
      after((done) => {
        alarmist.createJob.restore();
        watcher.close(done);
      });

      it('should set the job name', () => {
        alarmist.createJob.should.have.been.calledWith(name);
      });

      it('should log the output', () => {
        job.logBuffer.toString().should.match(/Hash:/);
      });

      it('should submit an exit code of 0', () => {
        job.complete.should.have.been.calledWith({
          exitCode: 0,
        });
      });
    });

    describe('with a failing build', () => {
      before((done) => {
        job.reset(done);
        sinon.stub(alarmist, 'createJob', async () => Promise.resolve(job));
        watcher = alarmistWebpack.watch(name, {
          entry: './test/fixtures/webpack/fail/index.js',
          output: {
            path: './.temp',
            filename: 'bundle.js',
          },
        });
      });
      after((done) => {
        alarmist.createJob.restore();
        watcher.close(done);
      });

      it('should set the job name', () => {
        alarmist.createJob.should.have.been.calledWith(name);
      });

      it('should log the output', () => {
        job.logBuffer.toString().should.match(/Hash:/);
      });

      it('should submit an exit code of 1', () => {
        job.complete.should.have.been.calledWith({
          exitCode: 1,
        });
      });
    });
  });
});

import alarmist from 'alarmist';
import sinon from 'sinon';
import {Writable} from 'stream';

export const job = {
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

sinon.stub(alarmist, 'createJob', async () => Promise.resolve(job));

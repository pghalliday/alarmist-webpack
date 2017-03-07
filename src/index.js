import _ from 'lodash';
import webpack from 'webpack';
import alarmist from 'alarmist';

function watch({name, config, workingDir, color}) {
  let promiseForJob;
  const compiler = webpack(config);
  compiler.plugin('compile', () => {
    const previousPromise = promiseForJob;
    promiseForJob = alarmist.createJob({
      name,
      workingDir,
    });
    // not sure this can happen (jobs overlapping)
    // but just in case let's clean up
    //
    // istanbul ignore next
    if (!_.isUndefined(previousPromise)) {
      (async () => {
        const previousJob = await previousPromise;
        previousJob.end('aborted: new run started');
      })();
    }
  });
  return compiler.watch({}, (error, stats) => {
    // not sure this can happen (extra handler calls
    // for a finished job) but just in case we will
    // make sure we have an outstanding promise for a job
    //
    // istanbul ignore else
    if (!_.isUndefined(promiseForJob)) {
      (async (promise) => {
        // we have to use promises as it's possible that
        // the webpack build completes before we have a
        // job!
        const job = await promise;
        // tell istanbul to ignore the error case
        // as I don't know how to create this scenario
        // in tests
        //
        // istanbul ignore if
        if (error) {
          job.log.write(error + '\n');
          await job.end(error + '');
        } else {
          job.log.write(stats.toString({
            colors: color,
          }));
          await job.end(stats.hasErrors() ? 'webpack build failed' : undefined);
        }
      })(promiseForJob);
      // finished with promise so unset for safety
      promiseForJob = undefined;
    }
  });
}

module.exports = {
  watch: watch,
};

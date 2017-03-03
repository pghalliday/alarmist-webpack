import _ from 'lodash';
import webpack from 'webpack';
import alarmist from 'alarmist';

function watch(name, config) {
  let job;
  const compiler = webpack(config);
  compiler.plugin('compile', async () => {
    // Not sure if this can happen
    // but don't want to orphan jobs in
    // a pending state
    //
    // istanbul ignore if
    if (!_.isUndefined(job)) {
      await job.end('aborted');
    }
    job = await alarmist.createJob(name);
  });
  return compiler.watch({}, async (error, stats) => {
    // Not sure if this can be undefined
    // but don't want to end the same job twice
    //
    // istanbul ignore else
    if (!_.isUndefined(job)) {
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
          colors: true,
        }));
        await job.end(stats.hasErrors() ? 'webpack build failed' : undefined);
      }
      // finished with job so unset it for safety
      job = undefined;
    }
  });
}

module.exports = {
  watch: watch,
};

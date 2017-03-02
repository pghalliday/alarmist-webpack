import webpack from 'webpack';
import alarmist from 'alarmist';

function watch(name, config) {
  return webpack(config).watch({}, async (error, stats) => {
    const job = await alarmist.createJob({
      name,
    });
    // tell istanbul to ignore the error case
    // as I don't know how to create this scenario
    // in tests
    //
    // istanbul ignore if
    if (error) {
      job.log.write(error + '\n');
      await job.complete(2);
    } else {
      job.log.write(stats.toString({
        colors: true,
      }));
      await job.exit(stats.hasErrors() ? 1 : 0);
    }
  });
}

module.exports = {
  watch: watch,
};

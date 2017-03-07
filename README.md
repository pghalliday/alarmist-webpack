# alarmist-webpack

[![Build Status](https://travis-ci.org/pghalliday/alarmist-webpack.svg?branch=master)](https://travis-ci.org/pghalliday/alarmist-webpack)
[![Build status](https://ci.appveyor.com/api/projects/status/ax6j5e66u61faprs/branch/master?svg=true)](https://ci.appveyor.com/project/pghalliday/alarmist-webpack/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/pghalliday/alarmist-webpack/badge.svg?branch=master)](https://coveralls.io/github/pghalliday/alarmist-webpack?branch=master)

Wrap webpack watch in alarmist jobs

## Usage

As this is a tool linking `webpack` with `alarmist`, it is expected that your project already has both [`alarmist`](https://www.npmjs.com/package/alarmist) and [`webpack`](https://www.npmjs.com/package/webpack) installed

```
npm install webpack alarmist alarmist-webpack
```

You can then add something like the following to your `package.json` scripts

```javascript
{
  ...
  "scripts": {
    ...
    "alarmist:build": "alarmist-webpack -n job-name -c ./path/to/webpack/config",
    ...
  },
  ...
}
```

Then add that script to the watch jobs started by `alarmist-monitor`.

```
Usage: alarmist-webpack [options]

Start webpack in watch mode. The working directory
should match the working directory of the monitor and usually this will
be the default. If the job is started via a watcher started
by the monitor then the 'ALARMIST_WORKING_DIRECTORY' environment
variable will have already been set.

Environment Variables:

FORCE_COLOR
ALARMIST_WORKING_DIRECTORY
ALARMIST_WEBPACK_NAME
ALARMIST_WEBPACK_CONFIG

Options:
    --name, -n            The name to use for the job (default: "webpack")
    --working-dir, -w     The directory in which to write logs, etc (default: ".alarmist")
    --config, -f          webpack config file path (default: "webpack.config.js")
    --colors, -c          turn on colors for webpack stats report (default: true)
    --help, -h            Show help
    --version, -v         Show version number
```

## Contributing

Run lint, tests, build, etc before pushing/submitting PRs

- `npm test` - lint and test
- `npm run build` - run tests then build
- `npm run watch` - watch for changes and run build
- `npm run ci` - run build and submit coverage to coveralls
- `npm start` - watch for changes and build, lint, test, etc in parallel with alarmist

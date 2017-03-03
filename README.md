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

The webpack config path is optional and will default to `./webpack.config.js`.

The job name is optional and will default to `webpack`.

## Contributing

Run lint, tests, build, etc before pushing/submitting PRs

- `npm test` - lint and test
- `npm run build` - run tests then build
- `npm run watch` - watch for changes and run build
- `npm run ci` - run build and submit coverage to coveralls
- `npm start` - watch for changes and build, lint, test, etc in parallel with alarmist

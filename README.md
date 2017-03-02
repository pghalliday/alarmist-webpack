# alarmist-webpack

[![Build Status](https://travis-ci.org/pghalliday/alarmist-webpack.svg?branch=master)](https://travis-ci.org/pghalliday/alarmist-webpack)
[![Coverage Status](https://coveralls.io/repos/github/pghalliday/alarmist-webpack/badge.svg?branch=master)](https://coveralls.io/github/pghalliday/alarmist-webpack?branch=master)

Wrap webpack watch in alarmist jobs

## Usage

As this a tool linking `webpack` with `alarmist`, it is expected that your project already has both `alarmist` and `webpack` installed

```
npm install webpack alarmist alarmist-webpack
```

You can then add something like the following to your `package.json` scripts

```
    "webpack:watch:alarmist": "alarmist-webpack ./path/to/webpack/config",
```

Then add that script to the watch jobs started by `alarmist-monitor`.

NB. the webpack config path is optional and will deafult to `./webpack.confog.js`

## npm scripts

- `npm test` - lint and test
- `npm run build` - run tests then build
- `npm run watch` - watch for changes and run build
- `npm run ci` - run build and submit coverage to coveralls

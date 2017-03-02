import alarmistWebpack from '../';
import path from 'path';
import minimist from 'minimist';
import {
  DEFAULT_WEBPACK_CONFIG,
  DEFAULT_JOB_NAME,
} from '../constants';

export default function cli(argv) {
  const args = minimist(argv, {
    string: ['name', 'config'],
    alias: {
      name: 'n',
      config: 'c',
    },
    default: {
      name: DEFAULT_JOB_NAME,
      config: DEFAULT_WEBPACK_CONFIG,
    },
  });
  const config = require(path.resolve(process.cwd(), args.config));
  alarmistWebpack.watch(args.name, config);
}

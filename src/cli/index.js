import alarmistWebpack from '../';
import path from 'path';
import {
  DEFAULT_WEBPACK_CONFIG,
} from '../constants';

export default function cli([configFile = DEFAULT_WEBPACK_CONFIG]) {
  const config = require(path.resolve(process.cwd(), configFile));
  alarmistWebpack.watch(config);
}

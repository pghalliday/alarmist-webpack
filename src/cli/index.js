import alarmistWebpack from '../';
import path from 'path';
import {
  help,
  parse,
} from './options';

export default function cli(argv) {
  const opts = parse(argv);
  // istanbul ignore next
  if (opts.version) {
    console.log(require('../../../package.json').version);
    process.exit(0);
  }
  // istanbul ignore next
  if (opts.help) {
    process.stdout.write(help());
    process.exit(0);
  }
  // istanbul ignore next
  if (opts.error) {
    console.log('ERROR: ' + opts.error);
    process.stdout.write(help());
    process.exit(1);
  }
  const workingDir = opts.workingDir;
  const name = opts.name;
  const color = opts.color;
  const config = require(path.resolve(process.cwd(), opts.config));
  alarmistWebpack.watch({
    name,
    workingDir,
    color,
    config,
  });
}

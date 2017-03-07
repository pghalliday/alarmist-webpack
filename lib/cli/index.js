'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cli;

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _options = require('./options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cli(argv) {
  var opts = (0, _options.parse)(argv);
  // istanbul ignore next
  if (opts.version) {
    console.log(require('../../../package.json').version);
    process.exit(0);
  }
  // istanbul ignore next
  if (opts.help) {
    process.stdout.write((0, _options.help)());
    process.exit(0);
  }
  // istanbul ignore next
  if (opts.error) {
    console.log('ERROR: ' + opts.error);
    process.stdout.write((0, _options.help)());
    process.exit(1);
  }
  var workingDir = opts.workingDir;
  var name = opts.name;
  var color = opts.color;
  var config = require(_path2.default.resolve(process.cwd(), opts.config));
  _2.default.watch({
    name: name,
    workingDir: workingDir,
    color: color,
    config: config
  });
}
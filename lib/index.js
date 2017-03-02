'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _alarmist = require('alarmist');

var _alarmist2 = _interopRequireDefault(_alarmist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function watch(name, config) {
  var _this = this;

  return (0, _webpack2.default)(config).watch({}, function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(error, stats) {
      var job;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _alarmist2.default.createJob(name);

            case 2:
              job = _context.sent;

              if (!error) {
                _context.next = 9;
                break;
              }

              job.log.write(error + '\n');
              _context.next = 7;
              return job.complete({ exitCode: 2 });

            case 7:
              _context.next = 12;
              break;

            case 9:
              job.log.write(stats.toString({
                colors: true
              }));
              _context.next = 12;
              return job.complete({
                exitCode: stats.hasErrors() ? 1 : 0
              });

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

module.exports = {
  watch: watch
};
'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _alarmist = require('alarmist');

var _alarmist2 = _interopRequireDefault(_alarmist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function watch(name, config) {
  var _this = this;

  var job = void 0;
  var compiler = (0, _webpack2.default)(config);
  compiler.plugin('compile', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (_lodash2.default.isUndefined(job)) {
              _context.next = 3;
              break;
            }

            _context.next = 3;
            return job.end('aborted');

          case 3:
            _context.next = 5;
            return _alarmist2.default.createJob(name);

          case 5:
            job = _context.sent;

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
  return compiler.watch({}, function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(error, stats) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_lodash2.default.isUndefined(job)) {
                _context2.next = 11;
                break;
              }

              if (!error) {
                _context2.next = 7;
                break;
              }

              job.log.write(error + '\n');
              _context2.next = 5;
              return job.end(error + '');

            case 5:
              _context2.next = 10;
              break;

            case 7:
              job.log.write(stats.toString({
                colors: true
              }));
              _context2.next = 10;
              return job.end(stats.hasErrors() ? 'webpack build failed' : undefined);

            case 10:
              // finished with job so unset it for safety
              job = undefined;

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}

module.exports = {
  watch: watch
};
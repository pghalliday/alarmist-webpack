'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _alarmist = require('alarmist');

var _alarmist2 = _interopRequireDefault(_alarmist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function watch(_ref) {
  var _this = this;

  var name = _ref.name,
      config = _ref.config,
      workingDir = _ref.workingDir,
      color = _ref.color;

  var promiseForJob = void 0;
  var compiler = (0, _webpack2.default)(config);
  compiler.plugin('compile', function () {
    var previousPromise = promiseForJob;
    promiseForJob = _alarmist2.default.createJob({
      name: name,
      workingDir: workingDir
    });
    // not sure this can happen (jobs overlapping)
    // but just in case let's clean up
    //
    // istanbul ignore next
    if (!_lodash2.default.isUndefined(previousPromise)) {
      _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var previousJob;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return previousPromise;

              case 2:
                previousJob = _context.sent;

                previousJob.end('aborted: new run started');

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  });
  return compiler.watch({}, function (error, stats) {
    // not sure this can happen (extra handler calls
    // for a finished job) but just in case we will
    // make sure we have an outstanding promise for a job
    //
    // istanbul ignore else
    if (!_lodash2.default.isUndefined(promiseForJob)) {
      (function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(promise) {
          var job;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return promise;

                case 2:
                  job = _context2.sent;

                  if (!error) {
                    _context2.next = 9;
                    break;
                  }

                  job.log.write(error + '\n');
                  _context2.next = 7;
                  return job.end(error + '');

                case 7:
                  _context2.next = 12;
                  break;

                case 9:
                  job.log.write(stats.toString({
                    colors: color
                  }));
                  _context2.next = 12;
                  return job.end(stats.hasErrors() ? 'webpack build failed' : undefined);

                case 12:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      })()(promiseForJob);
      // finished with promise so unset for safety
      promiseForJob = undefined;
    }
  });
}

module.exports = {
  watch: watch
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = cli;

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cli(_ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      _ref2$ = _ref2[0],
      configFile = _ref2$ === undefined ? _constants.DEFAULT_WEBPACK_CONFIG : _ref2$;

  var config = require(_path2.default.resolve(process.cwd(), configFile));
  _2.default.watch(config);
}
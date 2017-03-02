// polyfills
import 'babel-polyfill';

// assertions
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
chai.should();
global.expect = chai.expect;
global.sinon = sinon;

// override the default webpack config path
import constants from '../../src/constants';
constants.DEFAULT_WEBPACK_CONFIG = './test/fixtures/config/default.js';

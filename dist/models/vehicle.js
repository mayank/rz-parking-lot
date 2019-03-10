'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 * @classdesc Vehicle Description
 */
var Vehicle = function (_DBModel) {
  _inherits(Vehicle, _DBModel);

  /**
   * @constructor
   * @params {string} vno: Vehicle No
   * @params {string} color: Color of Car
   */
  function Vehicle(vno, color) {
    _classCallCheck(this, Vehicle);

    var _this = _possibleConstructorReturn(this, (Vehicle.__proto__ || Object.getPrototypeOf(Vehicle)).call(this, 'vehicle'));

    _this.db.id = null;
    _this.db.vno = vno;
    _this.db.color = color;
    return _this;
  }

  return Vehicle;
}(_db2.default);

Vehicle.setTable('vehicle');

exports.default = Vehicle;
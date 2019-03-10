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
 * @classdesc Contains Address/Location 
 * of current parking lot
 */
var ParkingLot = function (_DBModel) {
  _inherits(ParkingLot, _DBModel);

  /**
   * @constructor
   * @param {string} name - name of parking lot
   */
  function ParkingLot(name) {
    _classCallCheck(this, ParkingLot);

    var _this = _possibleConstructorReturn(this, (ParkingLot.__proto__ || Object.getPrototypeOf(ParkingLot)).call(this, 'parking_lot'));

    _this.db.name = name;
    return _this;
  }

  return ParkingLot;
}(_db2.default);

ParkingLot.setTable('parking_lot');

exports.default = ParkingLot;
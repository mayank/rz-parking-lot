"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("./db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @class
 * @classdesc Parking Slot Info
 */
var states = {
  FREE: 1,
  BUSY: 2
};

var ParkingSlot =
/*#__PURE__*/
function (_DBModel) {
  _inherits(ParkingSlot, _DBModel);

  /**
   * @param {Number} plid - Parking Lot Ids
   * @param {Number} floorNo - Number of Floor
   * @param {Number} slotNo - Number of the Slot
   * @param {Number} distance - Distance from Exit
   */
  function ParkingSlot(plid, floorNo, slotNo, distance) {
    var _this;

    _classCallCheck(this, ParkingSlot);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ParkingSlot).call(this, 'parking_slot'));
    _this.db.plid = plid;
    _this.db.floor = floorNo;
    _this.db.slotno = slotNo;
    _this.db.distance = distance;
    _this.db.vid = null;
    _this.db.state = states.FREE;
    return _this;
  }

  _createClass(ParkingSlot, [{
    key: "getVehicleId",
    value: function getVehicleId() {
      return this.db.vid;
    }
  }], [{
    key: "states",
    get: function get() {
      return states;
    }
  }]);

  return ParkingSlot;
}(_db.default);

ParkingSlot.setTable('parking_slot');
var _default = ParkingSlot;
exports.default = _default;
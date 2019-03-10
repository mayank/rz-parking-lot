'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 * @classdesc Parking Slot Info
 */
var states = {
    FREE: 1,
    BUSY: 2
};

var ParkingSlot = function (_DBModel) {
    _inherits(ParkingSlot, _DBModel);

    /**
     * @param {Number} plid - Parking Lot Ids
     * @param {Number} floorNo - Number of Floor
     * @param {Number} slotNo - Number of the Slot
     * @param {Number} distance - Distance from Exit
     */

    function ParkingSlot(plid, floorNo, slotNo, distance) {
        _classCallCheck(this, ParkingSlot);

        var _this = _possibleConstructorReturn(this, (ParkingSlot.__proto__ || Object.getPrototypeOf(ParkingSlot)).call(this, 'parking_slot'));

        _this.db.plid = plid;
        _this.db.floor = floorNo;
        _this.db.slotno = slotNo;
        _this.db.distance = distance;
        _this.db.vid = null;
        _this.db.state = states.FREE;
        return _this;
    }

    _createClass(ParkingSlot, [{
        key: 'getVehicleId',
        value: function getVehicleId() {
            return this.db.vid;
        }
    }], [{
        key: 'states',
        get: function get() {
            return states;
        }
    }]);

    return ParkingSlot;
}(_db2.default);

ParkingSlot.setTable('parking_slot');

exports.default = ParkingSlot;
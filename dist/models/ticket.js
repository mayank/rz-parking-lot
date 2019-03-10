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

var states = {
    CREATED: 1,
    PAID: 2,
    LOST: 3,
    INVALID: 4

    /**
     * @class
     * @classdesc Ticket Alloted for Parking
     */
};
var Ticket = function (_DBModel) {
    _inherits(Ticket, _DBModel);

    /**
     * @constructor
     */
    function Ticket(slot, vehicle, parkingLotId) {
        _classCallCheck(this, Ticket);

        var _this = _possibleConstructorReturn(this, (Ticket.__proto__ || Object.getPrototypeOf(Ticket)).call(this, 'ticket'));

        if (vehicle) {
            _this.db.vid = vehicle.getId();
        }
        if (slot) {
            _this.db.slotid = slot.getId();
        }
        _this.db.plid = parkingLotId;
        _this.db.state = states.CREATED;
        _this.db.entry_time = _db2.default.getCurrentTime();
        return _this;
    }

    _createClass(Ticket, [{
        key: 'getVehicleId',
        value: function getVehicleId() {
            return this.db.vid;
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            return this.db.state == states.CREATED;
        }
    }], [{
        key: 'states',
        get: function get() {
            return states;
        }
    }]);

    return Ticket;
}(_db2.default);

Ticket.setTable('ticket');

exports.default = Ticket;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

var _parkingLot = require('../models/parking-lot');

var _parkingLot2 = _interopRequireDefault(_parkingLot);

var _parkingSlot = require('../models/parking-slot');

var _parkingSlot2 = _interopRequireDefault(_parkingSlot);

var _vehicle = require('../models/vehicle');

var _vehicle2 = _interopRequireDefault(_vehicle);

var _ticket = require('../models/ticket');

var _ticket2 = _interopRequireDefault(_ticket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParkingManager = function () {
    function ParkingManager() {
        _classCallCheck(this, ParkingManager);
    }

    _createClass(ParkingManager, [{
        key: 'getParkingLot',
        value: async function getParkingLot(id) {
            var parkingLot = await _db2.default.find(id, _parkingLot2.default);

            var slots = await _db2.default.get({
                plid: parkingLot.getId()
            }, _parkingSlot2.default);

            var vehicleIds = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = slots[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var slot = _step.value;

                    var vehicleId = slot.getVehicleId();
                    if (vehicleId) {
                        vehicleIds.push(vehicleId);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var vehicleMap = {};

            if (vehicleIds.length > 0) {
                var vehicles = await _db2.default.get({
                    id: vehicleIds
                }, _vehicle2.default);

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = vehicles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var vehicle = _step2.value;

                        vehicleMap[vehicle.getId()] = vehicle;
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }

            return {
                slots: slots,
                vehicles: vehicleMap
            };
        }

        /**
         * 
         * @param {String} vehicleNo 
         * @param {String} color 
         * @throws Exception if parking is not available
         */

    }, {
        key: 'park',
        value: async function park(parkingLotId, vehicleNo, color) {
            var vehicles = await _db2.default.get({
                vno: vehicleNo
            }, _vehicle2.default);

            var vehicle = null;
            if (vehicles.length > 0) {
                vehicle = vehicles[0];
            } else {
                vehicle = new _vehicle2.default(vehicleNo, color);
                await vehicle.save();
            }

            // gets the slot
            var updateStatus = await _db2.default.query('\n        UPDATE ' + _parkingSlot2.default.tableName + ' \n         SET \n            state = ' + _parkingSlot2.default.states.BUSY + ',\n            vid = ?\n         WHERE \n            state = ' + _parkingSlot2.default.states.FREE + '\n            and\n            plid = ?\n         ORDER BY distance asc\n         LIMIT 1\n        ', [vehicle.getId(), parkingLotId]);

            if (updateStatus.changedRows > 0) {
                var slots = await _db2.default.get({
                    vid: vehicle.getId()
                }, _parkingSlot2.default);

                var ticket = new _ticket2.default(slots[0], vehicle, parkingLotId);
                await ticket.save();

                return ticket;
            } else {
                throw new Error('No Parking Available!');
            }
        }
    }, {
        key: 'unpark',
        value: async function unpark(parkingLotId, vehicleNo, ticketNo) {
            var vehicle = await _db2.default.get({
                vno: vehicleNo
            }, _vehicle2.default);

            if (vehicle.length > 0) {
                vehicle = vehicle[0];
            }

            var result = await _db2.default.query('UPDATE ' + _ticket2.default.tableName + '\n            SET\n                state = ' + _ticket2.default.states.PAID + ',\n                exit_time = ?\n            WHERE \n                id = ?\n            AND\n                vid = ?\n            AND \n                state = ?\n            AND\n                plid = ?\n            ', [_db2.default.getCurrentTime(), ticketNo, vehicle.getId(), _ticket2.default.states.CREATED, parkingLotId]);

            if (result.changedRows > 0) {
                result = await _db2.default.query('\n                UPDATE ' + _parkingSlot2.default.tableName + '\n                    SET\n                    state = ' + _parkingSlot2.default.states.FREE + ',\n                    vid = NULL\n                WHERE \n                    vid = ?\n                    and\n                    plid = ?\n            ', [vehicle.getId(), parkingLotId]);
            } else {
                throw new Error('Invalid Ticket');
            }
        }

        /**
         * 
         * @param {String} ticketNo 
         */

    }, {
        key: 'payTicket',
        value: function payTicket(ticketNo) {
            var ticket = _ticket2.default.getTicket(ticketNo);
            var parkingSlot = ticket.getSlot();
            var vehicle = parkingSlot.removeVehicle();
            this.parkingLot.markSlotFree(parkingSlot);
            ticket.markAsPaid();
            return vehicle;
        }
    }]);

    return ParkingManager;
}();

exports.default = new ParkingManager();
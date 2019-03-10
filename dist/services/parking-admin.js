'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parkingLot2 = require('../models/parking-lot');

var _parkingLot3 = _interopRequireDefault(_parkingLot2);

var _parkingSlot = require('../models/parking-slot');

var _parkingSlot2 = _interopRequireDefault(_parkingSlot);

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParkingAdmin = function () {
    function ParkingAdmin() {
        _classCallCheck(this, ParkingAdmin);

        this.parkingLots = {};
    }

    /**
     * creates a parking lot
     * with given parameters 
     * @param {JSON} json 
     * @example
     * {
     *     "name": "xyz",
     *     "floors": [{
     *          "no": 1,
     *          "slots": [{
     *              "no": 1,
     *              "distance": 5
     *          }...]
     *     }...]
     * }
     */


    _createClass(ParkingAdmin, [{
        key: 'createParkingLot',
        value: async function createParkingLot(json) {
            await _db2.default.beginTransaction();

            try {
                var _parkingLot = new _parkingLot3.default(json.name);
                await _parkingLot.save();
                console.log(_parkingLot);
                if (json.floors) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = json.floors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var floor = _step.value;

                            if (floor.slots) {
                                var _iteratorNormalCompletion2 = true;
                                var _didIteratorError2 = false;
                                var _iteratorError2 = undefined;

                                try {
                                    for (var _iterator2 = floor.slots[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                        var slot = _step2.value;

                                        var parkingSlot = new _parkingSlot2.default(_parkingLot.getId(), floor.no, slot.no, slot.distance);
                                        await parkingSlot.save();
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
                }
                await _db2.default.commitTransaction();
            } catch (err) {
                await _db2.default.rollback();
                throw new Error('Rollback Transaction');
            }

            return parkingLot.getId();
        }
    }]);

    return ParkingAdmin;
}();

exports.default = new ParkingAdmin();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parkingLot = _interopRequireDefault(require("../models/parking-lot"));

var _parkingSlot = _interopRequireDefault(require("../models/parking-slot"));

var _db = _interopRequireDefault(require("../models/db"));

var _vehicle = _interopRequireDefault(require("../models/vehicle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ParkingAdmin =
/*#__PURE__*/
function () {
  function ParkingAdmin() {
    _classCallCheck(this, ParkingAdmin);
  }

  _createClass(ParkingAdmin, [{
    key: "createParkingLot",
    value: function () {
      var _createParkingLot = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(json) {
        var parkingLot, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, floor, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, slot, parkingSlot;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _db.default.beginTransaction();

              case 2:
                _context.prev = 2;
                parkingLot = new _parkingLot.default(json.name);
                _context.next = 6;
                return parkingLot.save();

              case 6:
                if (!json.floors) {
                  _context.next = 59;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 10;
                _iterator = json.floors[Symbol.iterator]();

              case 12:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 45;
                  break;
                }

                floor = _step.value;

                if (!floor.slots) {
                  _context.next = 42;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 18;
                _iterator2 = floor.slots[Symbol.iterator]();

              case 20:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context.next = 28;
                  break;
                }

                slot = _step2.value;
                parkingSlot = new _parkingSlot.default(parkingLot.getId(), floor.no, slot.no, slot.distance);
                _context.next = 25;
                return parkingSlot.save();

              case 25:
                _iteratorNormalCompletion2 = true;
                _context.next = 20;
                break;

              case 28:
                _context.next = 34;
                break;

              case 30:
                _context.prev = 30;
                _context.t0 = _context["catch"](18);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t0;

              case 34:
                _context.prev = 34;
                _context.prev = 35;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 37:
                _context.prev = 37;

                if (!_didIteratorError2) {
                  _context.next = 40;
                  break;
                }

                throw _iteratorError2;

              case 40:
                return _context.finish(37);

              case 41:
                return _context.finish(34);

              case 42:
                _iteratorNormalCompletion = true;
                _context.next = 12;
                break;

              case 45:
                _context.next = 51;
                break;

              case 47:
                _context.prev = 47;
                _context.t1 = _context["catch"](10);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 51:
                _context.prev = 51;
                _context.prev = 52;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 54:
                _context.prev = 54;

                if (!_didIteratorError) {
                  _context.next = 57;
                  break;
                }

                throw _iteratorError;

              case 57:
                return _context.finish(54);

              case 58:
                return _context.finish(51);

              case 59:
                _context.next = 61;
                return _db.default.commit();

              case 61:
                return _context.abrupt("return", parkingLot.getId());

              case 64:
                _context.prev = 64;
                _context.t2 = _context["catch"](2);
                _context.next = 68;
                return _db.default.rollback();

              case 68:
                throw new Error('Some Error Occured');

              case 69:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 64], [10, 47, 51, 59], [18, 30, 34, 42], [35,, 37, 41], [52,, 54, 58]]);
      }));

      function createParkingLot(_x) {
        return _createParkingLot.apply(this, arguments);
      }

      return createParkingLot;
    }()
  }, {
    key: "getParkingLot",
    value: function () {
      var _getParkingLot = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        var parkingLot, slots, vehicleMap, results, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, slot, vehicleId, vehicleIds, vehicles, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, vehicle, slotId;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _db.default.find(id, _parkingLot.default);

              case 2:
                parkingLot = _context2.sent;

                if (parkingLot) {
                  _context2.next = 5;
                  break;
                }

                throw new Error('Parking Lot not Exists');

              case 5:
                _context2.next = 7;
                return _db.default.get({
                  plid: parkingLot.getId()
                }, _parkingSlot.default);

              case 7:
                slots = _context2.sent;
                vehicleMap = {};
                results = {};
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context2.prev = 13;

                for (_iterator3 = slots[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  slot = _step3.value;
                  vehicleId = slot.getVehicleId();

                  if (vehicleId) {
                    vehicleMap[vehicleId] = slot.getId();
                  }

                  results[slot.getId()] = {
                    slot_no: slot.getSlotNo(),
                    floor_no: slot.getFloorNo()
                  };
                }

                _context2.next = 21;
                break;

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](13);
                _didIteratorError3 = true;
                _iteratorError3 = _context2.t0;

              case 21:
                _context2.prev = 21;
                _context2.prev = 22;

                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                  _iterator3.return();
                }

              case 24:
                _context2.prev = 24;

                if (!_didIteratorError3) {
                  _context2.next = 27;
                  break;
                }

                throw _iteratorError3;

              case 27:
                return _context2.finish(24);

              case 28:
                return _context2.finish(21);

              case 29:
                vehicleIds = Object.keys(vehicleMap);

                if (!(vehicleIds.length > 0)) {
                  _context2.next = 53;
                  break;
                }

                _context2.next = 33;
                return _db.default.get({
                  id: vehicleIds
                }, _vehicle.default);

              case 33:
                vehicles = _context2.sent;
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context2.prev = 37;

                for (_iterator4 = vehicles[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  vehicle = _step4.value;
                  slotId = vehicleMap[vehicle.getId()];
                  results[slotId].vehicle_no = vehicle.getVehicleNo();
                  results[slotId].vehicle_color = vehicle.getVehicleColor();
                }

                _context2.next = 45;
                break;

              case 41:
                _context2.prev = 41;
                _context2.t1 = _context2["catch"](37);
                _didIteratorError4 = true;
                _iteratorError4 = _context2.t1;

              case 45:
                _context2.prev = 45;
                _context2.prev = 46;

                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                  _iterator4.return();
                }

              case 48:
                _context2.prev = 48;

                if (!_didIteratorError4) {
                  _context2.next = 51;
                  break;
                }

                throw _iteratorError4;

              case 51:
                return _context2.finish(48);

              case 52:
                return _context2.finish(45);

              case 53:
                return _context2.abrupt("return", Object.values(results));

              case 54:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[13, 17, 21, 29], [22,, 24, 28], [37, 41, 45, 53], [46,, 48, 52]]);
      }));

      function getParkingLot(_x2) {
        return _getParkingLot.apply(this, arguments);
      }

      return getParkingLot;
    }()
  }]);

  return ParkingAdmin;
}();

var _default = new ParkingAdmin();

exports.default = _default;
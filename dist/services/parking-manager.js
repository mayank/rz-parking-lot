"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../models/db"));

var _parkingSlot = _interopRequireDefault(require("../models/parking-slot"));

var _vehicle = _interopRequireDefault(require("../models/vehicle"));

var _ticket = _interopRequireDefault(require("../models/ticket"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ParkingManager =
/*#__PURE__*/
function () {
  function ParkingManager() {
    _classCallCheck(this, ParkingManager);
  }

  _createClass(ParkingManager, [{
    key: "search",
    value: function () {
      var _search = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(parkingLotId, params) {
        var query, searchParams;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "\n            SELECT * FROM ".concat(_parkingSlot.default.tableName, " as parkingLot\n            JOIN\n            ").concat(_vehicle.default.tableName, " as vehicle\n            ON \n            parkingLot.vid = vehicle.id\n            WHERE plid = ?\n        ");
                searchParams = [parkingLotId];

                if (params.car) {
                  searchParams.push(params.car);
                  query += " AND vehicle.vno = ?";
                }

                if (params.color) {
                  searchParams.push(params.color);
                  query += " AND vehicle.color = ?";
                }

                _context.next = 6;
                return _db.default.query(query, searchParams);

              case 6:
                return _context.abrupt("return", _context.sent);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function search(_x, _x2) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "park",
    value: function () {
      var _park = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(parkingLotId, vehicleNo, color) {
        var vehicles, vehicle, updateStatus, slots, ticket;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _db.default.get({
                  vno: vehicleNo
                }, _vehicle.default);

              case 2:
                vehicles = _context2.sent;
                vehicle = null;

                if (!(vehicles.length > 0)) {
                  _context2.next = 8;
                  break;
                }

                vehicle = vehicles[0];
                _context2.next = 11;
                break;

              case 8:
                vehicle = new _vehicle.default(vehicleNo, color);
                _context2.next = 11;
                return vehicle.save();

              case 11:
                _context2.prev = 11;
                _context2.next = 14;
                return _db.default.beginTransaction();

              case 14:
                _context2.next = 16;
                return _db.default.query("\n            UPDATE ".concat(_parkingSlot.default.tableName, " \n            SET \n                state = ").concat(_parkingSlot.default.states.BUSY, ",\n                vid = ?\n            WHERE \n                state = ").concat(_parkingSlot.default.states.FREE, "\n                and\n                plid = ?\n            ORDER BY distance asc\n            LIMIT 1\n            "), [vehicle.getId(), parkingLotId]);

              case 16:
                updateStatus = _context2.sent;

                if (!(updateStatus.changedRows > 0)) {
                  _context2.next = 29;
                  break;
                }

                _context2.next = 20;
                return _db.default.get({
                  vid: vehicle.getId()
                }, _parkingSlot.default);

              case 20:
                slots = _context2.sent;
                ticket = new _ticket.default(slots[0], vehicle, parkingLotId);
                _context2.next = 24;
                return ticket.save();

              case 24:
                _context2.next = 26;
                return _db.default.commit();

              case 26:
                return _context2.abrupt("return", ticket);

              case 29:
                throw new Error('No Parking Available');

              case 30:
                _context2.next = 36;
                break;

              case 32:
                _context2.prev = 32;
                _context2.t0 = _context2["catch"](11);
                _context2.next = 36;
                return _db.default.rollback();

              case 36:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[11, 32]]);
      }));

      function park(_x3, _x4, _x5) {
        return _park.apply(this, arguments);
      }

      return park;
    }()
  }, {
    key: "unpark",
    value: function () {
      var _unpark = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(parkingLotId, vehicleNo, ticketNo) {
        var vehicle, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _db.default.get({
                  vno: vehicleNo
                }, _vehicle.default);

              case 2:
                vehicle = _context3.sent;

                if (vehicle.length > 0) {
                  vehicle = vehicle[0];
                }

                _context3.next = 6;
                return _db.default.query("UPDATE ".concat(_ticket.default.tableName, "\n            SET\n                state = ").concat(_ticket.default.states.PAID, ",\n                exit_time = ?\n            WHERE \n                id = ?\n            AND\n                vid = ?\n            AND \n                state = ?\n            AND\n                plid = ?\n            "), [_db.default.getCurrentTime(), ticketNo, vehicle.getId(), _ticket.default.states.CREATED, parkingLotId]);

              case 6:
                result = _context3.sent;

                if (!(result.changedRows > 0)) {
                  _context3.next = 14;
                  break;
                }

                _context3.next = 10;
                return _db.default.query("\n                UPDATE ".concat(_parkingSlot.default.tableName, "\n                    SET\n                    state = ").concat(_parkingSlot.default.states.FREE, ",\n                    vid = NULL\n                WHERE \n                    vid = ?\n                    and\n                    plid = ?\n            "), [vehicle.getId(), parkingLotId]);

              case 10:
                result = _context3.sent;
                return _context3.abrupt("return", true);

              case 14:
                throw new Error('Invalid Ticket');

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function unpark(_x6, _x7, _x8) {
        return _unpark.apply(this, arguments);
      }

      return unpark;
    }()
  }]);

  return ParkingManager;
}();

var _default = new ParkingManager();

exports.default = _default;
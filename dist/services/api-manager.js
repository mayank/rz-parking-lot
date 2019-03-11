"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _parkingAdmin = _interopRequireDefault(require("./parking-admin"));

var _parkingManager = _interopRequireDefault(require("./parking-manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  routes: function routes(app) {
    app.use(_express.default.json());
    app.post('/api/parking-lot/',
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _parkingAdmin.default.createParkingLot(req.body).then(function (parkingLotId) {
                  res.send({
                    'status': 'OK',
                    'message': 'Parking Lot created Successfuly',
                    'id': parkingLotId
                  });
                }).catch(function (err) {
                  res.send({
                    'status': 'Error',
                    'message': 'Some Error Occured building Parking Lot'
                  });
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    app.get('/api/parking-lot/:id',
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = res;
                _context2.next = 3;
                return _parkingManager.default.getParkingLot(req.params.id);

              case 3:
                _context2.t1 = _context2.sent;
                _context2.t2 = {
                  'status': 'OK',
                  'data': _context2.t1
                };

                _context2.t0.send.call(_context2.t0, _context2.t2);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
    app.post('/api/park/:id',
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _parkingManager.default.park(req.params.id, req.body.vehicle_no, req.body.color).then(function (ticket) {
                  res.send({
                    'status': 'OK',
                    'data': ticket
                  });
                }).catch(function (err) {
                  res.send({
                    'status': 'Error',
                    'message': 'No Parking Available'
                  });
                });

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }());
    app.post('/api/unpark/:id',
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _parkingManager.default.unpark(req.params.id, req.body.vehicle_no, req.body.ticket_no).then(function () {
                  res.send({
                    'status': 'OK',
                    'message': 'Unparked Successful'
                  });
                }).catch(function (err) {
                  res.send({
                    'status': 'Error',
                    'message': 'Your Ticket is not Valid, Check with Admin'
                  });
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }());
    app.get('/api/search/:id',
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _parkingManager.default.search(req.params.id, req.query).then(function (slots) {
                  res.send({
                    'status': 'OK',
                    'data': slots
                  });
                }).catch(function (err) {
                  res.send({
                    'status': 'Error',
                    'message': 'Some Error Occured in Search'
                  });
                });

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
      };
    }());
  }
};
exports.default = _default;
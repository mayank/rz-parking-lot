"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../services/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DatabaseModel =
/*#__PURE__*/
function () {
  function DatabaseModel(tableName) {
    _classCallCheck(this, DatabaseModel);

    this.db = {
      id: null
    };
    this.tableName = tableName;
  }

  _createClass(DatabaseModel, [{
    key: "getId",
    value: function getId() {
      return this.db.id;
    }
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var keys, query, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                keys = Object.keys(this.db);
                query = "INSERT INTO ".concat(this.tableName, " SET ?");
                _context.next = 4;
                return _database.default.query(query, this.db);

              case 4:
                result = _context.sent;
                this.db.id = result.insertId;

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }], [{
    key: "beginTransaction",
    value: function () {
      var _beginTransaction = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _database.default.beginTransaction();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function beginTransaction() {
        return _beginTransaction.apply(this, arguments);
      }

      return beginTransaction;
    }()
  }, {
    key: "commit",
    value: function () {
      var _commit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _database.default.commit();

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function commit() {
        return _commit.apply(this, arguments);
      }

      return commit;
    }()
  }, {
    key: "rollback",
    value: function () {
      var _rollback = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _database.default.rollback();

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function rollback() {
        return _rollback.apply(this, arguments);
      }

      return rollback;
    }()
  }, {
    key: "setTable",
    value: function setTable(tableName) {
      this.tableName = tableName;
    }
  }, {
    key: "find",
    value: function () {
      var _find = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id, child) {
        var query, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                query = "SELECT * FROM ".concat(child.tableName, " WHERE id = ?");
                _context5.next = 3;
                return _database.default.query(query, id);

              case 3:
                result = _context5.sent;
                return _context5.abrupt("return", result.length > 0 ? this.create(result[0], child) : null);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function find(_x, _x2) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(obj, child) {
        var query, subquery, key, results, ans, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, db;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                query = "SELECT * FROM ".concat(child.tableName, " WHERE ");
                subquery = [];

                for (key in obj) {
                  if (_typeof(obj[key]) == 'object') {
                    subquery.push([key, '(?)'].join(" in "));
                  } else {
                    subquery.push([key, '?'].join(" = "));
                  }
                }

                query += subquery.join(" and ");
                _context6.next = 6;
                return _database.default.query(query, Object.values(obj));

              case 6:
                results = _context6.sent;
                ans = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context6.prev = 11;

                for (_iterator = results[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  db = _step.value;
                  ans.push(this.create(db, child));
                }

                _context6.next = 19;
                break;

              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](11);
                _didIteratorError = true;
                _iteratorError = _context6.t0;

              case 19:
                _context6.prev = 19;
                _context6.prev = 20;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 22:
                _context6.prev = 22;

                if (!_didIteratorError) {
                  _context6.next = 25;
                  break;
                }

                throw _iteratorError;

              case 25:
                return _context6.finish(22);

              case 26:
                return _context6.finish(19);

              case 27:
                return _context6.abrupt("return", ans);

              case 28:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[11, 15, 19, 27], [20,, 22, 26]]);
      }));

      function get(_x3, _x4) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "query",
    value: function () {
      var _query2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(_query, data) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _database.default.query(_query, data);

              case 2:
                return _context7.abrupt("return", _context7.sent);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function query(_x5, _x6) {
        return _query2.apply(this, arguments);
      }

      return query;
    }()
  }, {
    key: "create",
    value: function create(db, child) {
      var object = new child();
      object.db = db;
      return object;
    }
  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }
  }]);

  return DatabaseModel;
}();

exports.default = DatabaseModel;
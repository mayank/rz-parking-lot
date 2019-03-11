"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _db = _interopRequireDefault(require("../config/db"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DatabaseManager =
/*#__PURE__*/
function () {
  function DatabaseManager() {
    _classCallCheck(this, DatabaseManager);

    this.connection = _mysql.default.createConnection(_db.default);
  }

  _createClass(DatabaseManager, [{
    key: "query",
    value: function query(_query, data) {
      var _this = this;

      return new Promise(function (res, rej) {
        _this.connection.query(_query, data, function (err, result) {
          err ? rej(err) : res(result);
        });
      });
    }
  }, {
    key: "beginTransaction",
    value: function beginTransaction() {
      var _this2 = this;

      return new Promise(function (res, rej) {
        _this2.connection.beginTransaction(function (err) {
          err ? rej(err) : res();
        });
      });
    }
  }, {
    key: "rollback",
    value: function rollback() {
      var _this3 = this;

      return new Promise(function (res) {
        _this3.connection.rollback(function () {
          res();
        });
      });
    }
  }, {
    key: "commit",
    value: function commit() {
      var _this4 = this;

      return new Promise(function (res, rej) {
        _this4.connection.commit(function (err) {
          err ? rej(err) : res();
        });
      });
    }
  }, {
    key: "migrate",
    value: function () {
      var _migrate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var sqlQueries, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, query;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sqlQueries = _fs.default.readFileSync(__dirname + '/../migrations/database.sql', 'utf-8').replace('\n', '').split(';');
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 4;
                _iterator = sqlQueries[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 14;
                  break;
                }

                query = _step.value;

                if (!query.trim()) {
                  _context.next = 11;
                  break;
                }

                _context.next = 11;
                return this.query(query, []);

              case 11:
                _iteratorNormalCompletion = true;
                _context.next = 6;
                break;

              case 14:
                _context.next = 20;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 20:
                _context.prev = 20;
                _context.prev = 21;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 23:
                _context.prev = 23;

                if (!_didIteratorError) {
                  _context.next = 26;
                  break;
                }

                throw _iteratorError;

              case 26:
                return _context.finish(23);

              case 27:
                return _context.finish(20);

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 16, 20, 28], [21,, 23, 27]]);
      }));

      function migrate() {
        return _migrate.apply(this, arguments);
      }

      return migrate;
    }()
  }]);

  return DatabaseManager;
}();

var _default = new DatabaseManager();

exports.default = _default;
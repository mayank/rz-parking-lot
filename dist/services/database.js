"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DatabaseManager =
/*#__PURE__*/
function () {
  function DatabaseManager() {
    _classCallCheck(this, DatabaseManager);

    this.connection = _mysql.default.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: 'parking',
      port: process.env.DB_PASS || 3306
    });
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
    key: "format",
    value: function format(query, data) {
      return this.connection.format(query, data);
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
  }]);

  return DatabaseManager;
}();

var _default = new DatabaseManager();

exports.default = _default;
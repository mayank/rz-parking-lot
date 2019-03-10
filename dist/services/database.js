'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DatabaseManager = function () {
    function DatabaseManager() {
        _classCallCheck(this, DatabaseManager);

        this.pool = _mysql2.default.createPool({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || 'root',
            database: 'parking',
            port: process.env.DB_PASS || 3306
        });
        console.log('MYSQL Connected with Pool');
    }

    _createClass(DatabaseManager, [{
        key: 'query',
        value: function query(_query, data) {
            var _this = this;

            return new Promise(function (res, rej) {
                _this.pool.query(_query, data, function (err, result) {
                    err ? rej(err) : res(result);
                });
            });
        }
    }, {
        key: 'format',
        value: function format(query, data) {
            return this.pool.format(query, data);
        }
    }, {
        key: 'beginTransaction',
        value: function beginTransaction() {
            var _this2 = this;

            return new Promise(function (res, rej) {
                _this2.pool.beginTransaction(function (err) {
                    err ? rej(err) : res();
                });
            });
        }
    }, {
        key: 'rollback',
        value: function rollback() {
            var _this3 = this;

            return new Promise(function (res) {
                _this3.pool.rollback();
            });
        }
    }, {
        key: 'commit',
        value: function commit() {
            var _this4 = this;

            return new Promise(function (res, rej) {
                _this4.pool.commit(function (err) {
                    err ? rej(err) : res();
                });
            });
        }
    }]);

    return DatabaseManager;
}();

// singleton instance


exports.default = new DatabaseManager();
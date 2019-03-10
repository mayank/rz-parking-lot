'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _database = require('../services/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DatabaseModel = function () {
    function DatabaseModel(tableName) {
        _classCallCheck(this, DatabaseModel);

        this.db = {
            id: null
        };
        this.tableName = tableName;
    }

    _createClass(DatabaseModel, [{
        key: 'getId',
        value: function getId() {
            return this.db.id;
        }
    }, {
        key: 'save',
        value: async function save() {
            var keys = Object.keys(this.db);
            var query = 'INSERT INTO ' + this.tableName + ' SET ?';
            var result = await _database2.default.query(query, this.db);
            this.db.id = result.insertId;
        }
    }], [{
        key: 'beginTransaction',
        value: async function beginTransaction() {
            await _database2.default.beginTransaction();
        }
    }, {
        key: 'commit',
        value: async function commit() {
            await _database2.default.commit();
        }
    }, {
        key: 'rollback',
        value: async function rollback() {
            await _database2.default.rollback();
        }
    }, {
        key: 'setTable',
        value: function setTable(tableName) {
            this.tableName = tableName;
        }
    }, {
        key: 'find',
        value: async function find(id, child) {
            var query = 'SELECT * FROM ' + child.tableName + ' WHERE id = ?';
            var result = await _database2.default.query(query, id);
            return result.length > 0 ? this.create(result[0], child) : null;
        }
    }, {
        key: 'get',
        value: async function get(obj, child) {
            var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var query = 'SELECT * FROM ' + child.tableName + ' WHERE ';
            var subquery = [];
            for (var key in obj) {
                subquery.push([key, '?'].join(" = "));
            }
            query += subquery.join(" and ");
            if (count > 0) {
                query += ' LIMIT ' + count;
            }
            var results = await _database2.default.query(query, Object.values(obj));
            var ans = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var db = _step.value;

                    ans.push(this.create(db, child));
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

            return ans;
        }
    }, {
        key: 'query',
        value: async function query(_query, data) {
            return await _database2.default.query(_query, data);
        }
    }, {
        key: 'format',
        value: function format(query, data) {
            return _database2.default.format(query, data);
        }
    }, {
        key: 'create',
        value: function create(db, child) {
            var object = new child();
            object.db = db;
            return object;
        }
    }, {
        key: 'getCurrentTime',
        value: function getCurrentTime() {
            return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        }
    }]);

    return DatabaseModel;
}();

exports.default = DatabaseModel;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apiManager = require('./services/api-manager');

var _apiManager2 = _interopRequireDefault(_apiManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = function () {
    function Server() {
        _classCallCheck(this, Server);

        this.app = (0, _express2.default)();
    }

    _createClass(Server, [{
        key: 'start',
        value: async function start() {
            await this.listen();
            _apiManager2.default.routes(this.app);
            console.log('Server Started');
        }
    }, {
        key: 'listen',
        value: function listen() {
            var _this = this;

            return new Promise(function (res) {
                _this.app.listen(process.env.PORT || 8000, function () {
                    res();
                });
            });
        }
    }]);

    return Server;
}();

// global instance of server


var server = new Server();
server.start();
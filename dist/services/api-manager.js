'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parkingAdmin = require('./parking-admin');

var _parkingAdmin2 = _interopRequireDefault(_parkingAdmin);

var _parkingManager = require('./parking-manager');

var _parkingManager2 = _interopRequireDefault(_parkingManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    routes: function routes(app) {

        // allow only json content
        app.use(_express2.default.json());

        // creates parking lot
        app.post('/api/parking-lot/', async function (req, res) {
            try {
                var parkingLotId = await _parkingAdmin2.default.createParkingLot(req.body);

                res.send({
                    'status': 'OK',
                    'message': 'Parking Lot created Successfuly',
                    'id': parkingLotId
                });
            } catch (err) {
                res.send({
                    'status': 'Error',
                    'message': 'Invalid Parameters'
                });
            }
        });

        // returns parking lot details
        app.get('/api/parking-lot/:id', async function (req, res) {
            res.send({
                'status': 'OK',
                'data': await _parkingManager2.default.getParkingLot(req.params.id)
            });
        });

        // prints ticket for a parking lot
        app.post('/api/park/:id', async function (req, res) {
            try {
                var ticket = await _parkingManager2.default.park(req.params.id, req.body.vehicle_no, req.body.color);
                res.send({
                    'status': 'OK',
                    'data': ticket
                });
            } catch (err) {
                res.send({
                    'status': 'Error',
                    'message': 'No Parking Available'
                });
            }
        });

        // exits the vehicle from parking lot
        app.post('/api/unpark/:id', async function (req, res) {
            await _parkingManager2.default.unpark(req.params.id, req.body.vehicle_no, req.body.ticket_no);
            res.send({
                'status': 'OK',
                'message': 'Unparked Successful'
            });
        });

        // search
        app.get('/api/search/:id', async function (req, res) {
            var slots = _parkingManager2.default.search(req.params.id, req.body);
            res.send({
                'status': 'OK',
                'data': slots
            });
        });
    }
};
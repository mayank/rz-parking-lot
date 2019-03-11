import EXPRESS from 'express'
import ParkingAdmin from './parking-admin'
import ParkingManager from './parking-manager'

export default {
    routes: app => {
        
        app.use(EXPRESS.json())

        /**
         * @api {post} /api/parking-lot/ Creates a new Parking Lot
         * @apiGroup Admin
         *
         * @apiParam {JSON} A Parking lot object
         *
         * @apiSuccess {Number} Id of parking lot
         */
        app.post('/api/parking-lot/', async (req, res) => {
            ParkingAdmin.createParkingLot( req.body )
                .then( parkingLotId => {
                    res.send({
                        'status': 'OK',
                        'message': 'Parking Lot created Successfuly',
                        'id': parkingLotId
                    })
                })
                .catch( err => {
                    res.send({
                        'status': 'Error',
                        'message': 'Some Error Occured building Parking Lot'
                    })
                })
        })

        app.get('/api/parking-lot/:id', async (req, res) => {
            res.send({
                'status': 'OK',
                'data': await ParkingManager.getParkingLot(req.params.id)
            })
        })

        app.post('/api/park/:id', async (req, res) => {
            ParkingManager.park(req.params.id, req.body.vehicle_no, req.body.color)
                .then( ticket => {
                    res.send({
                        'status': 'OK',
                        'data': ticket
                    })
                })
                .catch(err => {
                    res.send({
                        'status': 'Error',
                        'message': 'No Parking Available'
                    })
            })
        })

        app.post('/api/unpark/:id', async( req, res) => {
            ParkingManager.unpark(req.params.id, req.body.vehicle_no, req.body.ticket_no)
                .then(() => {
                    res.send({
                        'status': 'OK',
                        'message': 'Unparked Successful'
                    })
                })
                .catch(err => {
                    res.send({
                        'status': 'Error',
                        'message': 'Your Ticket is not Valid, Check with Admin'
                    })
            })
        })

        app.get('/api/search/:id', async(req, res) => {
            ParkingManager.search(req.params.id, req.query)
                .then( slots => {
                    res.send({
                        'status': 'OK',
                        'data': slots
                    })
                })
                .catch( err => {
                    res.send({
                        'status': 'Error',
                        'message': 'Some Error Occured in Search'
                    })
                })
        })
    }
}
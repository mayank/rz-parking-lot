import EXPRESS from 'express'
import ParkingAdmin from './parking-admin'
import ParkingManager from './parking-manager'

export default {
    routes: app => {
        
        // allow only json content
        app.use(EXPRESS.json())

        // creates parking lot
        app.post('/api/parking-lot/', async (req, res) => {
            try{
                let parkingLotId = await ParkingAdmin.createParkingLot( req.body )

                res.send({
                    'status': 'OK',
                    'message': 'Parking Lot created Successfuly',
                    'id': parkingLotId
                })
            }
            catch(err) {
                res.send({
                    'status': 'Error',
                    'message': 'Invalid Parameters'
                })
            }
        })

        // returns parking lot details
        app.get('/api/parking-lot/:id', async (req, res) => {
            res.send({
                'status': 'OK',
                'data': await ParkingManager.getParkingLot(req.params.id)
            })
        })

        // prints ticket for a parking lot
        app.post('/api/park/:id', async (req, res) => {
            try{
                let ticket = await ParkingManager.park(req.params.id, req.body.vehicle_no, req.body.color)
                res.send({
                    'status': 'OK',
                    'data': ticket
                })
            }
            catch(err) {
                res.send({
                    'status': 'Error',
                    'message': 'No Parking Available'
                })
            }
            
        })

        // exits the vehicle from parking lot
        app.post('/api/unpark/:id', async( req, res) => {
            await ParkingManager.unpark(req.params.id, req.body.vehicle_no, req.body.ticket_no)
            res.send({
                'status': 'OK',
                'message': 'Unparked Successful'
            })
        })

        // search
        app.get('/api/search/:id', async(req, res) => {
            let slots = ParkingManager.search(req.params.id, req.body)
            res.send({
                'status': 'OK',
                'data': slots
            })
        })
    }
}
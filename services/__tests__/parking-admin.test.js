import Chai from 'chai'
import ParkingAdmin from '../parking-admin'

describe('create a parking lot', () => {

    it('creates a parking lot object', () => {
        let manager = new ParkingAdmin()
        let results = manager.createParkingLot({
            "name": "Sector 16, Noida",
            "floors": [{
                "no": 1,
                "slots": [{
                    "no": 1,
                    "distance": 1
                },
                {
                    "no": 2,
                    "distance": 2
                },{
                    "no": 3,
                    "distance": 3
                }]
            }]
        })

        console.log(results)
    })

})
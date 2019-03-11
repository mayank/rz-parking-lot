import ParkingAdmin from '../parking-admin'
import DatabaseManger from '../database'
import Vehicle from '../../models/vehicle'
import ParkingSlot from '../../models/parking-slot'

const name = "fix" + Math.floor(1000 *Math.random())

beforeAll(async () => {
    await DatabaseManger.migrate()
})

describe('create a parking lot', () => {

    let lot = 0
    it('creates a parking lot object', async () => {
        expect.assertions(1)
        let results = await ParkingAdmin.createParkingLot({
            "name": name,
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
        lot = results
        expect(results).toBeGreaterThan(0)
    })

    it('throws error on duplicate name', async () => {
        expect.assertions(1)
        await expect(ParkingAdmin.createParkingLot({
            "name": name,
            "floors": [{
                "no": 1,
                "slots": [{
                    "no": 1,
                    "distance": 1
                }]
            }]
        })).rejects.toThrowError('Some Error Occured')
    })

    it('throws error on invalid duplicate slots', async () => {
        expect.assertions(1)
        await expect(ParkingAdmin.createParkingLot({
            "name": "fix" + Math.floor(1000 *Math.random()),
            "floors": [{
                "no": 1,
                "slots": [{
                    "no": 1,
                    "distance": 1
                },
                {
                    "no": 1,
                    "distance": 5
                }]
            }]
        })).rejects.toThrowError('Some Error Occured')
    })

    it('get parking lot details', async () => {

        let vehicle = new Vehicle("A", "#000000")
        await vehicle.save()
        await DatabaseManger.query(`UPDATE ${ParkingSlot.tableName} set vid = ?, state = ? LIMIT 1`, [vehicle.getId(), ParkingSlot.states.BUSY])

        expect.assertions(2)
        let results = await ParkingAdmin.getParkingLot(lot)
        expect(results).toHaveProperty('length')
        expect(results.length).toBeGreaterThan(0)
    })

    it('trying to get unavailable parking lot', async () => {

        expect.assertions(1)
        await expect(ParkingAdmin.getParkingLot(100000)).rejects.toThrowError('Parking Lot not Exists')
    })
})
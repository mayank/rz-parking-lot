import ParkingManager from '../parking-manager'
import Ticket from '../../models/ticket'
import ParkingAdmin from '../parking-admin'
import DatabaseManger from '../database'
import ParkingSlot from '../../models/parking-slot'

let lotId = 0
beforeAll(async () => {
    await DatabaseManger.migrate()
    lotId = await ParkingAdmin.createParkingLot({
        "name": name,
        "floors": [{
            "no": 1,
            "slots": [{
                "no": 1,
                "distance": 1
            }]
        }]
    })
})


describe('parking, unparking and searching of vehicles', () => {

    let vehicle = Math.floor(Math.random()*10000)
    let ticket = null

    it('parks a vehicle', async () => {
        expect.assertions(4)
        let result = await ParkingManager.park(lotId, vehicle, '#000000')
        expect(result).toHaveProperty('slot')
        expect(result.slot).toBeInstanceOf(ParkingSlot)
        expect(result).toHaveProperty('ticket')
        expect(result.ticket).toBeInstanceOf(Ticket)
        ticket = result.ticket
    })

    it('unparks a vehicle', async () => {
        expect.assertions(1)
        let results = await ParkingManager.unpark(lotId, vehicle, ticket.getId())
        expect(results).toBe(true)
    })

    it('parking same vehicle', async () => {
        expect.assertions(4)
        let result = await ParkingManager.park(lotId, vehicle, '#000000')
        expect(result).toHaveProperty('slot')
        expect(result.slot).toBeInstanceOf(ParkingSlot)
        expect(result).toHaveProperty('ticket')
        expect(result.ticket).toBeInstanceOf(Ticket)
    })

    it('parking full', async () => {
        expect.assertions(1)
        await expect(ParkingManager.park(lotId, 'AZAD', '#000000'))
            .rejects.toThrowError('No Parking Available')
    })

    it('invalid ticket', async () => {
        expect.assertions(1)
        await expect(ParkingManager.unpark(lotId, vehicle, '-100'))
            .rejects.toThrowError('Invalid Ticket')
    })

    it('search slot by vehicle number', async () => {
        expect.assertions(1)
        let slots = await ParkingManager.search(lotId, { car: vehicle})
        expect(slots).toHaveLength(1)
    })

    it('search slot by vehicle color', async () => {
        expect.assertions(2)
        let slots = await ParkingManager.search(lotId, { color: '#000000'})
        expect(slots).toHaveProperty('length')
        expect(slots.length).toBeGreaterThan(0)
    })
})
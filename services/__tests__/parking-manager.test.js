import ParkingManager from '../parking-manager'
import Ticket from '../../models/ticket'

describe('parking, unparking and searching of vehicles', () => {

    let vehicle = Math.floor(Math.random()*10000)
    let ticket = null

    it('parks a vehicle', async () => {
        expect.assertions(1)
        ticket = await ParkingManager.park(1, vehicle, '#000000')
        expect(ticket).toBeInstanceOf(Ticket)
    })

    it('unparks a vehicle', async () => {
        expect.assertions(1)
        let results = await ParkingManager.unpark(1, vehicle, ticket.getId())
        expect(results).toBe(true)
    })

    it('parking same vehicle', async () => {
        expect.assertions(1)
        ticket = await ParkingManager.park(1, vehicle, '#000000')
        expect(ticket).toBeInstanceOf(Ticket)
    })

    it('search slot by vehicle number', async () => {
        expect.assertions(1)
        let slots = await ParkingManager.search(1, { car: vehicle})
        expect(slots).toHaveLength(1)
    })

    it('search slot by vehicle color', async () => {
        expect.assertions(2)
        let slots = await ParkingManager.search(1, { color: '#000000'})
        expect(slots).toHaveProperty('length')
        expect(slots.length).toBeGreaterThan(0)
    })
})
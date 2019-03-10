import DBModel from '../models/db'
import ParkingLot from '../models/parking-lot'
import ParkingSlot from '../models/parking-slot'
import Vehicle from '../models/vehicle'
import Ticket from '../models/ticket'

class ParkingManager {

    async getParkingLot(id) {
        let parkingLot = await DBModel.find(id, ParkingLot)

        let slots = await DBModel.get({
            plid: parkingLot.getId()
        }, ParkingSlot)
        
        let vehicleIds = []
        for(let slot of slots) {
            let vehicleId = slot.getVehicleId()
            if(vehicleId){
                vehicleIds.push(vehicleId)
            }
        }

        let vehicleMap = {}

        if(vehicleIds.length > 0){
            let vehicles = await DBModel.get({
                id: vehicleIds
            }, Vehicle)

            for(let vehicle of vehicles) {
                vehicleMap[vehicle.getId()] = vehicle
            }
        }
    
        return {
            slots: slots,
            vehicles: vehicleMap
        }
    }

    /**
     * 
     * @param {String} vehicleNo 
     * @param {String} color 
     * @throws Exception if parking is not available
     */
    async park(parkingLotId, vehicleNo, color) {
        let vehicles = await DBModel.get({
            vno: vehicleNo
        }, Vehicle)

        let vehicle = null
        if(vehicles.length > 0) {
            vehicle = vehicles[0]
        }
        else {
            vehicle = new Vehicle(vehicleNo, color)
            await vehicle.save()
        }

        // gets the slot
        let updateStatus = await DBModel.query(`
        UPDATE ${ParkingSlot.tableName} 
         SET 
            state = ${ParkingSlot.states.BUSY},
            vid = ?
         WHERE 
            state = ${ParkingSlot.states.FREE}
            and
            plid = ?
         ORDER BY distance asc
         LIMIT 1
        `,[
            vehicle.getId(),
            parkingLotId
        ])

        if(updateStatus.changedRows > 0) {
            let slots = await DBModel.get({
                vid: vehicle.getId()
            }, ParkingSlot)

            let ticket = new Ticket(slots[0], vehicle, parkingLotId)
            await ticket.save()

            return ticket
        }
        else {
            throw new Error('No Parking Available!')
        }
    }
    
    async unpark(parkingLotId, vehicleNo, ticketNo) {
        let vehicle = await DBModel.get({
            vno: vehicleNo
        }, Vehicle)

        if(vehicle.length > 0) {
            vehicle = vehicle[0]
        }

        let result = await DBModel.query(
            `UPDATE ${Ticket.tableName}
            SET
                state = ${Ticket.states.PAID},
                exit_time = ?
            WHERE 
                id = ?
            AND
                vid = ?
            AND 
                state = ?
            AND
                plid = ?
            `, [
                DBModel.getCurrentTime(),
                ticketNo,
                vehicle.getId(),
                Ticket.states.CREATED,
                parkingLotId
            ])

        if(result.changedRows > 0 ){
            result = await DBModel.query(`
                UPDATE ${ParkingSlot.tableName}
                    SET
                    state = ${ParkingSlot.states.FREE},
                    vid = NULL
                WHERE 
                    vid = ?
                    and
                    plid = ?
            `, [
                vehicle.getId(), 
                parkingLotId
            ])

        }
        else {
            throw new Error('Invalid Ticket')
        }   
    }

    /**
     * 
     * @param {String} ticketNo 
     */
    payTicket(ticketNo) {
        let ticket = Ticket.getTicket(ticketNo)
        let parkingSlot = ticket.getSlot()
        let vehicle = parkingSlot.removeVehicle()
        this.parkingLot.markSlotFree(parkingSlot)
        ticket.markAsPaid()
        return vehicle
    }

}

export default new ParkingManager()
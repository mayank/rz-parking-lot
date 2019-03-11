import DBModel from '../models/db'
import ParkingSlot from '../models/parking-slot'
import Vehicle from '../models/vehicle'
import Ticket from '../models/ticket'

class ParkingManager {

    async search(parkingLotId, params) {
        let query = `
            SELECT * FROM ${ParkingSlot.tableName} as parkingLot
            JOIN
            ${Vehicle.tableName} as vehicle
            ON 
            parkingLot.vid = vehicle.id
            WHERE plid = ?
        `
        let searchParams = [ parkingLotId ]

        if(params.car) {
            searchParams.push(params.car)
            query += ` AND vehicle.vno = ?`
        }

        if(params.color) {
            searchParams.push(params.color)
            query += ` AND vehicle.color = ?`
        }

        return await DBModel.query(query, searchParams)
    }
    
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

        try {
            await DBModel.beginTransaction()

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

                await DBModel.commit()
                return ticket
            }
            else {
                throw (new Error('No Parking Available'))
            }
        }
        catch(err) {
            await DBModel.rollback()
            throw (new Error('No Parking Available'))
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
            return true
        }
        else {
            throw (new Error('Invalid Ticket'))
        }   
    }

}

export default new ParkingManager()
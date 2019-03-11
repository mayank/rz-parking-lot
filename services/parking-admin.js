import ParkingLot from '../models/parking-lot'
import ParkingSlot from '../models/parking-slot'
import DBModel from '../models/db'
import Vehicle from '../models/vehicle'

class ParkingAdmin {
    
    async createParkingLot(json) {
        await DBModel.beginTransaction()

        try{
            let parkingLot = new ParkingLot(json.name)
            await parkingLot.save()
            
            if(json.floors) {
                for(let floor of json.floors) {
                    if(floor.slots) {
                        for(let slot of floor.slots) {
                            let parkingSlot = new ParkingSlot(parkingLot.getId(), floor.no, slot.no, slot.distance)
                            await parkingSlot.save()
                        }
                    }
                }
            }
            await DBModel.commit()
            return parkingLot.getId()
        }
        catch(err) {
            await DBModel.rollback()
            throw (new Error('Some Error Occured'))
            
        }
    }

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
}

export default new ParkingAdmin()
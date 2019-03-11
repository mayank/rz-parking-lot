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
        
        if(!parkingLot) {
            throw (new Error('Parking Lot not Exists'))
        }

        let slots = await DBModel.get({
            plid: parkingLot.getId()
        }, ParkingSlot)

        let vehicleMap = {}
        let results = {}

        for(let slot of slots) {

            let vehicleId = slot.getVehicleId()
            if(vehicleId){
                vehicleMap[vehicleId] = slot.getId()
            }

            results[slot.getId()] = {
                slot_no: slot.getSlotNo(),
                floor_no: slot.getFloorNo()
            }
        }

        let vehicleIds = Object.keys(vehicleMap)

        if(vehicleIds.length > 0){
            let vehicles = await DBModel.get({
                id: vehicleIds
            }, Vehicle)

            for(let vehicle of vehicles) {
                let slotId = vehicleMap[vehicle.getId()]
                
                results[slotId].vehicle_no = vehicle.getVehicleNo()
                results[slotId].vehicle_color = vehicle.getVehicleColor()
            }
        }
        
        return Object.values(results)
    }
}

export default new ParkingAdmin()
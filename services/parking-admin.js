import ParkingLot from '../models/parking-lot'
import ParkingSlot from '../models/parking-slot'
import DBModel from '../models/db'

class ParkingAdmin {

    constructor() {
        this.parkingLots = {}
    }

    /**
     * creates a parking lot
     * with given parameters 
     * @param {JSON} json 
     * @example
     * {
     *     "name": "xyz",
     *     "floors": [{
     *          "no": 1,
     *          "slots": [{
     *              "no": 1,
     *              "distance": 5
     *          }...]
     *     }...]
     * }
     */
    async createParkingLot(json) {
        await DBModel.beginTransaction()

        try{
            let parkingLot = new ParkingLot(json.name)
            await parkingLot.save()
            console.log(parkingLot)
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
            await DBModel.commitTransaction()
        }
        catch(err) {
            await DBModel.rollback()
            throw new Error('Rollback Transaction')
        }
        
        return parkingLot.getId()
    }
}

export default new ParkingAdmin()
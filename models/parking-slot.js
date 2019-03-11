import DBModel from './db'

/**
 * @class
 * @classdesc Parking Slot Info
 */
const states = {
    FREE: 1,
    BUSY: 2
}

class ParkingSlot extends DBModel {

    /**
     * @param {Number} plid - Parking Lot Ids
     * @param {Number} floorNo - Number of Floor
     * @param {Number} slotNo - Number of the Slot
     * @param {Number} distance - Distance from Exit
     */
    

    constructor(plid, floorNo, slotNo, distance) {
        super('parking_slot')
        
        this.db.plid = plid
        this.db.floor = floorNo
        this.db.slotno = slotNo
        this.db.distance = distance
        this.db.vid = null
        this.db.state = states.FREE
    }

    static get states() {
        return states
    }

    getSlotNo() {
        return this.db.slotno
    }

    getFloorNo() {
        return this.db.floor
    }

    getVehicleId() {
        return this.db.vid
    }

}

ParkingSlot.setTable('parking_slot')

export default ParkingSlot
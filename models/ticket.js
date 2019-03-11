import DBModel from "./db";

const states = {
    CREATED: 1,
    PAID: 2,
    LOST: 3,
    INVALID: 4
}

/**
 * @class
 * @classdesc Ticket Alloted for Parking
 */
class Ticket extends DBModel {

    /**
     * @constructor
     */
    constructor(slot, vehicle, parkingLotId) {
        super('ticket')

        if(vehicle) {
            this.db.vid = vehicle.getId()
        }
        if(slot) {
            this.db.slotid = slot.getId()
        }
        this.db.plid = parkingLotId
        this.db.state = states.CREATED
        this.db.entry_time = DBModel.getCurrentTime()
    }

    getVehicleId() {
        return this.db.vid
    }
    
    static get states() {
        return states
    }

}

Ticket.setTable('ticket')

export default Ticket
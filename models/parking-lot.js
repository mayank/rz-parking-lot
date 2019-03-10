import DBModel from './db'

/**
 * @class 
 * @classdesc Contains Address/Location 
 * of current parking lot
 */
class ParkingLot extends DBModel {
    
    /**
     * @constructor
     * @param {string} name - name of parking lot
     */
    constructor(name) {
        super('parking_lot')
        this.db.name = name
    }
}

ParkingLot.setTable('parking_lot')

export default ParkingLot
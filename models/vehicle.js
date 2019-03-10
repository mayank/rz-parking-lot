import DBModel from "./db";

/**
 * @class
 * @classdesc Vehicle Description
 */
class Vehicle extends DBModel {
    /**
     * @constructor
     * @params {string} vno: Vehicle No
     * @params {string} color: Color of Car
     */
    constructor(vno, color) {
        super('vehicle')

        this.db.id = null
        this.db.vno = vno
        this.db.color = color
    }

}

Vehicle.setTable('vehicle')

export default Vehicle
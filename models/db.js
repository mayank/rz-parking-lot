import DatabaseManager from '../services/database'

export default class DatabaseModel {
    
    constructor(tableName) {
        this.db = {
            id: null
        }
        this.tableName = tableName
    }

    static async beginTransaction() {
        await DatabaseManager.beginTransaction()
    }

    static async commit() {
        await DatabaseManager.commit()
    }

    static async rollback() {
        await DatabaseManager.rollback()
    }

    getId() {
        return this.db.id
    }

    static setTable(tableName) {
        this.tableName = tableName
    }
    static async find(id, child) {
        let query = `SELECT * FROM ${child.tableName} WHERE id = ?`
        let result = await DatabaseManager.query(query, id)
        return(result.length > 0) ? this.create(result[0], child) : null
    }

    static async get(obj, child) {
        let query = `SELECT * FROM ${child.tableName} WHERE `
        let subquery = []
        for(let key in obj) {
            if(typeof obj[key] == 'object') {
                subquery.push([key, '(?)'].join(" in "))
            }
            else {
                subquery.push([key, '?'].join(" = "))
            }
        }
        query += subquery.join(" and ")
        let results = await DatabaseManager.query(query, Object.values(obj))
        let ans = []
        for(let db of results) {
            ans.push(this.create(db, child))
        }
        return ans
    }

    static async query(query, data) {
        return await DatabaseManager.query(query, data)
    }

    static create(db, child) {
        let object = new child()
        object.db = db
        return object
    }

    async save() {
        let keys = Object.keys(this.db)
        let query = `INSERT INTO ${this.tableName} SET ?`
        let result = await DatabaseManager.query(query, this.db)
        this.db.id = result.insertId
    }

    static getCurrentTime() {
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
}
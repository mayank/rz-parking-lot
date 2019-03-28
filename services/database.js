import MYSQL from 'mysql'
import DBConfig from '../config/db'
import FS from 'fs'

class DatabaseManager {

    constructor() {
        this.connection = MYSQL.createConnection(DBConfig)
    }

    query(query, data) {
        return new Promise((res, rej) => {
            this.connection.query(query, data, (err, result) => {
                err ? rej(err) : res(result)
            })
        })
    }
    
    beginTransaction() {
        return new Promise((res, rej) => {
            this.connection.beginTransaction( err => {
                err ? rej(err) : res()
            })
        })    
    }

    rollback() {
        return new Promise(res => {
            this.connection.rollback(() => {
                res()
            })
        })
    }

    commit() {
        return new Promise((res, rej) => {
            this.connection.commit( err => {
                err ? rej(err) : res()
            })
        })    
    }

    async migrate() {
        await this.query('drop database parking_test', [])
        await this.query('create database parking_test', [])

        let sqlQueries = FS.readFileSync(__dirname + '/../migrations/database.sql', 'utf-8').replace('\n', '').split(';')
        for(let query of sqlQueries) {
            if(query.trim()){
                await this.query(query, [])
            }
        }
    }

}

export default new DatabaseManager()
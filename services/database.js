import MYSQL from 'mysql'

class DatabaseManager {

    constructor() {
        this.pool = MYSQL.createPool({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || 'root',
            database: 'parking',
            port: process.env.DB_PASS || 3306
        })
        console.log('MYSQL Connected with Pool')
    }

    query(query, data) {
        return new Promise((res, rej) => {
            this.pool.query(query, data, (err, result) => {
                err ? rej(err) : res(result)
            })
        })
    }

    format(query, data) {
        return this.pool.format(query, data)
    }

    beginTransaction() {
        return new Promise((res, rej) => {
            this.pool.beginTransaction( err => {
                err ? rej(err) : res()
            })
        })    
    }

    rollback() {
        return new Promise(res => {
            this.pool.rollback()
        })
    }

    commit() {
        return new Promise((res, rej) => {
            this.pool.commit( err => {
                err ? rej(err) : res()
            })
        })    
    }
}

// singleton instance
export default new DatabaseManager()
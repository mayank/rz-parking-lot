import MYSQL from 'mysql'

class DatabaseManager {

    constructor() {
        this.connection = MYSQL.createConnection({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || 'root',
            database: 'parking',
            port: process.env.DB_PASS || 3306
        })
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
}

export default new DatabaseManager()
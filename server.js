import EXPRESS from 'express'
import APIManager from './services/api-manager'

class Server {
    constructor() {
        this.app = EXPRESS()
    }

    async start() {
        await this.listen()
        APIManager.routes( this.app )
    }

    listen() {
        return new Promise( res => {
            this.app.listen(process.env.PORT || 8000, () => {
                res()
            })
        })
    }
}

var server = new Server()
server.start() 
import EXPRESS from 'express'
import APIManager from './services/api-manager'

class Server {
    constructor() {
        this.app = EXPRESS()
    }

    async start() {
        await this.listen()
        APIManager.routes( this.app )
        console.log('Server Started')
    }

    listen() {
        return new Promise( res => {
            this.app.listen(process.env.PORT || 8000, () => {
                res()
            })
        })
    }
}

// global instance of server
var server = new Server()
server.start() 
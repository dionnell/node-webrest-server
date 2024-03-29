import express, { Router } from 'express'
import path from 'path'


interface Options {
    port: number
    routes: Router
    publicPath: string
}


export class Server {

    public readonly app = express()
    private serverListener?: any
    private readonly port: number
    private readonly publicPath: string
    private readonly routes: Router

    constructor( options: Options ){
        const { port, routes, publicPath } = options
        this.port = port
        this.publicPath= publicPath
        this.routes= routes
    }

    async start() {

        // Middlewares
        this.app.use( express.json() )
        this.app.use( express.urlencoded({ extended: true }) )

        //Routes
        this.app.use( this.routes )

        //Rutas que ayudan a los router de los SPA como React
        this.app.use( express.static( this.publicPath ) )

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
            res.sendFile(indexPath)
        })


        this.serverListener = this.app.listen(this.port, () => {
            console.log('arriba')
        } )

    }

    public close(){
        this.serverListener?.close()
    }


}
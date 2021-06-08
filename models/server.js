const express = require('express')
var cors = require('cors')

class Server {

    constructor() {
        this.routesUsuarioURl = '/api/usuarios';

        this.app = express();

        //Middelwares
        this.middelwares();

        //Rutas de aplicacion
        this.routes();
    }


    middelwares() {

        //CORS
        this.app.use(cors());

        //directorio publico
        this.app.use(express.static('public'));

        //Lectura y parseo
        this.app.use(express.json());
    }

    routes() {

        this.app.use(this.routesUsuarioURl, require('../routes/usuario.route'));

    }

    listenPort() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor corriendo en:', process.env.PORT);
        });
    }
}

module.exports = Server;
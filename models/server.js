const express = require('express')
var cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {

        this.URL = {
            routesUsuarioURl: '/api/usuarios',
            authURL: '/api/auth',
            categoriasURL: '/api/categorias',
            productosURL: '/api/productos',
            buscaURL: '/api/buscar',
            spotifyURL: '/api/tokenSpotify',
        }


        this.app = express();
        //Conectar a DB
        this.conetarDB();

        //Middelwares
        this.middelwares();

        //Rutas de aplicacion
        this.routes();
    }


    async conetarDB() {
        await dbConection();
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

        this.app.use(this.URL.authURL, require('../routes/auth.route'));
        this.app.use(this.URL.routesUsuarioURl, require('../routes/usuario.route'));
        this.app.use(this.URL.categoriasURL, require('../routes/categorias.route'));
        this.app.use(this.URL.productosURL, require('../routes/productos.route'));
        this.app.use(this.URL.buscaURL, require('../routes/buscar.route'));
        this.app.use(this.URL.spotifyURL, require('../routes/spotify.route'));

    }

    listenPort() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor corriendo en:', process.env.PORT);
        });
    }
}

module.exports = Server;
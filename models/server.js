const express = require('express');
const cors = require('cors');
const { dbConectar } = require('../database/config.js');
//const app = express();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/usuarios';
        this.authPath = '/auth';
        this.categoriaPath = '/categoria'
        this.productoPath = '/producto'

        //Iniciar conexion db
        this.dbConexion();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();


    }

    async dbConexion() {
        await dbConectar();
    }

    middlewares() {
        //servir carpeta publica
        //this.app.use(express.static('public'));

        //cors
        this.app.use(cors());
        //permitir que body obtenga desde json
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user.js'));
        this.app.use(this.authPath, require('../routes/auth.js'));
        this.app.use(this.categoriaPath, require('../routes/categoria.js'));
        this.app.use(this.productoPath, require('../routes/producto.js'));



    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el  puerto ', this.port);
        })
    }
}

module.exports = Server;
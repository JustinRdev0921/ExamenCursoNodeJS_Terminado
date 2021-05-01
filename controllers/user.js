const { response, request } = require('express');
const Usuario = require('../models/user.js');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const atob = require("atob");


const usuariosGet = async(req = request, res = response) => {
    const rol = req.rol;
    if (!rol) {
        return res.status(401).json({
            msg: "No existe este rol"
        })
    }
    if (rol === "ADMIN_ROLE") {
        const usuarios = await Usuario.find();
        return res.json({
            msg: 'Api - Get',
            usuarios
        });
    } else {
        let token = req.header("x-token");
        token = JSON.parse(atob(token.split(".")[1]));

        const usuarios = await Usuario.findById(token.uid);

        return res.json({
            msg: 'Api - Get',
            usuarios
        });
    }
}
const usuariosPost = async(req = request, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors,
        });
    }
    const { nombre, correo, password, rol, estado } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol, estado });

    //para encriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //correo existente
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Usuario ya existente en la base de datos',
        })
    }

    //para crear el usuario
    usuario.save();
    res.json({
        msg: 'API - POST ',
        /*nombre,
        correo,
        password,
        estado*/
        usuario
    });
}

const usuariosPut = async(req = request, res = response) => {
    const id = req.params.id;
    let { password, ...resto } = req.body;

    //para encriptar password
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'API - PUT ',
        id,
        usuario,
    })
}
const usuariosDelete = async(req = request, res = response) => {
    //const usuario = await Usuario.findByIdAndDelete(id);
    const id = req.params.id;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'API - DELETE ',
        usuario

    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
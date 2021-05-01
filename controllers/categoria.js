const { response, request } = require('express');
const Categoria = require('../models/categoria.js');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const atob = require("atob");


const categoriaGet = async(req = request, res = response) => {
    //recupera y guarda el rol del usuario al controlador de la authentication
    const rol = req.rol;
    //valida el rol
    if (!rol) {
        return res.status(401).json({
            msg: "No existe este rol"
        })
    }
    //validacion para que solo el administrador pueda realizar acciones de creacion, actualizacion, y borrado. 
    if (rol === "ADMIN_ROLE") {
        const categoria = await Categoria.find();
        return res.json({
            msg: 'Api - Get',
            categoria
        });
    } else {
        return res.json({
            msg: 'Api - Get',
            msg: "Error de acceso, solo administradores."
        });
    }
}
const categoriaPost = async(req = request, res = response) => {
    const { nombre, estado } = req.body;
    const categoria = new Categoria({ nombre, estado });

    if (!categoria) {
        return res.status(401).json({
            msg: "No se pudo recuperar la informacion"
        })
    }

    //para crear la categoria
    categoria.save();
    res.json({
        msg: 'API - POST ',
        categoria
    });
}

const categoriaPut = async(req = request, res = response) => {
    const id = req.params.id;
    let { nombre } = req.body;

    const categoria = await Categoria.findByIdAndUpdate(id, { nombre });

    res.json({
        msg: 'API - PUT ',
        id,
        categoria,
    })
}
const categoriaDelete = async(req = request, res = response) => {
    //const usuario = await Usuario.findByIdAndDelete(id);
    const id = req.params.id;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'API - DELETE ',
        categoria

    })
}

module.exports = {
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}
const { response, request } = require('express');
const Producto = require('../models/producto.js');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const atob = require("atob");

const productoGet = async(req = request, res = response) => {
    const rol = req.rol;
    if (!rol) {
        return res.status(401).json({
            msg: "No existe este rol"
        })
    }
    //validacion para que solo el administrador pueda realizar acciones de creacion, actualizacion, y borrado.
    if (rol === "ADMIN_ROLE") {
        const productos = await Producto.find();
        return res.json({
            msg: 'Api - Get',
            productos
        });
    } else {
        //Se recupera el token para hacer la validacion de los productos.
        let token = req.header("x-token");
        token = JSON.parse(atob(token.split(".")[1]));
        const productos = await Producto.find({ usuario: token.uid });

        return res.json({
            msg: 'Api - Get',
            productos
        });
    }
}
const productoPost = async(req = request, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors,
        });
    }
    const { nombre, estado, usuario, precio, categoria, descripcion, disponible } = req.body;
    const productos = new Producto({ nombre, estado, usuario, precio, categoria, descripcion, disponible });

    productos.save();
    res.json({
        msg: 'API - POST ',
        productos
    });
}

const productoPut = async(req = request, res = response) => {
    const id = req.params.id;
    let { nombre } = req.body;

    const productos = await Producto.findByIdAndUpdate(id, { nombre });

    res.json({
        msg: 'API - PUT ',
        id,
        productos,
    })
}
const productoDelete = async(req = request, res = response) => {
    const id = req.params.id;
    const productos = await Producto.findByIdAndUpdate(id, { estado: false }, { disponible: false });

    res.json({
        msg: 'API - DELETE ',
        productos

    })
}

module.exports = {
    productoGet,
    productoPost,
    productoPut,
    productoDelete
}
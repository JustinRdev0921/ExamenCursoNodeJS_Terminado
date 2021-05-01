const { response, request } = require("express");
const Usuario = require("../models/user.js");
//este script es para recupear el rol y mostrarlo en la peticion al inicio de sesion.
const sendROLE = async(req = request, res = response, next) => {
    let { correo } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        return res.status(401).json({
            msg: "No existe el usuario"
        })
    }
    try {
        //Envia el rol del usuario al controlador de auth
        req.rol = usuario.rol;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Rol no valido",
        });
    }
}

module.exports = {
    sendROLE,
}
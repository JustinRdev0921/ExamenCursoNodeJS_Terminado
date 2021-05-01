const { response, request } = require("express");
const Usuario = require("../models/user.js");
//se instalo e importo la libreria atob, que servirá para separar dividir el token
const atob = require("atob");

const validarROLE = async(req = request, res = response, next) => {
    //se recupero el token de la peticion
    let token = req.header('x-token');
    //en esta parte se hace uso de la libreria atob para poder separar al token y tomar solo el payload
    token = JSON.parse(atob(token.split(".")[1]));
    //se le asigna el token para que lo busque por cada usuario
    const usuario = await Usuario.findById(token.uid);
    //valida el error de no existencia del usuario
    if (!usuario) {
        return res.status(401).json({
            msg: 'No existe el usuario'
        });
    }
    try {
        //se recuperar el rol con el request dependiendo del usuario al controlador de la authentication 
        req.rol = usuario.rol;
        //se hace la validacion para que solo el administrador pueda realizar acciones especificas
        if (req.method != "GET") {
            if (usuario.rol != "ADMIN_ROLE") {
                return res.status(403).json({
                    msg: "Solo el Administrador puede realizar esta acción"
                })
            } else {
                next();
            }
        } else {
            next();
        }
        /*if (usuario.rol == "ADMIN_ROLE") {
            return res.status(200).json({
                msg: "Admin Role"
            })
        }
        return res.status(200).json({
            msg: "Client Role"
        })*/
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            msg: 'Rol no valido'
        });
    }
}
module.exports = {
    validarROLE
}
const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');
    //console.log(token);

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        jwt.verify(token, 'M1T0k3NS3cr3t0Mu4k');
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
    next();
}

module.exports = {
    validarJWT
}
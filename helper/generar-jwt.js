const jwt = require("jsonwebtoken");

const generarToken = (uid = "") => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, "M1T0k3NS3cr3t0Mu4k", {
            expiresIn: "4h"
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se logró generar el token");
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarToken
}
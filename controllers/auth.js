const { request, response } = require('express');
const bcrytjs = require('bcryptjs');
const Usuario = require('../models/user.js');
const { generarToken } = require('../helper/generar-jwt.js');

const login = async(req = request, res = response) => {
    const rol = req.rol;
    const { correo, password } = req.body;
    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecta (Usuario)'
            });
        }
        //verficar que el usuario este activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecta (Estado)'
            });
        }
        //verificar que la constrasenia sea correcta
        const validaPassword = bcrytjs.compareSync(password, usuario.password);
        if (!validaPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecta (contrasenia)'
            })
        }
        //crear token
        const token = await generarToken(usuario.id);
        //respuesta
        res.json({
            msg: 'Login exitoso',
            correo,
            password,
            token,
            rol
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: 'Error, problemas en el servidor, hable con al administrador'
        })
    }
}

module.exports = {
    login,
}
const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'CLIENT_ROLE',
        emun: ['ADMIN_ROLE', 'CLIENT_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = model('Usuario', usuarioSchema);
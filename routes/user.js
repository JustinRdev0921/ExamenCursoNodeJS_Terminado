const { Router } = require('express');
const { check } = require('express-validator');
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require('../controllers/user.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { validarROLE } = require('../middlewares/validar-roles.js');

const router = Router();

router.get('/', validarJWT, validarROLE, usuariosGet);
//router.get('/:id', validarJWT, usuariosGet);

router.post('/', validarJWT, validarROLE, [check('correo', 'El correo es requerido o no es valido').isEmail()], usuariosPost);
router.put('/:id', validarJWT, validarROLE, usuariosPut);
router.delete('/:id', validarJWT, validarROLE, usuariosDelete);

module.exports = router;
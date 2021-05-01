const { Router } = require('express');
const { check } = require('express-validator');
const {
    productoGet,
    productoPost,
    productoPut,
    productoDelete
} = require('../controllers/producto.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { validarROLE } = require('../middlewares/validar-roles.js');

const router = Router();

router.get('/', validarJWT, validarROLE, productoGet);
//router.get('/:id', validarJWT, usuariosGet);

router.post('/', validarJWT, validarROLE, productoPost);
router.put('/:id', validarJWT, validarROLE, productoPut);
router.delete('/:id', validarJWT, validarROLE, productoDelete);
module.exports = router;
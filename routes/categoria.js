const { Router } = require('express');
const { check } = require('express-validator');
const {
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
} = require('../controllers/categoria.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { validarROLE } = require('../middlewares/validar-roles.js');

const router = Router();

router.get('/', validarJWT, validarROLE, categoriaGet);
//router.get('/:id', validarJWT, usuariosGet);

router.post('/', validarJWT, validarROLE, categoriaPost);
router.put('/:id', validarJWT, validarROLE, categoriaPut);
router.delete('/:id', validarJWT, validarROLE, categoriaDelete);

module.exports = router;
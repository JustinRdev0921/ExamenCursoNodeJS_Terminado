const { Router } = require('express');
const { login } = require('../controllers/auth');
const { sendROLE } = require('../middlewares/send-role.js');


const router = new Router();

router.post('/login', sendROLE, login);

module.exports = router;
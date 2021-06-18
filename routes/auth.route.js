const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validacionCampos');




const router = Router();




router.post('/login', [
    check('correo', 'Correo Obligatorio').isEmail(),
    check('password', 'Contraseña Obligatorio').not().isEmpty(),
    validarCampos
], login);




module.exports = router;
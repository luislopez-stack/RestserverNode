const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGET, usuarioPUT, usuarioPOST, usuarioDELETE } = require('../controllers/usuario.controller');
const { validarCampos } = require('../middlewares/validacionCampos');

const router = Router();


router.get('/', usuarioGET);

router.put('/:id', usuarioPUT);

router.post('/', [
    check('nombre', 'Nombre invalido').not().isEmpty(),
    check('correo', 'Correo invalido').isEmail(),
    check('password', 'Password menor a 5').isLength({ min: 5 }),
    check('role', 'Role invalido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuarioPOST);

router.delete('/', usuarioDELETE);


module.exports = router;
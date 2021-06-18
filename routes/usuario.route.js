const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGET, usuarioPUT, usuarioPOST, usuarioDELETE } = require('../controllers/usuario.controller');
const { validaRol, validaEmail, validaUsuariobyId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validacionCampos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdmiRole } = require('../middlewares/validar-roles');


const router = Router();


router.get('/', usuarioGET);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validaUsuariobyId),
    check('role', 'Role invalido').custom(validaRol),
    validarCampos
], usuarioPUT);

router.post('/', [
    check('nombre', 'Nombre invalido').not().isEmpty(),
    check('correo', 'Correo invalido').isEmail(),
    check('correo').custom(validaEmail),
    check('password', 'Password menor a 5').isLength({ min: 5 }),
    //check('role', 'Role invalido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role', 'Role invalido').custom(validaRol),
    validarCampos
], usuarioPOST);

router.delete('/:id', [
    validarJWT,
    esAdmiRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validaUsuariobyId),
    validarCampos
], usuarioDELETE);


module.exports = router;
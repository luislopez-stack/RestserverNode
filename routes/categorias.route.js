const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validacionCampos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { categoriasGET, categoriaGET, categoriaPUT, categoriaPOST, categoriaDELETE } = require('../controllers/categorias.controller');
const { validarCategoriaId, esAdmiRole } = require('../helpers/db-validators');


const router = Router();


//OBTENER TODAS LAS CATEGORIAS - PUBLICO
router.get('/', [], categoriasGET);


//OBTENER CATEGORIA - PUBLICO
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validarCategoriaId),
    validarCampos
], categoriaGET);


//CREAR CATEGORIA - PRIVADO - CUALQUIER PERSONA CON TOKEN
router.post('/', [
    check('nombre', 'Campo Obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT,
], categoriaPOST);

//ACTUALIZAR - PRIVADO - CUALQUIER PERSONA CON TOKEN
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validarCategoriaId),
    validarCampos,
    validarJWT
], categoriaPUT);

//CAMBIAR ESTATUS DE ACTIVIDAD - PRIVADO - CUALQUIER PERSONA CON TOKEN    (req, resp) => { resp.json('Respuesta delete') }
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validarCategoriaId),
    validarCampos,
    validarJWT
], categoriaDELETE);
/*router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validarCategoriaId),
    validarCampos,
    validarJWT,
    esAdmiRole
], categoriaDELETE);*/


module.exports = router;
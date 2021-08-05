const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validacionCampos');
const { esAdminRole } = require('../middlewares/validar-roles');

const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos.controller');

const { validarCategoriaId, validarProductoId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerProductos);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    //check('id').custom(validarProductoId),
    validarCampos,
], obtenerProducto);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(validarCategoriaId),
    validarCampos
], crearProducto);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    //check('categoria', 'No es un id de Mongo').isMongoId(),
    //check('id').custom(validarProductoId),
    validarCampos
], actualizarProducto);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    //check('id').custom(validarProductoId),
    validarCampos,
], borrarProducto);


module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary, mostrarImagenCloudinary } = require('../controllers/uploads.controller');
const { validarColeccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router = Router();


router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
        validarArchivoSubir,
        check('id', 'No es un ID valido').isMongoId(),
        check('coleccion').custom(c => validarColeccionesPermitidas(c, ['usuarios', 'productos'])),
        validarCampos
    ], actualizarImagenCloudinary)
    //actualizarImagen);

router.get('/:coleccion/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('coleccion').custom(c => validarColeccionesPermitidas(c, ['usuarios', 'productos'])),
        validarCampos
    ], mostrarImagenCloudinary)
    //mostrarImagen);

module.exports = router;
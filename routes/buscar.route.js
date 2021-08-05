const { Router } = require('express');
const { buscar } = require('../controllers/buscar.controller');

const router = Router();


//Normalmente la busqueda hace uso del get
router.get('/:coleccion/:termino', buscar);

module.exports = router;
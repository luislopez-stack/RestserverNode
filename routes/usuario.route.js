const { Router } = require('express');
const { usuarioGET, usuarioPUT, usuarioPOST, usuarioDELETE } = require('../controllers/usuario.controller');

const router = Router();


router.get('/', usuarioGET);

router.put('/:id', usuarioPUT);

router.post('/', usuarioPOST);

router.delete('/', usuarioDELETE);


module.exports = router;
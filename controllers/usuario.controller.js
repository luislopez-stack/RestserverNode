const { response } = require('express');

const usuarioGET = (req, res = response) => {
    res.json({
        msg: 'Respuesta ok GET Controlador'
    });
}

const usuarioPUT = (req, res = response) => {

    const id = req.params.id;
    //const { id } = req.params; destructuracion

    res.json({
        msg: 'Respuesta ok PUT Controlador',
        id
    });
}

const usuarioPOST = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'Respuesta ok POST Controlador',
        body
    });
}

const usuarioDELETE = (req, res = response) => {
    res.json({
        msg: 'Respuesta ok DELETE Controlador'
    });
}


module.exports = {
    usuarioGET,
    usuarioPUT,
    usuarioPOST,
    usuarioDELETE
}
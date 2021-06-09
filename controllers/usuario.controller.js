const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');






const usuarioGET = (req, res = response) => {

    const { nom, page, limit } = req.query;

    //RESPUESTA
    res.json({
        msg: 'Respuesta ok GET Controlador',
        nom,
        page,
        limit
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




const usuarioPOST = async(req, res = response) => {




    //REQUEST
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    //Verificar existencia de correo
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msj: "Este correo ya esta registrado"
        });
    }

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    //Guardar DB
    await usuario.save();


    //RESPONSE
    res.json({
        msg: 'Respuesta ok POST Controlador',
        usuario
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
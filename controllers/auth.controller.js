const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validaEmail } = require('../helpers/db-validators');
const { generarJWT } = require('../helpers/generar-jwt');






const login = async(req, res = response) => {

    const { correo, password } = req.body;


    // Verificar si emai existe
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
        return res.status(400).json({
            msj: 'Correo / password incorrectos'
        });
    }
    // Si el usuario está activo
    if (!usuario.estado) {
        return res.status(400).json({
            msj: 'Usuario no existe'
        });
    }
    // Verifica contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    //Generar El JWT
    const token = await generarJWT(usuario.id);

    if (!validPassword) {
        return res.status(400).json({
            msj: 'Password incorrecto'
        });
    }
    // Genera el JWT

    //RESPUESTA
    res.json({
        msj: 'Login Ok',
        usuario,
        token
    });
}







module.exports = {
    login
}
const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msj: 'No contiene token'
        })
    }


    try {

        //VERIFICA TOKEN VALIDO
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //USUARIO CORRESPONDIENTE A TOKEN
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            res.status(401).json({
                msj: 'Usuario no existe'
            })
        }

        //VERIFICA SI ESTA ELIMINADO
        if (!usuario.estado) {
            res.status(401).json({
                msj: 'Usuario en estado eliminado'
            })
        }
        req.usuario = usuario;


        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msj: 'Token no valido'
        })
    }


}

module.exports = {
    validarJWT
}
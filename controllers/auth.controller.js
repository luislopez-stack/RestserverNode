const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validaEmail } = require('../helpers/db-validators');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');






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


const googleSingin = async(req, resp = response) => {

    const { id_token } = req.body;

    try {

        /// verificar authenticacion de google
        const { nombre, img, correo } = await googleVerify(id_token);

        /// crear usuario a partir de authenticacion google
        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            // Crear usuario
            const data = {
                nombre,
                correo,
                password: '123',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }


        //Verifica si esta eliminado el usuario
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario eliminado'
            })
        }


        //Generar El JWT
        const token = await generarJWT(usuario.id);


        resp.json({
            msg: 'Google sing in',
            usuario,
            token
        });
    } catch (err) {
        resp.status(400).json({
            msg: 'Tokend de google no valido' + err
        })
    }

}




module.exports = {
    login,
    googleSingin
}
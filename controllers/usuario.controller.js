const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validaEmail } = require('../helpers/db-validators');






const usuarioGET = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const usuarios = await Usuario.find({ estado: true })
        .limit(Number(limite))
        .skip(Number(desde));

    const total = await Usuario.countDocuments({ estado: true });



    //Permite ejecutar los await al mismo tiempo
    //const [total, usuarios] = await Promise.all([
    //    Usuario.countDocuments({ estado: true }),
    //    Usuario.find({ estado: true })
    //    .limit(Number(limite))
    //    .skip(Number(desde))
    //]);

    //RESPUESTA
    res.json({
        total,
        usuarios
    });
}




const usuarioPUT = async(req, res = response) => {

    const id = req.params.id;
    //const { id } = req.params; destructuracion

    //Si cambia la contraseña
    const { _id, password, google, correo, ...resto } = req.body;
    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Respuesta ok PUT Controlador',
        id,
        usuarioActualizado
    });
}




const usuarioPOST = async(req, res = response) => {

    //REQUEST
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });


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




const usuarioDELETE = async(req, res = response) => {


    const { id } = req.params;


    const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });
    //const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    const usuarioAutenticado = req.usuario;

    res.json({
        usuarioEliminado,
        usuarioAutenticado
    });
}





module.exports = {
    usuarioGET,
    usuarioPUT,
    usuarioPOST,
    usuarioDELETE
}
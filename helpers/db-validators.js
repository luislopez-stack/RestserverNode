const Role = require('../models/role');
const Usuario = require('../models/usuario');


const validaRol = async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`Rol ${rol} no registrado en db`);
    }
}


//Verificar existencia de correo
const validaEmail = async(correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`Este correo ya esta registrado`);
    }
}



const validaUsuariobyId = async(_id = '') => {
    const existUsarioId = await Usuario.findById({ _id });
    if (!existUsarioId) {
        throw new Error(`El ${id} no existe en db`);
    }
}



module.exports = {
    validaRol,
    validaEmail,
    validaUsuariobyId
}
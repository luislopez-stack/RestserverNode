const Categoria = require('../models/categoria');
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



const validarCategoriaId = async(_id = '') => {
    const exiateId = await Categoria.findById({ _id });
    if (!exiateId) {
        throw new Error(`El ${id} no existe en db`);
    }
}



const validarProductoId = async(id = '') => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe`);
    }
}


module.exports = {
    validaRol,
    validaEmail,
    validaUsuariobyId,
    validarCategoriaId,
    validarProductoId
}
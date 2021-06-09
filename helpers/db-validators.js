const Role = require('../models/role');


const validaRol = async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`Rol ${rol} no registrado en db`);
    }
}

module.exports = {
    validaRol
}
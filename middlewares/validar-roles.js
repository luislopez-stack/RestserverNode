const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const esAdmiRole = async(req = request, res = response, next) => {

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msj: `${nombre} No ES ADMIN`
        })
    }

    next();

}

module.exports = {
    esAdmiRole
}
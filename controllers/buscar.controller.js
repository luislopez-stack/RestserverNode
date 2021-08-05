const { response, json } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];



const buscarUsuarios = async(termino, res = response) => {

    const esMongoID = ObjectId.isValid(termino) //true/false

    //BUSCAR POR ID USUARIO
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        res.json({
            //Dejar estructurada la respuesta
            results: (usuario) ? [usuario] : []
        })
    }

    //BUSQUEDA POR NOMBRE / CORREO
    //busqueda incensible a mayus min
    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });
}


const buscarCategorias = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); // TRUE 

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const categorias = await Categoria.find({ nombre: regex, estado: true });

    res.json({
        results: categorias
    });

}

const buscarProductos = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); // TRUE 

    if (esMongoID) {
        const producto = await Producto.findById(termino)
            .populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({ nombre: regex, estado: true })
        .populate('categoria', 'nombre')

    res.json({
        results: productos
    });

}


//CONTROLADOR GENERAL PARA BUSCAR
const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400), json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    //BUSCAR POR DIFERENTE COLECCION
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            })
    }



}

module.exports = {
    buscar
}
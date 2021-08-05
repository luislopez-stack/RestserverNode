const { response } = require("express");
const { Categoria } = require("../models/index");



//GET - PAGINADO - POPULATE
const categoriasGET = async(req, resp = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const categorias = await Categoria.find({ estado: true })
        .limit(Number(limite))
        .skip(Number(desde))
        .populate('usuario', 'nombre');

    resp.json({
        categorias
    });


}

//GET ID - POPULATE
const categoriaGET = async(req, resp = response) => {

        const id = req.params.id

        const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

        resp.json({
            categoria
        });

    }
    //PUT
const categoriaPUT = async(req, resp = response) => {

    const id = req.params.id

    const { nombre, ...resto } = req.body;

    resto.nombre = nombre.toUpperCase();

    //{new: true} REGRESA EL REGISTRO ACTUALIZADO
    const categoria = await Categoria.findByIdAndUpdate(id, resto, { new: true });

    resp.json({
        msg: 'Respuesta Actualizada',
        categoria
    });
}


const categoriaPOST = async(req, resp = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return resp.json({
            msjg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    //GENERAR DATA
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    //GUARDA DATA EN DB
    const categoria = new Categoria(data);
    await categoria.save();

    resp.status(201).json(categoria);

}


//DELETE -CAMBIAR ESTADO FALSE
const categoriaDELETE = async(req, resp = response) => {
    const { id } = req.params;

    const categoriaEliminado = await Categoria.findByIdAndUpdate(id, { estado: false });
    //const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    const usuarioAutenticado = req.usuario;

    resp.json({
        categoriaEliminado,
        usuarioAutenticado
    });
}


module.exports = {
    categoriasGET,
    categoriaGET,
    categoriaPUT,
    categoriaPOST,
    categoriaDELETE
}
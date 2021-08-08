const { response } = require('express');
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require('../helpers/subir-archivo');
const { Usuario, Producto } = require('../models');


//FUNCION GENERAL PARA CARGAR ARCHIVOS
const cargarArchivo = async(req, res = response) => {

    try {
        //LLAMA A SUBIR ARCHIVO (ARCHIVO, EXTENCIONVALIDA, CARPETA)
        //const nombreArchivo = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const nombreArchivo = await subirArchivo(req.files, undefined, 'textos');

        res.json({ nombreArchivo });

    } catch (error) {
        res.status(400).json({ msg: error });
    }


}

//CONTROLADOR EN CARPETA LOCAL
const actualizarImagen = async(req, res = response) => {

    const { id, coleccion } = req.params;
    let model;

    //OBTIENE OBJETO DE DB
    switch (coleccion) {
        case 'usuarios':
            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({ msg: 'No existe usuario' });
            }
            break;

        case 'productos':
            model = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({ msg: 'No existe producto' });
            }
            break;

        default:
            return res.status(500).json({ msg: 'No existe coleccion' });
    }

    try {

        //QUITAR IMAGENES PREVIAS
        if (model.img) { //SI EXISTE PROPIEDAD EN DB
            //BORRAR IMAGEN PREVIA
            const pathImag = path.join(__dirname, '../uploads', coleccion, model.img);
            if (fs.existsSync(pathImag)) { // SI EXISTE IMAGEN EN CARPETA
                fs.unlinkSync(pathImag);
            }
        }

        //GUARDA ARCHIVO EN DIRECTORIO
        const nombreArchivo = await subirArchivo(req.files, undefined, coleccion);

        //GUARDA NOMBRE DE IMAGEN EN DB PROPIEDAD IMAGEN
        model.img = nombreArchivo;
        await model.save();

        return res.json(nombreArchivo);

    } catch (error) {
        res.status(400).json({ msg: error });
    }

}


//CONTROLADOR EN CLOUDINARY
const actualizarImagenCloudinary = async(req, res = response) => {

    const { id, coleccion } = req.params;
    let model;

    //OBTIENE OBJETO DE DB
    switch (coleccion) {
        case 'usuarios':
            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({ msg: 'No existe usuario' });
            }
            break;

        case 'productos':
            model = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({ msg: 'No existe producto' });
            }
            break;

        default:
            return res.status(500).json({ msg: 'No existe coleccion' });
    }

    try {

        //QUITAR IMAGENES PREVIAS
        if (model.img) { //SI EXISTE PROPIEDAD EN DB
            //BORRAR IMAGEN PREVIA
            const nombreArr = model.img.split('/'); //SEPARAMOS NOMBRE POR DIAGONALES
            const nombreImg = nombreArr[nombreArr.length - 1]; //TOMAMOS LA ULTIMA SEPARACION 
            const [publicId] = nombreImg.split('.'); //SEPARAMOS EL NOMBRE DE LA EXTENCION

            cloudinary.uploader.destroy(publicId);
        }

        //GUARDA ARCHIVO EN CLOUDINARY
        const { tempFilePath } = req.files.archivoFile
        const respCloudinary = await cloudinary.uploader.upload(tempFilePath);


        //GUARDA NOMBRE DE IMAGEN EN DB PROPIEDAD IMAGEN
        model.img = respCloudinary.secure_url;
        await model.save();

        return res.json(model);

    } catch (error) {
        res.status(400).json({ msg: `Error: ${error}` });
    }

}


// CONTROLADOR EN LOCAL
const mostrarImagen = async(req, res = response) => {

    const { id, coleccion } = req.params;
    let model;

    //OBTIENE OBJETO DE DB
    switch (coleccion) {
        case 'usuarios':
            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({ msg: 'No existe usuario' });
            }
            break;

        case 'productos':
            model = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({ msg: 'No existe producto' });
            }
            break;

        default:
            return res.status(500).json({ msg: 'No existe coleccion' });
    }

    try {

        //MOSTRAR IMAGEN
        if (model.img) { //SI EXISTE PROPIEDAD EN DB
            const pathImag = path.join(__dirname, '../uploads', coleccion, model.img);
            if (fs.existsSync(pathImag)) { // SI EXISTE IMAGEN EN CARPETA
                return res.sendFile(pathImag);
            }
        }


        //SI IMAGEN NO EXISTE MANDA IMG DEFAULT
        const pathImag = path.join(__dirname, '../assets/no-image.jpg');
        return res.sendFile(pathImag)

    } catch (error) {
        res.status(400).json({ msg: `Error: ${error}` });
    }

}


// CONTROLADOR EN SERVIDOR CLOUDINARY
const mostrarImagenCloudinary = async(req, res = response) => {

    const { id, coleccion } = req.params;
    let model;

    //OBTIENE OBJETO DE DB
    switch (coleccion) {
        case 'usuarios':
            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({ msg: 'No existe usuario' });
            }
            break;

        case 'productos':
            model = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({ msg: 'No existe producto' });
            }
            break;

        default:
            return res.status(500).json({ msg: 'No existe coleccion' });
    }

    try {

        //MOSTRAR IMAGEN
        if (model.img) { //SI EXISTE PROPIEDAD EN DB
            const img = cloudinary.image(model.img);
            return res.json(img);
        }


        //SI IMAGEN NO EXISTE MANDA IMG DEFAULT
        const pathImag = path.join(__dirname, '../assets/no-image.jpg');
        return res.sendFile(pathImag)

    } catch (error) {
        res.status(400).json({ msg: `Error: ${error}` });
    }

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
    mostrarImagenCloudinary
}
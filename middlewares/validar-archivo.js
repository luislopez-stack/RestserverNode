const validarArchivoSubir = (req, res, next) => {

    // verificar si existe archivos en la peticion
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivoFile) {
        return res.status(400).json({
            msg: 'No files were uploaded.'
        });
    }
    next();
}

module.exports = {
    validarArchivoSubir
}
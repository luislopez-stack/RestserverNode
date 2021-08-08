const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (reqFiles, extencionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'md', 'txt'], carpeta = '') => {


    //CONVERTIMOS FUNCION EN PROMESA
    return new Promise((resolve, reject) => {

        const { archivoFile } = reqFiles;

        //OBTENER LA EXTENCION DEL ARCHIVO
        const nombreCortado = archivoFile.name.split('.');
        const extencion = nombreCortado[nombreCortado.length - 1];


        //VALDAR EXTENCION
        if (!extencionesValidas.includes(extencion)) {
            return reject(`Extencion ${extencion} invalida`);
        }


        const nombreTemp = uuidv4() + '.' + extencion;

        uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivoFile.mv(uploadPath, (err) => {
            if (err) {
                return reject(`Error al cargar archivo ${err}`);
            }

            resolve(nombreTemp);

        });

    });




}

module.exports = {
    subirArchivo
}
const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        //Referencia a la tabla(objeto) usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

module.exports = model('Categoria', CategoriaSchema);
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El campo correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El campo pasword es obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Usuario', UsuarioSchema);
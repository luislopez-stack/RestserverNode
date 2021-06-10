const { validationResult } = require('express-validator');

//Verificar errores. Valida campos conforme a los middleware antes de entrar al controlador
const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next(); //next quiere decir que siga con la ejecucion
}

module.exports = {
    validarCampos
}
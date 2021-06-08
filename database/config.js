const mongoose = require('mongoose');



const dbConection = async() => {


    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('Conexion a DB');

    } catch (error) {
        console.log(error);
        throw new Error('Error de conexion', error);
    }

}

module.exports = {
    dbdbConection
}
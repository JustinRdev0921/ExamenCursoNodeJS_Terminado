const mongoose = require('mongoose');

const dbConectar = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexion a db exitosa');
    } catch (e) {
        console.log('No se pudo conectar a las base de datos');
        console.log(e);
    }
};

module.exports = {
    dbConectar,
}
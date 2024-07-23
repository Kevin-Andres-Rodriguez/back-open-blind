const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
    sequelize = new Sequelize(MYSQL_URI);
} else {
    // Configuración para parámetros individuales
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 2,
            acquire: 30000,
            idle: 10000
        }
    });
}




// Autenticar y sincronizar
sequelize.authenticate()
    .then(() => {
        console.log("Conexión establecida con la base de datos");
    })
    .catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });

sequelize.sync({ force: false })
    .then(() => {
        console.log("Tablas sincronizadas");
    })
    .catch((err) => {
        console.error("Error al sincronizar las tablas:", err.message);
    });





//extracionModelos
const usuarioModel = require('../models/usuario.model');
const estacionModel = require('../models/estacion.model')
const estacion_usuarioModel = require('../models/estacion_usuario.model');
const mensajePersonalizadoModel = require("../models/mensajePersonalizado.model");
const puntoInteresModel = require("../models/puntoInteres.model");
const beaconModel = require("../models/beacon.model");







//zincronia tablas
const usuario = usuarioModel(sequelize, Sequelize)
const estacion = estacionModel(sequelize, Sequelize)
const estacion_usuario = estacion_usuarioModel(sequelize, Sequelize)    
const mensajePersonalizado = mensajePersonalizadoModel(sequelize, Sequelize) 
const puntoInteres = puntoInteresModel(sequelize, Sequelize)
const beacon = beaconModel(sequelize, Sequelize)






//RELACIONES 

// Relacion entre muchos a muchos Estacion - Usuario
estacion.belongsToMany(usuario, { through: estacion_usuario, foreignKey: 'estacionId'});
usuario.belongsToMany(estacion, { through: estacion_usuario, foreignKey: 'usuarioId'})

// Relacion de umo a mucho Usuario - Mensaje Personalizado
usuario.hasMany(mensajePersonalizado, { foreignKey: 'usuarioId' });
mensajePersonalizado.belongsTo(usuario, { foreignKey: 'usuarioId' });

// Relación entre uno a muchos Estación - Punto de Interes

estacion.hasMany(puntoInteres, {foreignKey: 'estacionId'} );
puntoInteres.belongsTo(estacion, {foreignKey: 'estacionId'} );

// Relación entre uno a muchos Estación - Beacon
estacion.hasMany(beacon, {foreignKey: 'estacionId'} );
beacon.belongsTo(estacion, {foreignKey: 'estacionId'} );










sequelize.sync({ alter: true }) // alter will update the database schema to match the model
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });

// Exportar el objeto sequelize
module.exports = {
    
};
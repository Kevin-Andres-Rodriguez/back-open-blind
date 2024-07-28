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
const estacionModel = require('../models/estaciones.model')
const estacion_usuarioModel = require('../models/estacion_usuario.model');
const mensajePersonalizadoModel = require("../models/mensajePersonalizado.model");
const puntoInteresModel = require("../models/puntoInteres.model");
const beaconModel = require("../models/beacon.model");
const rutaModel = require("../models/ruta.model");
const guiaVozModel = require("../models/guiaVoz.model");
const navegacionExternaModel = require('../models/navegacionExterna.model');
const navegacionInternaModel = require('../models/navegacionInterna.model');







//zincronia tablas
const usuario = usuarioModel(sequelize, Sequelize)
const estaciones = estacionModel(sequelize, Sequelize)
const estacion_usuario = estacion_usuarioModel(sequelize, Sequelize)    
const mensajePersonalizado = mensajePersonalizadoModel(sequelize, Sequelize) 
const puntoInteres = puntoInteresModel(sequelize, Sequelize)
const beacon = beaconModel(sequelize, Sequelize)
const ruta = rutaModel(sequelize, Sequelize)
const guiaVoz = guiaVozModel(sequelize, Sequelize)
const navegacionExterna = navegacionExternaModel(sequelize, Sequelize)
const navegacionInterna = navegacionInternaModel(sequelize, Sequelize)






//RELACIONES 

// Relacion entre muchos a muchos Estacion - Usuario
estaciones.belongsToMany(usuario, { through: estacion_usuario, foreignKey: 'estacionId'});
usuario.belongsToMany(estaciones, { through: estacion_usuario, foreignKey: 'usuarioId'})

// Relacion de umo a mucho Usuario - Mensaje Personalizado
usuario.hasMany(mensajePersonalizado, { foreignKey: 'usuarioId' });
mensajePersonalizado.belongsTo(usuario, { foreignKey: 'usuarioId' });

// Relación entre uno a muchos Estación - Punto de Interes

estaciones.hasMany(puntoInteres, {foreignKey: 'estacionId'} );
puntoInteres.belongsTo(estaciones, {foreignKey: 'estacionId'} );

// Relación entre uno a muchos Estación - Beacon
estaciones.hasMany(beacon, {foreignKey: 'estacionId'} );
beacon.belongsTo(estaciones, {foreignKey: 'estacionId'} );

// Relacion de umo a muchos Estacion - Ruta
estaciones.hasMany(ruta, { foreignKey: 'estacionId' });
ruta.belongsTo(estaciones, { foreignKey: 'estacionId' });

// Relacion de umo a muchos Estacion - Guia de voz
estaciones.hasMany(guiaVoz, { foreignKey: 'estacionId' });
guiaVoz.belongsTo(estaciones, { foreignKey: 'estacionId' });

//Relacion de uno a mucho Usuario - Navegacion Externa
usuario.hasMany(navegacionExterna, {foreignKey: 'usuarioId' });
navegacionExterna.belongsTo(usuario, {foreignKey: 'usuarioId'});

//Relacion de uno a mucho Usuario - Navegacion Interna
usuario.hasMany(navegacionInterna, {foreignKey: 'usuarioId' });
navegacionInterna.belongsTo(usuario, {foreignKey: 'usuarioId'});

//Relacion de uno a mucho Estacion - Navegacion Interna
estaciones.hasMany(navegacionInterna, {foreignKey: 'estacionId'});
navegacionInterna.belongsTo(usuario, {foreignKey: 'estacionId'});










sequelize.sync({ alter: true }) // alter will update the database schema to match the model
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });

// Exportar el objeto sequelize
module.exports = {
    sequelize,
    Sequelize,
    usuario,
    estaciones,
    mensajePersonalizado,
    puntoInteres,
    beacon,
    ruta,
    guiaVoz
};
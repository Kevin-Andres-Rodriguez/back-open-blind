const ruta = (sequelize, type) => {
    return sequelize.define('ruta', {
        rutaId : {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de ruta'
        },
        nombreRuta: {
            type: type.STRING,
            comment: 'Nombres a cual pertece dicha ruta'
        },
        descripcionRuta: {
            type: type.STRING,
            comment: 'Descripcion de la ruta'
        },
        ubicacionRuta: {
            type: type.STRING,
            comment: 'ubicacion donde se encuentra la ruta'
        },
        estadoRuta: {
            type: type.BOOLEAN,
            comment: 'estado de ruta'
        },
        createRuta: {
            type: type.STRING,
            comment: 'crear ruta'
        },
        updateRuta: {
            type: type.STRING,
            comment: 'actualizar ruta'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de rutas'
    })
}

module.exports = ruta
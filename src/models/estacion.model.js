const estacion = (sequelize, type) => {
    return sequelize.define('estacion', {
        estacionId : {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de estacion'
        },
        nombreEstacion: {
            type: type.STRING,
            comment: 'Nombres a cual pertece dicha estacion'
        },
        descripcionEstacion: {
            type: type.STRING,
            comment: 'Descripcion de la estacion'
        },
        ubicacionEstacion: {
            type: type.STRING,
            comment: 'ubicacion donde se encuentra la estacion'
        },
        estadoEstacion: {
            type: type.STRING,
            comment: 'estado de usuario'
        },
        createEstacion: {
            type: type.STRING,
            comment: 'crear estacion'
        },
        updateEstacion: {
            type: type.STRING,
            comment: 'actuazlizar estacion'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de usuarios'
    })
}

module.exports = estacion

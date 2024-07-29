const mensajePersonalizado = (sequelize, type) => {
    return sequelize.define('mensajesPersonalizados', {
        mensajeId : {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de mensaje Personzalido'
        },
        mensaje: {
            type: type.TEXT,
            comment: 'meensaje en caso de emergencia'
        },
        contactoMensaje: {
            type: type.STRING,
            comment: 'Descripcion de la estacion'
        },
        estadoMensaje: {
            type: type.BOOLEAN,
            comment: 'estado de usuario'
        },
        createMensaje: {
            type: type.STRING,
            comment: 'crear estacion'
        },
        updateMensaje: {
            type: type.STRING,
            comment: 'actualizar estacion'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de Mensaje Personalizado'
    })
}

module.exports = mensajePersonalizado
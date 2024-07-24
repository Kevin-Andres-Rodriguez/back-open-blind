const puntoInteres = (sequelize, type) => {
    return sequelize.define('puntoInteres', {
        puntoInteresId : {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de punto de interes'
        },
        nombrePunto: {
            type: type.TEXT,
            comment: 'nombre del punto de interes'
        },
        descripcionPunto: {
            type: type.STRING,
            comment: 'Descripcion del punto de interes'
        },
        ubicacionPunto: {
            type: type.STRING,
            comment: 'ubicacion del punto de interes dentro del mentro'
        },
        estadoPunto: {
            type: type.STRING,
            comment: 'estado del punto de interes'
        },
        createPunto: {
            type: type.STRING,
            comment: 'crear punto interes'
        },
        updatePunto: {
            type: type.STRING,
            comment: 'actualizar punto de interes'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de usuarios'
    })
}

module.exports = puntoInteres
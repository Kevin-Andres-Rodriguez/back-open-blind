const navegacionInterna = (sequelize, type) => {
    return sequelize.define('navegacionInterna',{
        navegacionInternaId : {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de navegacion interna'
        },
        fechaHoraNavegacionInterna: {
            type: type.DATE,
            comment: 'Fecha y hora de la ruta en el metro'
        },
        createNavegacionInterna: {
            type: type.STRING,
            comment: 'crear navegacion interna'
        },
        updateNavegacionInterna: {
            type: type.STRING,
            comment: 'actuazlizar navegacion interna'
        },
        }, {
            timestamps: false,
            comment: 'Tabla navegacion interna'
    })
}

module.exports = navegacionInterna
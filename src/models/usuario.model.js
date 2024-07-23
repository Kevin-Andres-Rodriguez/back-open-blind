const usuario = (sequelize, type) => {
    return sequelize.define('usuario', {
        usuarioId: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Campo unico de usuario'
        },
        nombreUsuario: {
            type: type.STRING,
            comment: 'Nombres completo'
        },
        apellidoUsuario: {
            type: type.STRING,
            comment: 'Apellidos completo'
        },
        telefonoUsuario: {
            type: type.STRING,
            comment: 'Nombre completo'
        },
        correoUsuario: {
            type: type.STRING,
            comment: 'Correo electronico'
        },
        contraseñaUsuario: {
            type: type.STRING,
            comment: 'contraseña de usuario'
        },
        fechaNacimientoUsuario: {
            type: type.DATE,
            comment: 'Fecha de nacimiento de usuario'
        },
        rolUser:{
            type: type.STRING,
            comment: 'rolde usuario'
        },
        estado_usuario: {
            type: type.STRING,
            comment: 'estado de usuario'
        },
        createUser: {
            type: type.STRING,
            comment: 'crear de usuario'
        },
        updateUser: {
            type: type.STRING,
            comment: 'actualizar de usuario'
        },
    }, {
        timestamps: false,
        comment: 'Tabla de usuarios'
    })
}

module.exports = usuario;
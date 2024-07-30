const usuarioCtl = {};
const sql = require("../Database/dataBase.sql"); 

// Crear nuevo usuario
usuarioCtl.crear = async (req, res) => {
    const { nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, contraseñaUsuario, fechaNacimientoUsuario, rolUser, estado_usuario } = req.body;
    const createUser = new Date(); // Fecha y hora actuales

    try {
        await sql.query(
            "INSERT INTO usuarios (nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, contrasenaUsuario, fechaNacimientoUsuario, rolUser, estado_usuario, createUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, contraseñaUsuario, fechaNacimientoUsuario, rolUser, estado_usuario, createUser]
        );
        res.status(200).send("Usuario creado con éxito");
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).send("Hubo un error al crear el usuario");
    }
};

// Autenticación de usuario (puede ser extendido para incluir validación y encriptación de contraseñas)
usuarioCtl.login = async (req, res) => {
    const { correoUsuario, contraseñaUsuario } = req.body;

    try {
        const result = await sql.query(
            "SELECT * FROM usuarios WHERE correoUsuario = ? AND contrasenaUsuario = ?",
            [correoUsuario, contrasenaUsuario]
        );

        if (result.length === 0) {
            return res.status(401).send("Credenciales incorrectas");
        }

        // Aquí podrías generar un token JWT para el usuario
        res.status(200).send("Inicio de sesión exitoso");
    } catch (error) {
        console.error("Error en la autenticación:", error);
        res.status(500).send("Hubo un error al autenticar el usuario");
    }
};

module.exports = usuarioCtl;

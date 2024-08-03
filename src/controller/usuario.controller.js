const usuarioCtl = {};
const sql = require("../Database/dataBase.sql"); 
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'tu_clave_secreta'; 

// Crear nuevo usuario
usuarioCtl.crear = async (req, res) => {
    const { nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, contrasenaUsuario, fechaNacimientoUsuario, rolUser, estado_usuario } = req.body;
    const createUser = new Date(); // Fecha y hora actuales

    try {
        await sql.query(
            "INSERT INTO usuarios (nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, contrasenaUsuario, fechaNacimientoUsuario, rolUser, estado_usuario, createUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, contrasenaUsuario, fechaNacimientoUsuario, rolUser, estado_usuario, createUser]
        );
        res.status(200).send("Usuario creado con éxito");
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).send("Hubo un error al crear el usuario");
    }
};


// Autenticación de usuario
usuarioCtl.login = async (req, res) => {
    const { correoUsuario, contrasenaUsuario } = req.body;

    try {
        // Asegúrate de que la consulta devuelva todos los campos necesarios
        const result = await sql.query(
            "SELECT * FROM usuarios WHERE correoUsuario = ? AND contrasenaUsuario = ?",
            [correoUsuario, contrasenaUsuario]
        );

        if (result.length === 0) {
            return res.status(401).send("Credenciales incorrectas");
        }

        const usuario = result[0];
        const token = jwt.sign({ id: usuario.usuarioId, nombre: usuario.nombreUsuario }, secret, { expiresIn: '1h' });

        res.status(200).json({
            token,
            usuario: {
                nombre: usuario.nombreUsuario,
                apellido: usuario.apellidoUsuario,
                telefono: usuario.telefonoUsuario,
                correo: usuario.correoUsuario,
                fechaNacimiento: usuario.fechaNacimientoUsuario,
                estado: usuario.estado_usuario,
                rol: usuario.rolUser
            }
        });
    } catch (error) {
        console.error("Error en la autenticación:", error);
        res.status(500).send("Hubo un error al autenticar el usuario");
    }

    
};

// Obtener usuario por ID
usuarioCtl.obtenerPorId = async (req, res) => {
    const { id } = req.params;

    try {
        console.log("ID a buscar:", id);
        const result = await sql.query(
            "SELECT * FROM usuarios WHERE usuarioId = ?",
            [id]
        );

        if (result.length === 0) {
            return res.status(404).send("Usuario no encontrado");
        }

        res.status(200).json(result[0]);
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).send("Hubo un error al obtener el usuario");
    }
};


// Actualizar usuario por ID
usuarioCtl.actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, contrasenaUsuario, fechaNacimientoUsuario, rolUser, estado_usuario } = req.body;
    const updateUser = new Date(); // Fecha y hora actuales

    try {
        const result = await sql.query(
            "UPDATE usuarios SET nombreUsuario = ?, apellidoUsuario = ?, telefonoUsuario = ?, correoUsuario = ?, contrasenaUsuario = ?, fechaNacimientoUsuario = ?, rolUser = ?, estado_usuario = ?, updateUser = ? WHERE usuarioId = ?",
            [nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, contrasenaUsuario, fechaNacimientoUsuario, rolUser, estado_usuario, updateUser, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).send("Usuario actualizado con éxito");
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).send("Hubo un error al actualizar el usuario");
    }
};

// Eliminar usuario por ID
usuarioCtl.eliminar = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await sql.query(
            "DELETE FROM usuarios WHERE usuarioId = ?",
            [id]
        );

        if (result.affectedRows > 0) {
            res.status(200).send("Usuario eliminado con éxito");
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).send("Hubo un error al eliminar el usuario");
    }
};


// Obtener todos los usuarios
usuarioCtl.mostrarTodos = async (req, res) => {
    try {
        const resultados = await sql.query("SELECT * FROM usuarios");
        res.status(200).json(resultados);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send("Hubo un error al obtener los usuarios");
    }
};





module.exports = usuarioCtl;


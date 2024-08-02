const usuarioCtl = {};
const sql = require("../Database/dataBase.sql");
const { eliminar } = require("./estacion.controller");

// Mostrar todos los usuarios
usuarioCtl.mostrar = async (req, res) => {
  try {
    const resultados = await sql.query("SELECT * FROM usuarios");
    res.status(200).json(resultados);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).send("Hubo un error al obtener los usuarios");
  }
};

// Crear nuevo usuario
usuarioCtl.mandar = async (req, res) => {
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

// Nueva función para obtener un usuario por ID
usuarioCtl.obtenerPorId = async (req, res) =>{
  const { id } = req.params;

  try{
    console.log("ID a buscar:", id);
    const rows = await sql.query(
      "SELECT * FROM usuarios WHERE usuarioId = ?",
      [id]
    );

    if (rows.length === 0) {
      console.log("Usuario no encontrada.");
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
  }
};

usuarioCtl.eliminar = async (req, res) =>{
  const { id } = req.params;

  try{
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
// Nueva función para actualizar un usuario por ID
usuarioCtl.actualizar = async (req, res) => {
  const { id } = req.params;
  const { nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, contraseñaUsuario, fechaNacimientoUsuario, estado_usuario } = req.body;
  const updateUser = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato adecuado para MySQL

  console.log('Datos para actualizar:', {
    id,
    nombreUsuario,
    apellidoUsuario,
    telefonoUsuario,
    correoUsuario,
    fechaNacimientoUsuario,
    estado_usuario,
    updateUser
  });

  try {
    const result = await sql.query(
      `UPDATE usuarios 
       SET nombreUsuario = ?, apellidoUsuario = ?, telefonoUsuario = ?, correoUsuario = ?, 
           fechaNacimientoUsuario = ?, estado_usuario = ?, updateUser = ? 
       WHERE usuarioId = ?`,
      [nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, fechaNacimientoUsuario, estado_usuario, updateUser, id]
    );

    if (result.affectedRows > 0) {
      res.status(200).send("Usuario actualizado con éxito");
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);

    // Enviar detalles del error para depuración (solo en desarrollo, evita exponer en producción)
    res.status(500).send(`Hubo un error al actualizar el usuario: ${error.message}`);
  }
};


module.exports = usuarioCtl;

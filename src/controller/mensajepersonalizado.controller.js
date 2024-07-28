const mensajePersonalizadoCtl = {};
const sql = require("../Database/dataBase.sql"); 

mensajePersonalizadoCtl.mostrar = async (req, res) => {
  try {
    const resultados = await sql.query("SELECT * FROM mensajesPersonalizados");
    res.status(200).json(resultados);
  } catch (error) {
    console.error("Error al obtener los mensajes personalizados:", error);
    res.status(500).send("Hubo un error al obtener los mensajes personalizados");
  }
};

mensajePersonalizadoCtl.mandar = async (req, res) => {
  const { mensaje, contactoMensaje, estadoMensaje} = req.body;

  try {
    await sql.query(
      "INSERT INTO mensajesPersonalizados (mensaje, contactoMensaje, estadoMensaje) VALUES (?, ?, ?)",
      [mensaje, contactoMensaje, estadoMensaje]
    );
    res.status(200).send("Mensaje personalizado creado con éxito");
  } catch (error) {
    console.error("Error al crear el mensaje personalizado:", error);
    res.status(500).send("Hubo un error al crear el mensaje personalizado");
  }
};

// Nueva función para obtener un mensaje personalizado por ID
mensajePersonalizadoCtl.obtenerPorId = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("ID a buscar:", id);
    const rows = await sql.query(
      "SELECT * FROM mensajesPersonalizados WHERE mensajeId = ?",
      [id]
    );

    if (rows.length === 0) {
      console.log("Mensaje personalizado no encontrado.");
      return res.status(404).json({ message: 'Mensaje personalizado no encontrado' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el mensaje personalizado:", error);
    res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
  }
};

mensajePersonalizadoCtl.eliminar = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql.query(
      "DELETE FROM mensajesPersonalizados WHERE mensajeId = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      res.status(200).send("Mensaje personalizado eliminado con éxito");
    } else {
      res.status(404).send("Mensaje personalizado no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el mensaje personalizado:", error);
    res.status(500).send("Hubo un error al eliminar el mensaje personalizado");
  }
};

// Nueva función para actualizar un mensaje personalizado por ID
mensajePersonalizadoCtl.actualizar = async (req, res) => {
  const { id } = req.params;
  const { mensaje, contactoMensaje, estadoMensaje, createMensaje, updateMensaje } = req.body;

  try {
    const result = await sql.query(
      "UPDATE mensajesPersonalizados SET mensaje = ?, contactoMensaje = ?, estadoMensaje = ? WHERE mensajeId = ?",
      [mensaje, contactoMensaje, estadoMensaje, id]
    );

    if (result.affectedRows > 0) {
      res.status(200).send("Mensaje personalizado actualizado con éxito");
    } else {
      res.status(404).send("Mensaje personalizado no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar el mensaje personalizado:", error);
    res.status(500).send("Hubo un error al actualizar el mensaje personalizado");
  }
};

module.exports = mensajePersonalizadoCtl;

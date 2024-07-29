const rutaCtl = {};
const sql = require("../Database/dataBase.sql"); 

rutaCtl.mostrar = async (req, res) => {
  try {
    const resultados = await sql.query("SELECT * FROM ruta");
    res.status(200).json(resultados);
  } catch (error) {
    console.error("Error al obtener las rutas:", error);
    res.status(500).send("Hubo un error al obtener las rutas");
  }
};



rutaCtl.mandar = async (req, res) => {
  const { nombreRuta, descripcionRuta, ubicacionRuta, estadoRuta } = req.body;
  const createRuta = new Date(); // Fecha y hora actuales

  try {
    await sql.query(
      "INSERT INTO ruta (nombreRuta, descripcionRuta, ubicacionRuta, estadoRuta, createRuta) VALUES (?, ?, ?, ?, ?)",
      [nombreRuta, descripcionRuta, ubicacionRuta, estadoRuta, createRuta]
    );
    res.status(200).send("Ruta creada con éxito");
  } catch (error) {
    console.error("Error al crear la ruta:", error);
    res.status(500).send("Hubo un error al crear la ruta");
  }
};

// Nueva función para obtener una ruta por ID
rutaCtl.obtenerPorId = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("ID a buscar:", id);
    const rows = await sql.query(
      "SELECT * FROM ruta WHERE rutaId = ?",
      [id]
    );

    if (rows.length === 0) {
      console.log("Ruta no encontrada.");
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error al obtener la ruta:", error);
    res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
  }
};

rutaCtl.eliminar = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql.query(
      "DELETE FROM ruta WHERE rutaId = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      res.status(200).send("Ruta eliminada con éxito");
    } else {
      res.status(404).send("Ruta no encontrada");
    }
  } catch (error) {
    console.error("Error al eliminar la ruta:", error);
    res.status(500).send("Hubo un error al eliminar la ruta");
  }
};

// Nueva función para actualizar una ruta por ID
rutaCtl.actualizar = async (req, res) => {
  const { id } = req.params;
  const { nombreRuta, descripcionRuta, ubicacionRuta, estadoRuta } = req.body;
  const updateRuta = new Date(); // Fecha y hora actuales

  try {
    const result = await sql.query(
      "UPDATE ruta SET nombreRuta = ?, descripcionRuta = ?, ubicacionRuta = ?, estadoRuta = ?, updateRuta = ? WHERE rutaId = ?",
      [nombreRuta, descripcionRuta, ubicacionRuta, estadoRuta, updateRuta, id]
    );

    if (result.affectedRows > 0) {
      res.status(200).send("Ruta actualizada con éxito");
    } else {
      res.status(404).send("Ruta no encontrada");
    }
  } catch (error) {
    console.error("Error al actualizar la ruta:", error);
    res.status(500).send("Hubo un error al actualizar la ruta");
  }
};

module.exports = rutaCtl;

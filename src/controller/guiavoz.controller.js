const guiaVozCtl = {};
const sql = require("../Database/dataBase.sql"); 

guiaVozCtl.mostrar = async (req, res) => {
  try {
    const resultados = await sql.query("SELECT * FROM guiaVoces");
    res.status(200).json(resultados);
  } catch (error) {
    console.error("Error al obtener las guías de voz:", error);
    res.status(500).send("Hubo un error al obtener las guías de voz");
  }
};

guiaVozCtl.mandar = async (req, res) => {
  const { descripcionGuiaVoz, audioUrlGuiaVoz, idiomaGuiaVoz, estadoGuiaVoz} = req.body;

  try {
    await sql.query(
      "INSERT INTO guiaVoces (descripcionGuiaVoz, audioUrlGuiaVoz, idiomaGuiaVoz, estadoGuiaVoz) VALUES (?, ?, ?, ?)",
      [descripcionGuiaVoz, audioUrlGuiaVoz, idiomaGuiaVoz, estadoGuiaVoz]
    );
    res.status(200).send("Guía de voz creada con éxito");
  } catch (error) {
    console.error("Error al crear la guía de voz:", error);
    res.status(500).send("Hubo un error al crear la guía de voz");
  }
};

// Nueva función para obtener una guía de voz por ID
guiaVozCtl.obtenerPorId = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("ID a buscar:", id);
    const rows = await sql.query(
      "SELECT * FROM guiaVoces WHERE guiaVozId = ?",
      [id]
    );

    if (rows.length === 0) {
      console.log("Guía de voz no encontrada.");
      return res.status(404).json({ message: 'Guía de voz no encontrada' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error al obtener la guía de voz:", error);
    res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
  }
};

guiaVozCtl.eliminar = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql.query(
      "DELETE FROM guiaVoces WHERE guiaVozId = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      res.status(200).send("Guía de voz eliminada con éxito");
    } else {
      res.status(404).send("Guía de voz no encontrada");
    }
  } catch (error) {
    console.error("Error al eliminar la guía de voz:", error);
    res.status(500).send("Hubo un error al eliminar la guía de voz");
  }
};

// Nueva función para actualizar una guía de voz por ID
guiaVozCtl.actualizar = async (req, res) => {
  const { id } = req.params;
  const { descripcionGuiaVoz, audioUrlGuiaVoz, idiomaGuiaVoz, estadoGuiaVoz} = req.body;

  try {
    const result = await sql.query(
      "UPDATE guiaVoces SET descripcionGuiaVoz = ?, audioUrlGuiaVoz = ?, idiomaGuiaVoz = ?, estadoGuiaVoz = ? WHERE guiaVozId = ?",
      [descripcionGuiaVoz, audioUrlGuiaVoz, idiomaGuiaVoz, estadoGuiaVoz, id]
    );

    if (result.affectedRows > 0) {
      res.status(200).send("Guía de voz actualizada con éxito");
    } else {
      res.status(404).send("Guía de voz no encontrada");
    }
  } catch (error) {
    console.error("Error al actualizar la guía de voz:", error);
    res.status(500).send("Hubo un error al actualizar la guía de voz");
  }
};

module.exports = guiaVozCtl;

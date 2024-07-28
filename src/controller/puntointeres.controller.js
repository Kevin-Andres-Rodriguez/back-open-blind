const puntointeresCtl = {};
const sql = require("../Database/dataBase.sql");

puntointeresCtl.mostrar = async (req, res) => {
  try {
    const results = await sql.query("SELECT * FROM puntointeres");
    res.status(200).json(results);
  } catch (error) {
    console.error("Error al obtener los puntos de interés:", error);
    res.status(500).send("Hubo un error al obtener los puntos de interés");
  }
};

puntointeresCtl.mandar = async (req, res) => {
  const { nombrePunto, descripcionPunto, ubicacionPunto, estadoPunto } =
    req.body;

  try {
    await sql.query(
      "INSERT INTO puntoInteres (nombrePunto, descripcionPunto, ubicacionPunto, estadoPunto) VALUES (?, ?, ?, ?)",
      [nombrePunto, descripcionPunto, ubicacionPunto, estadoPunto]
    );
    res.status(200).send("Punto de interés creado con éxito");
  } catch (error) {
    console.error("Error al crear punto de interés:", error);
    res.status(500).send("Hubo un error al crear el punto de interés");
  }
};

// Nueva función para obtener un punto de interés por ID
puntointeresCtl.obtenerPorId = async (req, res) => {
    const { id } = req.params;

    try {
        console.log("ID a buscar:", id);
        const rows = await sql.query(
            "SELECT * FROM puntointeres WHERE puntointeresId = ?",
            [id]
        );

        if (rows.length === 0) {
            console.log("Punto de interés no encontrado.");
            return res.status(404).json({ message: 'Punto de interés no encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el punto de interés:", error);
        res.status(500).json({ message: 'Error interno del servidor: ' + error.message });
    }
};

puntointeresCtl.eliminar = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await sql.query(
        "DELETE FROM puntointeres WHERE puntointeresId = ?",
        [id]
      );
      
      if (result.affectedRows > 0) {
        res.status(200).send("Punto de interés eliminado con éxito");
      } else {
        res.status(404).send("Punto de interés no encontrado");
      }
    } catch (error) {
      console.error("Error al eliminar el punto de interés:", error);
      res.status(500).send("Hubo un error al eliminar el punto de interés");
    }
  };


  // Nueva función para actualizar un punto de interés por ID
puntointeresCtl.actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombrePunto, descripcionPunto, ubicacionPunto, estadoPunto } = req.body;
  
    try {
      const result = await sql.query(
        "UPDATE puntointeres SET nombrePunto = ?, descripcionPunto = ?, ubicacionPunto = ?, estadoPunto = ? WHERE puntointeresId = ?",
        [nombrePunto, descripcionPunto, ubicacionPunto, estadoPunto, id]
      );
      
      if (result.affectedRows > 0) {
        res.status(200).send("Punto de interés actualizado con éxito");
      } else {
        res.status(404).send("Punto de interés no encontrado");
      }
    } catch (error) {
      console.error("Error al actualizar el punto de interés:", error);
      res.status(500).send("Hubo un error al actualizar el punto de interés");
    }
  };

module.exports = puntointeresCtl;

import executeQuery, { dbPool } from "../../config/db.js";

class BeehivesController {
  getAllBeehives = async (req, res) => {
    try {
      const beehives = await executeQuery("SELECT * FROM beehive WHERE is_deleted = 0");
      res.status(200).json(beehives);
    } catch (error) {
      console.error("Error en getAllBeehives:", error);
      res.status(500).json({ error: "Error al obtener colmenas" });
    }
  };

  getBeehiveImages = async (req, res) => {
    const { beehive_id } = req.params;
    try {
      const images = await executeQuery("SELECT * FROM beehive_image WHERE beehive_id = ?", [beehive_id]);
      res.status(200).json(images);
    } catch (error) {
      console.error("Error en getBeehiveImages:", error);
      res.status(500).json({ error: "Error al obtener las imágenes de la colmena" });
    }
  };

  getBeehiveById = async (req, res) => {
    const { beehive_id } = req.params;
    try {
      const [beehive] = await executeQuery("SELECT * FROM beehive WHERE beehive_id = ? AND is_deleted = 0", [
        beehive_id,
      ]);
      if (!beehive) {
        return res.status(404).json({ error: "Colmena no encontrada" });
      }
      res.status(200).json(beehive);
    } catch (error) {
      console.error("Error en getBeehiveById:", error);
      res.status(500).json({ error: "Error al obtener la colmena" });
    }
  };

  createBeehive = async (req, res) => {
    const { name, description } = JSON.parse(req.body.newBeehive);
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      let sql = "INSERT INTO beehive (name, description) VALUES (?, ?) "; // consultas parametrizadas ( previenen inyecciones de sql )
      let values = [name, description];
      const result = await connection.query(sql, values);
      let beehive_id = result[0].insertId;

      for (const img of req.files) {
        const filename = img.filename;
        sql = "INSERT INTO beehive_image (beehive_id, image_url) VALUES (?, ?)";
        values = [beehive_id, filename];
        await connection.query(sql, values);
      }

      connection.commit();
      res.status(200).json({ message: "Beehive create" });
    } catch (error) {
      console.log(error);
      await connection.rollback();
      res.status(500).json({ error: "Error al crear la colmena" });
    } finally {
      //Siempre es obligatorio!!
      if (connection) connection.release();
    }
  };

  updateBeehive = async (req, res) => {
    const { beehive_id } = req.params;
    const { name, description } = JSON.parse(req.body.updatedBeehive);
    const connection = await dbPool.getConnection(); 
    
    try {
        await connection.beginTransaction();

        let sql = "UPDATE beehive SET name = ?, description = ? WHERE beehive_id = ?";
        let values = [name, description, beehive_id];
        const result = await connection.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Colmena no encontrada" });
        }

        if (req.files && req.files.length > 0) {
            for (const img of req.files) {
                const filename = img.filename;
                sql = "INSERT INTO beehive_image (beehive_id, image_url) VALUES (?, ?)";
                values = [beehive_id, filename];
                await connection.query(sql, values);
            }
        }

        // Si es necesario eliminar las imágenes antiguas, descomenta esta parte
        // sql = "DELETE FROM beehive_image WHERE beehive_id = ?";
        // await connection.query(sql, [beehive_id]);

     
        await connection.commit();
        res.status(200).json({ message: "Colmena actualizada con éxito" });

    } catch (error) {
        console.error("Error en updateBeehive:", error);
        await connection.rollback();
        res.status(500).json({ error: "Error al actualizar la colmena" });
    } finally {
        if (connection) connection.release();
    }
};

  logicDeleteBeehive = async (req, res) => {
    const { beehive_id } = req.params;
    try {
      const result = await executeQuery("UPDATE beehive SET is_deleted = 1 WHERE beehive_id = ?", [beehive_id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Colmena no encontrada" });
      }
      res.status(200).json({ message: "Colmena eliminada lógicamente" });
    } catch (error) {
      console.error("Error en logicDeleteBeehive:", error);
      res.status(500).json({ error: "Error al eliminar la colmena" });
    }
  };

  uploadBeehiveImage = async (req, res) => {
    const { beehive_id } = req.params;
    const { image_url } = req.body;
    try {
      const [beehive] = await executeQuery("SELECT * FROM beehive WHERE beehive_id = ? AND is_deleted = 0", [
        beehive_id,
      ]);
      if (!beehive) {
        return res.status(404).json({ error: "Colmena no encontrada" });
      }

      const result = await executeQuery("INSERT INTO beehive_image (beehive_id, image_url) VALUES (?, ?)", [
        beehive_id,
        image_url,
      ]);
      res.status(201).json({ message: "Imagen de colmena subida", beehive_image_id: result.insertId });
    } catch (error) {
      console.error("Error en uploadBeehiveImage:", error);
      res.status(500).json({ error: "Error al subir la imagen de la colmena" });
    }
  };

  deleteBeehiveImage = async (req, res) => {
    const { beehive_image_id } = req.params;
    try {
      const result = await executeQuery("DELETE FROM beehive_image WHERE beehive_image_id = ?", [beehive_image_id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Imagen no encontrada" });
      }
      res.status(200).json({ message: "Imagen eliminada de la colmena" });
    } catch (error) {
      console.error("Error en deleteBeehiveImage:", error);
      res.status(500).json({ error: "Error al eliminar la imagen de la colmena" });
    }
  };
}

export default new BeehivesController();

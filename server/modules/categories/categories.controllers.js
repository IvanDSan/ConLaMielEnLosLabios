import executeQuery from "../../config/db.js";

class CategoryController {
  getAllCategories = async (req, res) => {
    try {
      const categories= await executeQuery("SELECT * FROM category WHERE is_deleted = 0");
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error en getAllCategories:", error); 
      res.status(500).json({ error: "Error al obtener categorías" });
    }
  };

  createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "El nombre de la categoría es obligatorio" });
    }

    try {
      await executeQuery("INSERT INTO category (name) VALUES (?)", [name]);
      res.status(201).json({ message: "Categoría creada correctamente" });
    } catch (error) {
      console.error("Error en createCategory:", error);
      res.status(500).json({ error: "Error al crear la categoría" });
    }
  };

  updateCategory = async (req, res) => {
    const { category_id } = req.params;
    const { name } = req.body;
    try {
      await executeQuery("UPDATE category SET name = ? WHERE category_id = ?", [name, category_id]);
      res.json({ message: "Categoría actualizada" });
    } catch (error) {
      console.error("Error en updateCategory:", error);
      res.status(500).json({ error: "Error al actualizar la categoría" });
    }
  };

  logicDeleteCategory = async (req, res) => {
    const { category_id } = req.params;

    try {
      const result = await executeQuery("UPDATE category SET is_deleted = 1 WHERE category_id = ?", [category_id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }

      res.status(200).json({ message: "Categoría eliminada lógicamente" });
    } catch (error) {
      console.error("Error en logicDeleteCategory:", error);
      res.status(500).json({ error: "Error al eliminar la categoría" });
    }
  };
}

export default new CategoryController();

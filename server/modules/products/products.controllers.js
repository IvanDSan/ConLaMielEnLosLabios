import executeQuery from "../../config/db.js";

class ProductsController {
  createProduct = async (req, res) => {
    try {
      const { title, description, price, category_id } = req.body;

      if (!title || !description || !price || !category_id) {
        return res
          .status(400)
          .json({ error: "todos los campos son obligatorios" });
      }
      const query =
        'INSERT INTO product (title, description, price, category_id) VALUES (?, ?, ?, ?)';
    let result = await executeQuery(query, [title, description, price, category_id]);
      res.status(200).json({product_id: result.insertId});
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: 'error al crear el producto'});
    }
  };

  editProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, price, category_id } = req.body;
      const query =
        'UPDATE product SET title = ?, description = ?, price = ?, category_id = ? WHERE product_id = ?';
      const result = await executeQuery(query, [
        title,
        description,
        price,
        category_id,
        id,
      ]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.status(200).json("/admin/productos");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;

      const query = 'UPDATE product SET is_deleted = 1 WHERE product_id = ?';
      const [result] = await executeQuery(query, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.status(200).json({ message: 'Producto desactivado correctamente' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  };

  getProducts = async (req, res) => {
    try {
      const products = await executeQuery(
        "SELECT * FROM product WHERE is_deleted = 0"
      );
      res.status(200).json(products);
    } catch (error) {
      console.log("Error en getProducts:", error);
      res.status(500).json({ error: "error al obtener los productos" });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const sql =
        "SELECT * FROM product WHERE product_id = ? AND is_deleted = 0";
      const result = await executeQuery(sql, [id]);

      if (result.length === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.status(200).json(result[0]);
    } catch (error) {
      console.log("Error al obtener el producto:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
}
export default new ProductsController();

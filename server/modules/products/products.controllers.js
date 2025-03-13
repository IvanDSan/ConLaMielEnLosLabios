import executeQuery from "../../config/db.js";

class ProductsController {
  // Obtener productos disponibles
  getAllProducts = async (req, res) => {
    try {
      let sql = "SELECT * FROM product WHERE is_deleted = 0";
      let result = await executeQuery(sql);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal error" });
    }
  };
}

export default new ProductsController();

import executeQuery from "../../config/db.js";

class SalesControllers {
  //obtener historial de pedidos Admin
  getAll = async (req, res) => {
    try {
      let sql =
        "SELECT sale_id, user.name, user.lastname, product.title, quantity, sale_status, date FROM sale JOIN user ON sale.user_id = user.user_id JOIN product ON sale.product_id = product.product_id WHERE sale.is_deleted = 0 ORDER BY date DESC";
      let result = await executeQuery(sql);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal error" });
    }
  };

  //Borrado Logico
  logicDeleteSale = async (req, res) => {
    try {
      let { sale_id } = req.params;
      let sql = "UPDATE sale SET is_deleted = 1 WHERE sale_id = ?";
      await executeQuery(sql, [sale_id]);

      res.status(200).json({ mesage: "borrado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Internal error" });
    }
  };

  // Obtener historial de pedidos por User
  getSalesByUser = async (req, res) => {
    const { user_id } = req;

    try {
      let sql = `
      SELECT sale_id, product.title, quantity, sale_status, date 
      FROM sale 
      JOIN product ON sale.product_id = product.product_id 
      WHERE sale.is_deleted = 0 AND sale.user_id = ? 
      ORDER BY date DESC`;

      let result = await executeQuery(sql, [user_id]);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal error" });
    }
  };
}

export default new SalesControllers();

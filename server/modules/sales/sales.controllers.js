import executeQuery from '../../config/db.js';

class SalesControllers {
  //obtener historial de pedidos Admin
  getAll = async (req, res) => {
    try {
      let sql =
        'SELECT sale.sale_id, sale.user_id, sale.product_id, sale.sale_status, sale.quantity, sale.date, user.name, user.lastname, product.title, sale_status FROM sale JOIN user ON sale.user_id = user.user_id JOIN product ON sale.product_id = product.product_id WHERE sale.is_deleted = 0 ORDER BY date DESC';
      let result = await executeQuery(sql);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal error' });
    }
  };

  //Borrado Logico
  logicDeleteSale = async (req, res) => {
    try {
      let { sale_id } = req.params;
      let sql = 'UPDATE sale SET is_deleted = 1 WHERE sale_id = ?';
      await executeQuery(sql, [sale_id]);

      res.status(200).json({ mesage: 'borrado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Internal error' });
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
      res.status(500).json({ error: 'Internal error' });
    }
  };

  modifyStatusOfOrder = async (req, res) => {
    const { sale_status, user_id, product_id, sale_id } = req.body;

    try {
      if (![1, 2, 3].includes(sale_status)) {
        res.status(400).json({ error: 'Estado no valido' });
      }

      const sql =
        'UPDATE sale SET sale_status = ? WHERE user_id = ? AND product_id = ? AND sale_id = ?';
      const result = await executeQuery(sql, [
        sale_status,
        user_id,
        product_id,
        sale_id,
      ]);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Estado modificado correctamente' });
      } else {
        res.status(400).json({ message: 'Pedido no encontrado' });
      }
    } catch (error) {
      console.error('Error al modificar el estado del pedido', error);
      res.status(500).json({ error: 'Hay un problema con el servidor' });
    }
  };
}

export default new SalesControllers();

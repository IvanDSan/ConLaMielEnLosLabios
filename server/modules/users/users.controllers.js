import executeQuery from "../../config/db.js";

class UsersController {
  register = async (req, res) => {
    /**
     *    ENDPOINT: http://localhost:4000/users/register
     *
     *    INPUT (body): {
     *      email: string,
     *      password: string,
     *      imagen?: file
     *    }
     *
     *    OUTPUT:
     *      - En caso de exito: 200 - "Registrado correctamente"
     *      - En caso de error:
     *        - Faltan inputs: 400 - "Email y password son requeridos"
     *        - Validacion de la contraseña: 400 - "La password no cumple con las validaciones"
     *        - Email ya registrado: 409 - "Email ya registrado"
     *        - Error interno: 500 - "Internal error"
     */
    // Hacer el register
  };
  //obtener historial de pedidos
  getsalesHistory = async (req, res) => {
    try {
      let sql =
        "SELECT sale_id, product.title, quantity, sale_status, date FROM sale JOIN user ON sale.user_id = user.user_id JOIN product ON sale.product_id = product.product_id WHERE sale.is_deleted = 0 ORDER BY date DESC";
      let result = await executeQuery(sql);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal error" });
    }
  };
}

export default new UsersController();

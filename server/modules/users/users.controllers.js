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

  addProductToCart = async (req, res) => {
    const { product_id, quantity } = req.body;//METER EN EL DESTRUCTURING EL user_id
    const user_id = 1;
    const checkCart = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?"; // ? solo en db = a los valores que nos lleguen

    try {
      let result = await executeQuery(checkCart, [user_id, product_id]);
      if (result.length !== 0) {
        const updateCart =
          "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?";
        let result3 = await executeQuery(updateCart, [
          quantity,
          user_id,
          product_id,
        ]);
      } else {
        const insertCart =
          "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
        let result2 = await executeQuery(insertCart, [
          user_id,
          product_id,
          quantity,
        ]);
      }

      res.status(200).json({ message: "" });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  modifyCartQuantityToCart = async (req, res) => {
    const { product_id, quantity } = req.body;//METER EN EL DESTRUCTURING EL user_id
    const user_id = 1;
    const modifyCart =
      "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?";
    try {
      //si la cantidad es menor q -1 no puede cambiar
      if (quantity > 0) {
        let result = await executeQuery(modifyCart, [
          quantity,
          user_id,
          product_id,
        ]);
        res.status(200).json({ message: "Se ha modificado correctamente" });
      } else {
        throw new Error("No se admiten cantidades negativas");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  deleteProductToCart = async (req, res) => {
     const { product_id } = req.body;//METER EN EL DESTRUCTURING EL user_id
    const user_id = 1;
    const deletedCartProduct =
      "DELETE FROM cart WHERE user_id = ? AND  product_id = ?";
    try {
      let result = await executeQuery(deletedCartProduct, [
        user_id,
        product_id,
      ]);
      res
        .status(200)
        .json({
          message: "El producto se ha eliminado correctamente del carrito",
        });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  deleteCartFromUser = async (req, res) => {
    // const { user_id } = req.body;
    const user_id = 1;
    const deleteAllCart = "DELETE FROM cart WHERE user_id = ?";

    try {
      let result = await executeQuery(deleteAllCart, [user_id]);
      res
        .status(200)
        .json({ message: "El carrito se ha eliminado correctamente" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  showAllFromCartToUser = async (req, res) => {
    // const { user_id } = req;/////////////////////// ESPERANDO EL TOKEN//////////////////
    const user_id = 1;
    const showAllCartToUser = `SELECT p.product_id, p.title, p.price, c.quantity 
    FROM cart c 
    JOIN product p 
    ON c.product_id = p.product_id WHERE c.user_id = ?`;
    try {
      const cart = await executeQuery(showAllCartToUser, [user_id]);

      if (cart.length === 0) {
        return res
          .status(200)
          .json({ message: "El carrito está vacío", cart: [] });
      }
      res.status(200).json(cart);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener el carrito", error: error.message });
    }
  };
  
  // buyCart = async (req, res) => {
    // const { user_id } = req;
  //   const user_id = 1;
  //1ºconexion a la dbpool
  //2 crear una TRANSACCION
  //3 SELECT  CART FROM USER
  //4 resultado + BUCLE CADA PRODUC, INSERT SELEC ID,USERID, PRODUCT ID,sale_id(MAX(id + 1)), QUANTITY Y PONER EL ESTADO(CANCELADO,COMPLETADO)
  //borrar todo el carrito de ese user
  //cerrar TRANSACCION con comit (creo una venta con muchos product)(esta en new travel try,catch( si algo sale mal en el cath un roll back) y finally(cerrar conexion))
// 
  // }

}

export default new UsersController();

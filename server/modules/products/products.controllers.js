import executeQuery from "../../config/db.js";
//con esto verifico si el user tiene el estate de Admin
class Productscontrollers{
verifyAdmin = (req,res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(403).render('error', {message: "acceso denegado"});

    const verified = jwt.verify(token, process.env.JWT_SECRET );
    if (verified.user_type !== 1) {
      return res.status(403).render('error', {message: "Acceso solo para Administradores"});
    }
    req.user = verified;
    next();
  } catch(error) {
    res.status(400).render('error', {message: "Token inválido"});
  }
};
createProduct = async (req, res) => {
  try {
    const{ title, description, price, category_id } = req.body;

    if(!title || !description || !price || !category_id){
      return res.status(400).json({error: "todos los campos son obligatorios"});
    }
    const query = "INSERT INTO product (title, description, price, category_id) VALUES (?, ?, ?, ?)";
    await db.execute(query, [title, description, price, category_id]);
  
        res.status(200).json('/admin/productos');
  } catch (error) {
    res.status(500).render('error', {message:"error al crear el producto", error});
  }

};

editProduct = async (req, res) => {
  try{
    const{id} = req.params;
    const { title, description, price, category_id } = req.body;
    const query = "UPDATE product SET title = ?, description = ?, price = ?, category_id = ? WHERE product_id = ?";
    const [result] = await db.execute(query, [title, description, price, category_id, id]);
    if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json('/admin/productos');
  } catch (error) {
    res.status(500).json({error: "Error al actualizar el producto"});
  }
};

deleteProduct = async (req,res) => {
  try{
    const { id } = req.params;

    const query = "UPDATE product SET is_deleted = 1 WHERE product_id = ?";
    const [result] = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json('/admin/productos');
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
}

getProducts = async (req, res) => {
  try {
    const products = await executeQuery("SELECT * FROM product WHERE is_deleted = 0");
    res.json(products);
  } catch (error) {
    console.error("Error en getProducts:", error);
    res.status(500).json({ error: "error al obtener los productos" });
  }
};
};
export default new Productscontrollers();
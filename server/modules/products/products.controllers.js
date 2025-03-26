import executeQuery from '../../config/db.js';

class ProductsController {
  // createProduct = async (req, res) => {
  //   try {
  //     const { title, description, price, category_id } = req.body;

  //     if (!title || !description || !price || !category_id) {
  //       return res
  //         .status(400)
  //         .json({ error: 'todos los campos son obligatorios' });
  //     }
  //     const query =
  //       'INSERT INTO product (title, description, price, category_id) VALUES (?, ?, ?, ?)';
  //     let result = await executeQuery(query, [
  //       title,
  //       description,
  //       price,
  //       category_id,
  //     ]);
  //     res.status(200).json({ product_id: result.insertId });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: 'error al crear el producto' });
  //   }
  // };

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
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json('/admin/productos');
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;

      const query = 'UPDATE product SET is_deleted = 1 WHERE product_id = ?';
      const result = await executeQuery(query, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
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
        'SELECT * FROM product WHERE is_deleted = 0'
      );
      res.status(200).json(products);
    } catch (error) {
      console.log('Error en getProducts:', error);
      res.status(500).json({ error: 'error al obtener los productos' });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const sql =
        'SELECT * FROM product WHERE product_id = ? AND is_deleted = 0';
      const result = await executeQuery(sql, [id]);

      if (result.length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      res.status(200).json(result[0]);
    } catch (error) {
      console.log('Error al obtener el producto:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };


  // getAllProductsImages = async (req, res) => {
  //   try {
  //     const images = await executeQuery('SELECT * FROM product_image LIMIT 10');
  //     res.status(200).json(images);
  //   } catch (error) {
  //     console.error('Error en getAllProductsImages:', error);
  //     res
  //       .status(500)
  //       .json({ error: 'Error al obtener las imagenes' });
  //   }
  // };

  // uploadImageProduct = async (req, res) => { //subir imagen del producto
  //   try {
  //     const { product_id } = req.params;
  //     const { image_url } = req.body;

  //     if (!image_url) {
  //      res.status(400).json({ error: 'La URL de la imagen es obligatoria' });
  //     }

  //     const checkProduct = await executeQuery(
  //       'SELECT * FROM product WHERE product_id = ? AND is_deleted = 0',
  //       [product_id] );
     
  //     if (checkProduct.length === 0) {
  //      res.status(404).json({ error: 'Producto no encontrado' });
  //     }

  //     const query =
  //       'INSERT INTO product_image (product_id, image_url) VALUES (?, ?)';
  //     const result = await executeQuery(query, [product_id, image_url]);

  //     res.status(200).json({ message: 'Imagen agregada correctamente', product_image_id: result.insertId });
  //   } catch (error) {
  //     console.log('Error al agregar imagen:', error);
  //     res.status(500).json({ error: 'Error interno del servidor' });
  //   }
  // };

  // updateProductImage = async (req, res) => { //actualizar foto de un Producto
  //   try {
  //     const { product_image_id } = req.params;
  //     const { image_url } = req.body;

  //     if (!image_url) return res.status(400).json({ error: 'La URL de la imagen es obligatoria' });

  //     const query = 'UPDATE product_image SET image_url = ? WHERE product_image_id = ?';
  //     const result = await executeQuery(query, [image_url, product_image_id]);

  //     if (result.affectedRows === 0) return res.status(404).json({ error: 'Imagen no encontrada' });

  //     res.status(200).json({ message: 'Imagen actualizada correctamente' });
  //   } catch (error) {
  //     console.error('Error al actualizar la imagen:', error);
  //     res.status(500).json({ error: 'Error interno del servidor' });
  //   }
  // };

    createProduct = async (req, res) => {
      try {
        console.log('Datos recibidos:', req.body); // Agrega esto para depurar
  
        if (!req.body.newProduct) {
          return res
            .status(400)
            .json({ error: 'No se enviaron datos del producto' });
        }
  
        const newProduct = JSON.parse(req.body.newProduct);
        const { title, description, price, category_id } = newProduct;
  
        if (!title || !description || !price || !category_id) {
          return res
            .status(400)
            .json({ error: 'Todos los campos son obligatorios' });
        }
  
        const connection = await dbPool.getConnection();
        await connection.beginTransaction();
  
        const sql =
          'INSERT INTO product (title, description, price, category_id) VALUES (?, ?, ?, ?)';
        const [result] = await connection.query(sql, [
          title, description, price, category_id]);
        const product_id = result.insertId;
  
        if (req.files && req.files.length > 0) {
          for (const img of req.files) {
            await connection.query(
              'INSERT INTO product_image (product_id, image_url) VALUES (?, ?)',
              [product_id, img.filename]
            );
          }
        }
  
        await connection.commit();
        res.status(200).json({ message: 'Producto creado con éxito' });
      } catch (error) {
        console.error('Error en createProduct:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
      }
    };


  deleteProductImage = async (req, res) => {
    try {
      const { product_image_id } = req.params;
      const result = await executeQuery(
        'DELETE FROM product_image WHERE product_image_id = ?',[product_image_id]);

      if (result.affectedRows === 0) {
       res.status(404).json({ error: 'Imagen no encontrada' });
      }

      res.status(200).json({ message: 'Imagen eliminada correctamente' });
    } catch (error) {
      console.error('Error en deleteProductImage:', error);
      res
        .status(500)
        .json({ error: 'Error al eliminar la imagen' });
    }
  };



}
export default new ProductsController();

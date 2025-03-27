import executeQuery, { dbPool } from '../../config/db.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductsController {
  createProduct = async (req, res) => {
    const connection = await dbPool.getConnection();

    try {
      if (!req.body.newProduct) {
        return res
          .status(400)
          .json({ error: 'No se enviaron datos del producto' });
      }

      const newProduct = JSON.parse(req.body.newProduct);
      const { title, description, price, categoryId: category_id } = newProduct;

      if (!title || !description || !price || !category_id) {
        return res
          .status(400)
          .json({ error: 'Todos los campos son obligatorios' });
      }

      await connection.beginTransaction();

      const sql =
        'INSERT INTO product (title, description, price, category_id) VALUES (?, ?, ?, ?)';
      const result = await connection.query(sql, [
        title,
        description,
        price,
        category_id,
      ]);
      const product_id = result[0].insertId;

      if (req.files && req.files.length > 0) {
        for (const img of req.files) {
          await connection.query(
            'INSERT INTO product_image (product_id, image_url) VALUES (?, ?)',
            [product_id, img.filename]
          );
        }
      }

      connection.commit();

      res
        .status(200)
        .json({ message: 'Producto creado con éxito', product_id });
    } catch (error) {
      console.error('Error en createProduct:', error);

      await connection.rollback();
      res.status(500).json({ error: 'Error al crear el producto' });
    } finally {
      if (connection) connection.release();
    }
  };

  editProduct = async (req, res) => {
    const connection = await dbPool.getConnection();

    try {
      if (!req.body.newProduct) {
        return res
          .status(400)
          .json({ error: 'No se enviaron datos del producto' });
      }

      const newProduct = JSON.parse(req.body.newProduct);
      const { title, description, price, category_id } = newProduct;
      const { id } = req.params;

      if (!title || !description || !price || !category_id) {
        return res
          .status(400)
          .json({ error: 'Todos los campos son obligatorios' });
      }

      await connection.beginTransaction();

      const sql =
        'UPDATE product SET title = ?, description = ?, price = ?, category_id = ? WHERE product_id = ?;';
      const result = await connection.query(sql, [
        title,
        description,
        price,
        category_id,
        id,
      ]);

      if (req.files && req.files.length > 0) {
        for (const img of req.files) {
          await connection.query(
            'INSERT INTO product_image (product_id, image_url) VALUES (?, ?)',
            [id, img.filename]
          );
        }
      }

      connection.commit();

      res.status(200).json({ message: 'Producto editado con éxito' });
    } catch (error) {
      console.error('Error en createProduct:', error);

      await connection.rollback();
      res.status(500).json({ error: 'Error al crear el producto' });
    } finally {
      if (connection) connection.release();
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

      for (const product of products) {
        const images = await executeQuery(
          'SELECT * FROM product_image WHERE product_id = ?',
          [product.product_id]
        );
        product.images = images;
      }

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

      const images = await executeQuery(
        'SELECT * FROM product_image WHERE product_id = ?',
        [id]
      );
      result[0].images = images;

      res.status(200).json(result[0]);
    } catch (error) {
      console.log('Error al obtener el producto:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  deleteProductImage = async (req, res) => {
    try {
      const { product_image_id } = req.params;
      const { image_url } = req.body;

      if (!image_url) {
        return res
          .status(400)
          .json({ error: 'El nombre de la imagen es obligatoria' });
      }

      const result = await executeQuery(
        'DELETE FROM product_image WHERE product_image_id = ?',
        [product_image_id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Imagen no encontrada' });
      }

      // Eliminar la imagen del servidor
      const imagePath = path.join(
        __dirname,
        '../../public/images/products',
        image_url
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.log(imagePath);
        console.warn(`Imagen no encontrada en el servidor: ${image_url}`);
      }

      res.status(200).json({ message: 'Imagen eliminada correctamente' });
    } catch (error) {
      console.error('Error en deleteProductImage:', error);
      res.status(500).json({ error: 'Error al eliminar la imagen' });
    }
  };
}
export default new ProductsController();

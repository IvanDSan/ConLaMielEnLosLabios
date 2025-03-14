import React, { useEffect, useState } from "react";
import './Style.css';
import axios from "axios";

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: '',
        category_id: '',
    });
    const [productToEdit, setProductToEdit] = useState(null);

   
    useEffect(() => {
        axios.get("http://localhost:4000/products/all")
            .then(res => setProducts(res.data))
            .catch(error => console.error("Error al obtener los productos", error));
    }, []);

  
    const handleCreateProduct = () => {
        axios.post("http://localhost:4000/products/verify", newProduct)
            .then(() => {
                setNewProduct({ title: '', description: '', price: '', category_id: '' });
                axios.get("http://localhost:4000/products/all")
                    .then(res => setProducts(res.data));
            })
            .catch(error => console.error("Error al crear el producto", error));
    };

   
    const handleEditProduct = (id) => {
        if (productToEdit) {
            axios.put(`http://localhost:4000/products/${id}`, productToEdit)
                .then(() => {
                    setProductToEdit(null);
                    axios.get("http://localhost:4000/products/all")
                        .then(res => setProducts(res.data));
                })
                .catch(error => console.error("Error al editar el producto", error));
        }
    };

   
    const handleDeleteProduct = (id) => {
        axios.delete(`http://localhost:4000/products/${id}`)
            .then(() => {
                axios.get("http://localhost:4000/products/all")
                    .then(res => setProducts(res.data));
            })
            .catch(error => console.error("Error al eliminar el producto", error));
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <div className="menu-item">📂 Apadrinamiento</div>
                <div className="menu-item">👤 Users</div>
                <div className="menu-item active">🛒 Productos</div>
            </aside>
            <main className="content">
                <h1>Productos</h1>
                <div className="filters">
                    <select>
                        <option>Seleccionar</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Buscar por código o ID"
                        onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                    />
                    <button onClick={handleCreateProduct}>Productos</button>
                    <div className="right-controls">
                        <select>
                            <option>Hoy</option>
                        </select>
                        <button>Descargar</button>
                        <button className="delete">🗑 Borrar</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>All</th>
                            <th>No.</th>
                            <th>Imagen</th>
                            <th>ID del producto</th>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Stock</th>
                            <th>Tamaño</th>
                            <th>Color</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.product_id}>
                                <td><input type="checkbox" /></td>
                                <td>{index + 1}</td>
                                <td><img src={product.image_url} alt={product.title} width="50" /></td>
                                <td>{product.product_id}</td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.stock}</td>
                                <td>{product.size || "N/A"}</td>
                                <td>{product.color || "N/A"}</td>
                                <td>{product.price}€</td>
                                <td>
                                    <button onClick={() => setProductToEdit(product)}>✏️</button>
                                    <button onClick={() => handleDeleteProduct(product.product_id)}>🗑</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button>◀ Previous</button>
                    <span>1 2 3</span>
                    <button>Next ▶</button>
                </div>

                {productToEdit && (
                    <div className="edit-form">
                        <h2>Editar Producto</h2>
                        <input
                            type="text"
                            value={productToEdit.title}
                            onChange={(e) => setProductToEdit({ ...productToEdit, title: e.target.value })}
                            placeholder="Título"
                        />
                        <textarea
                            value={productToEdit.description}
                            onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })}
                            placeholder="Descripción"
                        />
                        <input
                            type="number"
                            value={productToEdit.price}
                            onChange={(e) => setProductToEdit({ ...productToEdit, price: e.target.value })}
                            placeholder="Precio"
                        />
                        <input
                            type="text"
                            value={productToEdit.category_id}
                            onChange={(e) => setProductToEdit({ ...productToEdit, category_id: e.target.value })}
                            placeholder="ID de categoría"
                        />
                        <button onClick={() => handleEditProduct(productToEdit.product_id)}>Actualizar</button>
                    </div>
                )}
            </main>
        </div>
    );
};



import { createContext, useState, useEffect } from "react";
import axios from "axios";

import './shoppingCart.css';

export const ShoppingCartContext = createContext();
export const ShoppingCartProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:4000/users/showAllFromCartToUser")
      .then((res) => 
       
        { console.log("REEEEEEEEEEEEESSSS", res)
          setCart(res.data)})
      .catch((err) => console.error("Error al obtener el carrito:", err));
  }, []);

  const addToCart = (product) => {
    axios
      .post("http://localhost:4000/cart/addProductToCart", { product_id: product.product_id })
      .then(() => setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.product_id === product.product_id);
        if (existingProduct) {
          return prevCart.map((item) =>
            item.product_id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      }))
      .catch((err) => console.error("Error al agregar producto:", err));
  };

  const removeFromCart = (product_id) => {
    axios
      .post("http://localhost:4000/cart/deleteProductToCart", { product_id })
      .then(() => setCart((prevCart) => prevCart.filter((item) => item.product_id !== product_id)))
      .catch((err) => console.error("Error al quitar producto:", err));
  };

  const increaseQuantity = (product_id) => {
    axios
      .post("http://localhost:4000/cart/modifyCartQuantityToCart", { product_id, quantity: 1 })
      .then(() => setCart((prevCart) =>
        prevCart.map((item) =>
          item.product_id === product_id ? { ...item, quantity: item.quantity + 1 } : item
        )
      ))
      .catch((err) => console.error("Error al aumentar cantidad:", err));
  };
  
  const decreaseQuantity = (product_id) => {
    axios
      .post("http://localhost:4000/cart/modifyCartQuantityToCart", { product_id, quantity: -1 })
      .then(() => setCart((prevCart) =>
        prevCart.map((item) =>
          item.product_id === product_id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      ))
      .catch((err) => console.error("Error al reducir cantidad:", err));
  };

  const clearCart = () => {
    axios
      .post("http://localhost:4000/cart/deleteCartFromUser")
      .then(() => setCart([]))
      .catch((err) => console.error("Error al vaciar carrito:", err));
  };

  // const buyCart = () =>{
  //   axios
  //     .post("http://localhost:4000/cart/buyCart")
  //     .then(() => setCart([]))
  //     .catch((err) => console.error("Error en la compra del carrito:", err));
  // };

  return (
    <ShoppingCartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}

      <div className="carrito">
 
        {/* <div>
          {products.map((product) => (
            <div key={product.product_id}>
              <h2>{product.title}</h2>
              <p>{product.price}</p>
              <button onClick={() => addToCart(product)}>Agregar al carrito</button>
            </div>
          ))}
        </div> */}

        <h1>Carrito</h1>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <ul>
            {cart.map((item) => (
             
              
                  <li className="cartItem" key={item.product_id}>
                    <span>{item.title} - {item.price} €</span>
                  <div className="botonesCart">

                    <div className="contador">
                      <button onClick={() => increaseQuantity(item.product_id)}>+</button>
                      <span className="conT">{item.quantity}</span>
                      <button onClick={() => decreaseQuantity(item.product_id)}>-</button>
                    </div>
                    
                    <button onClick={() => removeFromCart(item.product_id)}>Eliminar</button>
                    <button onClick={() => clearCart}>Vaciar Carrito</button>
                  </div>
                  </li>
               
            
            ))}
            <div className="cartTotal">
                  <p>Total del carrito</p>
                  <p>Subtotal</p>
                  <p>Envío</p>
                  <span className="rayaCart"></span>
                  <p>Total</p>

                  <div >
                    <button className="botonesCart2">Finaliza tu compra</button>
                    </div>

                </div>
          </ul>
        )}
      </div>
    </ShoppingCartContext.Provider>
  );
};
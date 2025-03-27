import { useEffect, useContext, createContext, useState } from 'react';
import { UserContext } from './UserContext';
import { fetchData } from '../helpers/axiosHelper';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, token } = useContext(UserContext);

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await fetchData(
          '/users/showAllFromCartToUser',
          'GET',
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        if (res.status === 200) {
          setCart(res.data.cart || []);
        }
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
        toast.error('Error al obtener el carrito');
      }
    };

    if (token && user?.user_type === 2) {
      getCart();
    }
  }, [token, user]);

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity,
      0
    );
    const envio = subtotal > 0 ? 8 : 0;
    return { subtotal, envio, total: subtotal + envio };
  };

  const removeFromCart = async (product_id) => {
    try {
      await fetchData(
        '/users/deleteProductToCart',
        'POST',
        { product_id },
        { Authorization: `Bearer ${token}` }
      );
      setCart((prevCart) =>
        prevCart.filter((item) => item.product_id !== product_id)
      );
    } catch (error) {
      console.error('Error al quitar producto:', error);
      toast.error('Error al quitar producto');
    }
  };

  const updateQuantity = async (product_id, quantity, factor) => {
    if (quantity + factor > 0) {
      try {
        await fetchData(
          '/users/modifyCartQuantityToCart',
          'POST',
          {
            product_id,
            quantity: quantity + factor,
          },
          { Authorization: `Bearer ${token}` }
        );
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.product_id === product_id
              ? { ...item, quantity: quantity + factor }
              : item
          )
        );
      } catch (error) {
        console.error('Error al actualizar cantidad:', error);
        toast.error('Error al actualizar cantidad');
      }
    }
  };

  const clearCart = async () => {
    try {
      if (cart.length > 0) {
        const res = await fetchData("/users/deleteCartFromUser", "POST", null, {
          Authorization: `Bearer ${token}`,
        });

        if (res.status !== 200) {
          throw new Error("Error al vaciar carrito en backend");
        }
        
      setCart([]);
      }
      return true;
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
      toast.error("Error al vaciar el carrito");
      return false;
    }
  };

  const addToCart = async (product) => {
    try {
      await fetchData(
        '/users/addProductToCart',
        'POST',
        {
          product_id: product.product_id,
        },
        { Authorization: `Bearer ${token}` }
      );

      setCart((prevCart) => {
        const existingProduct = prevCart.find(
          (item) => item.product_id === product.product_id
        );
        if (existingProduct) {
          return prevCart.map((item) =>
            item.product_id === product.product_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });

      toast.success(`${product.title} agregado al carrito`);
    } catch (error) {
      console.error("Error al agregar producto:", error);
      if (error.response?.status === 401) {
        toast.error("Debes iniciar sesión para agregar productos al carrito");
      } else {
        toast.error('Error al agregar producto');
      }
    }
  };

  const purchaseCart = async () => {
    if (cart.length === 0) {
      toast.error("El carrito está vacío");
      return false;
    }

    const requiredUserFields = ["phone_number", "city", "province", "address", "zipcode"];

    const missingFields = requiredUserFields.filter((field) => !user[field]);

    if (missingFields.length > 0) {
      toast.error("Faltan datos de perfil. Por favor completa: " + missingFields.join(", "));
      return false;
    }

    try {
      const purchaseResponse = await fetchData(
        "/users/completePurchaseCart",
        "POST",
        { products: cart },
        { Authorization: `Bearer ${token}` }
      );

      if (purchaseResponse.status !== 200) {
        throw new Error(purchaseResponse.message || "Error en la compra");
      }
      setCart([]);
      toast.success("Compra realizada con éxito");
      return true;
    } catch (error) {
      console.error("Error al comprar el carrito:", error);
      toast.error(error.message || "Error al procesar la compra");
      return false;
    }
  };

  const getNumberOfTotalProducts = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        calculateTotal,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToCart,
        cart,
        purchaseCart,
        getNumberOfTotalProducts,

      }}>
      {children}
    </CartContext.Provider>
  );
};

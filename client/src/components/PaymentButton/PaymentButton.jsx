import React, { useContext } from "react";
import { CartContext } from "../../context/CartContextProvider";

export const CheckoutButton = () => {
  const { cart, purchaseCart } = useContext(CartContext);

  const handleCheckout = async () => {
    try {
      // Obtener el token de autenticación (ajusta esto según como manejas la autenticación)
      const token = localStorage.getItem("token"); // o de donde almacenes el token
      
      const response = await fetch("http://localhost:4000/payment/checkout", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Añadir el token de autenticación
        },
        body: JSON.stringify({ 
          items: cart, 
          email: "cliente@email.com",
          // Si no quieres usar autenticación por token, puedes enviar el userId directamente:
          userId: localStorage.getItem("userId") // o de donde obtengas el ID del usuario
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al procesar el pago");
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirige a Stripe Checkout
      } else {
        alert("Error: No se recibió URL de pago");
      }
    } catch (error) {
      console.error("Error en checkout:", error);
      alert(error.message || "Error al procesar el pago");
    }
  };

  return <button onClick={handleCheckout}>Finalizar compra</button>;
};
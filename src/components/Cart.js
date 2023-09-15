import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import PropGreeting from './PropGreeting';

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEd5PIbDSQEfyyaimc7Hw0x8SAG02eQo8",
  authDomain: "comision-47140-fba36.firebaseapp.com",
  projectId: "comision-47140-fba36",
  storageBucket: "comision-47140-fba36.appspot.com",
  messagingSenderId: "1013720983782",
  appId: "1:1013720983782:web:7e35120883da5af7693327"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Cart() {
  const { cart, removeItem, clearCart } = useCart();

  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    email: '',
  });

  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo({
      ...buyerInfo,
      [name]: value,
    });
  };

  const handleConfirmPurchase = async () => {
    console.log('Datos del comprador:', buyerInfo);
    console.log('Productos en el carrito:', cart);
  
    await Promise.all(
      cart.map(async (item) => {
        const productRef = doc(db, 'products', item.id);
  
        try {
          const productDoc = await getDoc(productRef);
          const currentStock = productDoc.data().stock;
  
          if (currentStock >= item.quantity) {
            const newStock = currentStock - item.quantity;
            await updateDoc(productRef, { stock: newStock });
          } else {
            console.error(`Stock insuficiente para ${item.title}`);
          }
        } catch (error) {
          console.error('Error al actualizar el stock:', error);
        }
      })
    );
  
    clearCart();
  
    setPurchaseConfirmed(true);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto mt-10 max-w-screen-xl">
      {cart.length === 0 && !purchaseConfirmed ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Tu carrito está vacío</h2>
          <p className="text-gray-500 mt-2">¡Ve a comprar algo!</p>
          <Link to="/" className="mt-4 text-blue-500 hover:underline">Ir a la Tienda</Link>
        </div>
      ) : (
        <>
          <h2 className="p-8 text-3xl">Tu Carrito de Compras</h2>
          <PropGreeting greeting="¡Tu Carrito de Compras!" />
          {purchaseConfirmed ? (
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">¡Compra confirmada!</h3>
              <Link to="/" className="text-blue-500 hover:underline">Seguir Comprando</Link>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-300 p-6">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p>Cantidad: {item.quantity}</p>
                      <p>Precio Unitario: ${item.price}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!purchaseConfirmed && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-end">Total: ${calculateTotalPrice()}</h3>
              <button
                onClick={clearCart}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Vaciar Carrito
              </button>
              <Link to="/" className="mt-4 text-blue-500 hover:underline">Seguir Comprando</Link>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-600 font-semibold">Nombre:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={buyerInfo.name}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-600 font-semibold">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={buyerInfo.email}
                    onChange={handleInputChange}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleConfirmPurchase}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Confirmar Compra
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;

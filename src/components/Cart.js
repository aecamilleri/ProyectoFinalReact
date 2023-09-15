import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
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
          <img src="https://cdn-icons-png.flaticon.com/512/4379/4379542.png" className='w-56 m-auto my-10' alt=''/>
          <p className="text-gray-500 mt-2">¡Ve a comprar algo!</p>
          <button className='bg-blue-500 border rounded-md py-2 px-6 my-2.5'>
            <Link to="/" className="mt-4 text-white hover:underline">Ir a la Tienda</Link>
          </button>
        </div>
      ) : (
        <>
          {purchaseConfirmed ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">¡Compra confirmada!</h2>
              <img src="https://cdn-icons-png.flaticon.com/512/6569/6569223.png" className='w-56 m-auto my-10' alt=''/>
              <button className='bg-blue-500 border rounded-md py-2 px-6 my-2.5'>
                <Link to="/" className="mt-4 text-white hover:underline">Seguir Comprando</Link>
              </button>
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
            <div className="m-6">
              <h3 className="text-xl font-semibold text-end">Total: ${calculateTotalPrice()}</h3>
              <div className='flex w-full justify-end'>
                <button
                  onClick={clearCart}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Vaciar Carrito
                </button>
                <Link to="/" className="mt-4 text-blue-500 hover:underline ml-4">Seguir Comprando</Link>
              </div>
              <div className='p-6'>
                <form>
                  <div className="mb-4">
                  <h3 className="text-xl font-semibold text-black pb-4 border-b-2 border-black">Completa tus Datos</h3>
                    <label htmlFor="name" className="block text-gray-600 font-semibold pt-4">Nombre:</label>
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
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-600 font-semibold">Dirección:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={buyerInfo.address}
                      onChange={handleInputChange}
                      className="border rounded-md p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-600 font-semibold">Teléfono:</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={buyerInfo.phone}
                      onChange={handleInputChange}
                      className="border rounded-md p-2 w-full"
                    />
                  </div>
                  <div className='flex w-full justify-end'>
                    <button
                    type="button"
                    onClick={handleConfirmPurchase}
                    className="bg-blue-500 text-white py-2 px-4 mt-6 rounded hover:bg-blue-600"
                    >
                    Confirmar Compra
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;

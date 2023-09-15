import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import ItemCount from './ItemCount';
import PropGreeting from './PropGreeting';
import { useCart } from './CartContext';
import { db } from '../Firebase'; 
import { getDoc, doc } from 'firebase/firestore'; 

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { addItem } = useCart();
  const [addToCartCount, setAddToCartCount] = useState(0);

  const handleAddToCart = (count) => {
    setAddToCartCount(count);
    addItem({ ...item, quantity: count });
  };

  useEffect(() => {
    const fetchProductFromFirestore = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'products', id));

        if (productDoc.exists()) {
          const productData = productDoc.data();

          const selectedProduct = {
            id: productDoc.id,
            title: productData.title,
            price: productData.price,
            description: productData.description,
            category: productData.category,
            image: productData.image,
            stock: productData.stock, 
          };

          setItem(selectedProduct);
        } else {
          console.error('El producto no existe en Firestore');
        }
      } catch (error) {
        console.error('Error al obtener los datos desde Firestore:', error);
      }
    };

    fetchProductFromFirestore();
  }, [id]);

  if (!item) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container m-auto max-w-screen-xl">
      <h2 className="p-8 text-3xl">Detalle del Producto</h2>
      <PropGreeting greeting="¡Bienvenido a los detalles del producto!" />
      <div className="w-full py-6">
        <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="w-full md:w-1/3">
            <div className="flex justify-center items-center">
              <img
                src={item.image}
                alt={item.title}
                className="object-cover m-8 w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="flex flex-col items-start p-5">
              <div className="flex flex-col md:flex-row w-full">
                <div className="flex md:w-1/3 justify-start items-center">
                  <p className="text-white bg-black rounded text-lg p-4">
                    <span className="text-4xl">${item.price}</span>
                  </p>
                </div>
                <div className="md:w-1/2">
                  <p className="text-gray-700 text-sm mt-4">
                    <NavLink to="/categories" className="underline text-blue-700">
                      Categories:
                    </NavLink>
                    &nbsp;
                    <NavLink className="underline text-blue-700" to={`/category/${item.category}`}>
                      {item.category}
                    </NavLink>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold py-10">{item.title}</h3>
                <p className="text-gray-700 text-lg">
                  <b>Descripción:</b>
                </p>
                <p>{item.description}</p>
              </div>
              <div className="flex flex-col w-full content-end pt-10">
                {addToCartCount === 0 ? (
                  <ItemCount initial={1} stock={item.stock} onAdd={handleAddToCart} /> 
                ) : (
                  <div>
                    <p className="text-gray-700 text-lg p-3">
                      <b>Se agregarán {addToCartCount} ítems al carrito.</b>
                    </p>
                    <NavLink to="/cart">
                      <button className="uppercase font-semibold text-xs min-w-full px-3 py-2 m-2 border-2 bg-gray-400 border-white shadow-md rounded-md tracking-widest">
                        Ir al Carrito
                      </button>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;

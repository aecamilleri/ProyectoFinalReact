import React, { useState, useEffect } from 'react';
import PropGreeting from './PropGreeting';
import ItemDetails from './ItemDetails';
import { db } from '../Firebase'; 
import { collection, getDocs, query, limit } from 'firebase/firestore'; 

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const maxItemsToShow = 10; 

  useEffect(() => {
    const fetchProductsFromFirestore = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, limit(maxItemsToShow));
        const querySnapshot = await getDocs(q);

        const productList = [];
        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          const product = {
            id: doc.id,
            title: productData.title,
            price: productData.price,
            details: productData.description,
            pictureUrl: productData.image,
            category: productData.category,
          };
          productList.push(product);
        });

        setItems(productList);
      } catch (error) {
        console.error('Error al obtener los datos desde Firestore:', error);
      }
    };

    fetchProductsFromFirestore();
  }, []);

  return (
    <div className="container m-auto max-w-screen-xl">
      <h2 className="p-8 text-3xl">
        <span>Lista de Productos</span>
      </h2>
      <PropGreeting greeting="¡Bienvenido a mi tienda en línea!" />
      <div className="grid grid-cols-3 md:grid-cols-5 py-6">
        {items.map((item) => (
          <div key={item.id} className="border p-2 m-2 rounded shadow-md">
            <ItemDetails item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;

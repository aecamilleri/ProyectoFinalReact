import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemCount from './ItemCount';
import { useCart } from './CartContext';
import { db } from '../Firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';

function ProductItem({ product }) {
  const [addToCartCount, setAddToCartCount] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProductStock = async () => {
      const productRef = doc(db, 'products', product.id);
      try {
        const productDoc = await getDoc(productRef);
        const currentStock = productDoc.data().stock;
        setProductStock(currentStock);
      } catch (error) {
        console.error('Error al obtener el stock del producto:', error);
      }
    };

    fetchProductStock();
  }, [product.id]);

  const handleAddToCart = (count) => {
    setAddToCartCount(count);
    addItem({ ...product, quantity: count });
  };

  return (
    <div className="p-10 border rounded-sm w-full text-center">
      <div className="flex flex-col md:flex-row" to={`/item/${product.id}`}>
        <div
          className="w-1/10 mx-auto mt-2"
          style={{ aspectRatio: '1/1' }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-32 mx-auto"
          />
        </div>
        <div className="w-3/6 text-left">
          <Link to={`/item/${product.id}`}>
            <h3
              className="text-xl font-bold w-full"
              style={{ minHeight: '6rem' }}
            >
              {product.title}
            </h3>
          </Link>
          <div className="flex md:w-1/3 justify-start items-center">
            <p className="text-white bg-black rounded text-lg p-4">
              <span className="text-2xl">${product.price}</span>
            </p>
          </div>
        </div>
        <div className="w-3/12 text-left">
          {addToCartCount === 0 ? (
            <ItemCount initial={1} stock={productStock} onAdd={handleAddToCart} />
          ) : (
            <div>
              <p className="text-gray-700 text-center text-lg p-3">
                <b>Se agregarán {addToCartCount} ítems al carrito.</b>
              </p>
              <Link to="/cart">
                <button className="uppercase font-semibold text-xs min-w-full px-3 py-2 m-2 border-2 bg-gray-400 border-white shadow-md rounded-md tracking-widest">
                  Ir al Carrito
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryProducts() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const productCollection = collection(db, 'products');
        const q = query(productCollection, where('category', '==', category));
        const querySnapshot = await getDocs(q);

        const productData = [];
        querySnapshot.forEach((doc) => {
          const product = doc.data();
          productData.push({
            id: doc.id,
            ...product,
          });
        });

        setProducts(productData);
      } catch (error) {
        console.error('Error al obtener la lista de productos por categoría:', error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <div className="container m-auto max-w-screen-xl">
      <h2 className="p-8 text-5xl">Productos de la Categoría: {category}</h2>
      <div className="grid grid-cols-1 gap-4 py-10">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;

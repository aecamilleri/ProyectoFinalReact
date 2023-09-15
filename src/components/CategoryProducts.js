import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PropGreeting from './PropGreeting';
import { useParams } from 'react-router-dom';
import ItemCount from './ItemCount';
import { useCart } from './CartContext'; 
import { db } from '../Firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore'; 

function ProductItem({ product }) {
  const [addToCartCount, setAddToCartCount] = useState(0);
  const { addItem } = useCart(); 

  const handleAddToCart = (count) => {
    setAddToCartCount(count);
    addItem({ ...product, quantity: count });
  };

  return (
    <div className='p-10 border rounded-sm w-full text-center'>
      <div className='flex flex-col md:flex-row' to={`/item/${product.id}`}>
        <div className='w-1/10 mx-auto mt-2' style={{ aspectRatio: '1/1' }}>
          <img src={product.image} alt={product.title} className='w-32 mx-auto' />
        </div>
        <div className='w-3/6 text-left'>
          <Link to={`/item/${product.id}`}> 
            <h3 className='text-xl font-bold w-full' style={{ minHeight: '6rem' }}>
              {product.title}
            </h3>
          </Link>
          <p>Precio: ${product.price}</p>
        </div>
        <div className='w-3/12 text-left'>
          {addToCartCount === 0 ? (
            <ItemCount initial={1} stock={5} onAdd={handleAddToCart} />
          ) : (
            <div>
              <p className='text-gray-700 text-center text-lg p-3'>
                <b>Se agregarán {addToCartCount} ítems al carrito.</b>
              </p>
              <Link to='/cart'>
                <button className='uppercase font-semibold text-xs min-w-full px-3 py-2 m-2 border-2 bg-gray-400 border-white shadow-md rounded-md tracking-widest'>
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
    <div className='container m-auto max-w-screen-xl'>
      <h2 className='p-8 text-5xl'>Productos de la Categoría: {category}</h2>
      <PropGreeting greeting={`¡Productos de la categoría ${category} disponibles!`} />
      <div className='grid grid-cols-1 gap-4 py-10'>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;

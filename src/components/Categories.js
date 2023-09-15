import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../Firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const categoryImages = {
  electronics: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
  jewelry: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
  mensclothing: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
  womenclothing: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg'
};

function Categories() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const categoryCollection = collection(db, 'categories');
        const categorySnapshot = await getDocs(categoryCollection);

        const categories = [];
        categorySnapshot.forEach((doc) => {
          categories.push(doc.id);
        });

        setCategoryList(categories);
      } catch (error) {
        console.error('Error al obtener la lista de categorías:', error);
      }
    };

    fetchCategoryList();
  }, []);

  return (
    <div className="container m-auto max-w-screen-xl">
      <h2 className='p-8 text-5xl'>Categorías de Productos</h2>
      <div className="grid grid-cols-2 gap-4 py-10">
        {categoryList.map((category) => (
          <Link to={`/category/${category}`} key={category}>
            <div className='p-10 border rounded-sm w-full text-center'>
              <img
                src={categoryImages[category]}
                alt={category}
                className="w-48 h-48 mx-auto mb-2"
              />
              {category}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;

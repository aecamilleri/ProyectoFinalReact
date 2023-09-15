import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ItemDetails = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  return (
    <div className="flex justify-center flex-wrap content-between pt-0">
      <div className="w-full mx-auto">
        {item.category && (
          <p className="text-gray-700 text-center text-xs p-3">
            <NavLink to="/categories" className="underline text-blue-700">Categories:</NavLink>
            &nbsp;
            <NavLink className='underline text-blue-700' to={`/category/${item.category}`}>{item.category}</NavLink>
          </p>
        )}
      </div>
      <NavLink to={`/item/${item.id}`}>
        <div className="w-full mx-auto mt-2" style={{ aspectRatio: '1/1' }}>
          <img src={item.pictureUrl} alt={item.title} className="object-contain h-full w-full" />
        </div>
        <h3 className="text-sm font-bold text-center p-2" style={{ minHeight: '6rem' }}>
          {item.title}
        </h3>
      </NavLink>
      <div className="w-full mx-auto mt-2 bg-black rounded text-white">
        {item.price && (
          <p className="text-center text-base p-3">
            <span className="text-base">${item.price}</span>
          </p>
        )}
      </div>
      {showDetails && (
        <div>
          {item.details && (
            <p className="text-gray-700 text-center text-sm p-3">{item.details}</p>
          )}
          <p className="text-gray-700 text-center text-lg p-3">
            <NavLink to={`/item/${item.id}`}>
              <b>Más Detalles</b>
            </NavLink>
          </p>
        </div>
      )}
      <button
        className="uppercase font-semibold text-xs min-w-full px-3 py-2 m-2 tracking-widest"
        onClick={toggleDetails}
      >
        {showDetails ? 'Ocultar Detalles' : 'Mostrar Detalles'}
      </button>
    </div>
  );
};

export default ItemDetails;

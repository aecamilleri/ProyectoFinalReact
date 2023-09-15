import React, { useState, useEffect } from 'react';

const ItemCount = ({ initial, stock, onAdd }) => {
  const [count, setCount] = useState(initial || 0);

  useEffect(() => {
    setCount(initial || 0);
  }, [initial]);

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (count > 0) {
      onAdd(count); 
      setCount(0); 
    }
  };

  return (
    <div>
      <div className='flex justify-center flex-wrap content-between pt-3'>
        <button className='uppercase font-bold text-xl w-10 tracking-widest' onClick={handleDecrement}>-</button>
        <p className='text-sm font-bold mx-3 py-2'>{count}</p>
        <button className='uppercase font-bold text-xl w-10 tracking-widest' onClick={handleIncrement}>+</button>
        <button className='uppercase text-xs px-3 py-2 ml-2 tracking-widest bg-yellow-400 rounded m-auto w-full' onClick={handleAddToCart}>Agregar al carrito</button>
        <p id="stock" className='uppercase text-xs font-bold text-center p-4 w-full'>Stock: {stock}</p>
      </div>
    </div>
  );
};

export default ItemCount;

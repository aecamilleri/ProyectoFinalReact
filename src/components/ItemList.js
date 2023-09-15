import React from 'react';
import Item from './Item';

const ItemList = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <Item key={index} product={item} />
      ))}
    </div>
  );
};

export default ItemList;

import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const CartWidget = ({ itemCount }) => {
  return (
    <NavLink to="/cart"
      className="cart-widget"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30px',
        height: '30px',
        backgroundColor: '#f0f0f0',
        borderRadius: '50%',
        position: 'relative',
        right:'10px',
        color: 'black'
      }}
    >
      <FaShoppingCart className="cart-icon" style={{ fontSize: '18px' }} />
      <span
        className="item-count"
        style={{
          position: 'absolute',
          top: '-8px',
          right: '-12px',
          backgroundColor: '#ff5555',
          color: '#fff',
          borderRadius: '50%',
          padding: '2px 8px',
          fontSize: '12px',
        }}
      >
        {itemCount}
      </span>
    </NavLink>
  );
};

export default CartWidget;

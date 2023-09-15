import { NavLink } from "react-router-dom";
import CartWidget from './CartWidget';
import { useCart } from './CartContext'; 

function Navbar() {
  const { cart } = useCart(); 

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="flex gap-4 mx-4">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <div className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
          <nav className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <NavLink to="/category/electronics" className="nav-link block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
              Electronics
            </NavLink>
            <NavLink to="/category/womenclothing" className="nav-link block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
              Women
            </NavLink>
            <NavLink to="/category/mensclothing" className="nav-link block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
              Men
            </NavLink>
            <NavLink to="/category/jewelry" className="nav-link block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
              Jewelry
            </NavLink>
            <NavLink to="/categories" className="nav-link block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
              Categories
            </NavLink>
            <CartWidget itemCount={itemCount} />
          </nav>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Categories from './components/Categories'; 
import CategoryProducts from './components/CategoryProducts';
import { CartProvider } from './components/CartContext'; 
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
      <CartProvider> 
        <Header /> 
        <Main />
        <Routes>
          <Route path="/" exact element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:category" element={<CategoryProducts />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

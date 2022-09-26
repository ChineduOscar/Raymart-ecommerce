import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Product from './pages/Product';
import SingleCategory from './pages/SingleCategory';
import AllCategories from './pages/AllCategories';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';
import { calculateTotals } from './features/cart/cart';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='cart' element={<Cart />} />
          <Route path='product/:productID' element={<Product />} />
          <Route path='Singlecategory/:category' element={<SingleCategory />} />
          <Route path='allCategories' element={<AllCategories />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/products';
import categoryReducer from '../features/categories/categories';
import cartReducer from '../features/cart/cart';
import authReducer from '../features/auth/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
  },
});

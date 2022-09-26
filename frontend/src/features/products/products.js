import { createSlice } from '@reduxjs/toolkit';
import products from '../../data/products';

export const productSlice = createSlice({
  name: 'products',
  initialState: products,
  reducers: {},
});

export default productSlice.reducer;

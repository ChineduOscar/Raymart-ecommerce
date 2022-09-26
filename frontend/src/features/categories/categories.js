import { createSlice } from '@reduxjs/toolkit';
import categories from '../../data/categories';

export const categorySlice = createSlice({
  name: 'categories',
  initialState: categories,
  reducers: {},
});

export default categorySlice.reducer;

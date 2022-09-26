import { createSlice } from '@reduxjs/toolkit';
// const cartItems = [JSON.parse(localStorage.getItem('cartItems'))];
// const amount = JSON.parse(localStorage.getItem('amount'));
// const total = JSON.parse(localStorage.getItem('total'));

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].amount += 1;
      } else {
        const product = action.payload;
        state.cartItems.push(product);
      }
    },
    removeItem: (state, action) => {
      const itemsId = action.payload;
      state.cartItems = state.cartItems.filter(
        (items) => items._id !== itemsId
      );
    },
    increase: (state, action) => {
      const itemsId = action.payload;
      const cartItem = state.cartItems.find((items) => items._id === itemsId);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, action) => {
      const itemsId = action.payload;
      const cartItem = state.cartItems.find((items) => items._id === itemsId);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.price * item.amount;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { addToCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;

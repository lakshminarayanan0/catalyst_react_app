import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    cartCount: 0,
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.cartCount++;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter(item => item.productId !== productId);
      state.cartCount--;
    },
    updateCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    resetCart: (state) => {
      state.cart = [];
      state.cartCount = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateCartCount, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
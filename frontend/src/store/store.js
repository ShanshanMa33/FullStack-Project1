import { configureStore } from '@reduxjs/toolkit';
// import alertReducer from './slices/alertSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    // alert: alertReducer,
    cart: cartReducer,
    auth: authReducer,
  }
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cartItems', JSON.stringify(state.cart.items));
});
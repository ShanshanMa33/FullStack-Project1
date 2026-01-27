import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './slices/alertSlice';
// import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    // cart: cartReducer,
    // auth: authReducer
  }
});
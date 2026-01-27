// src/store/slices/alertSlice.js
import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: { 
    show: false, 
    message: '', 
    type: 'info' // 初始设为 info，不要设为 error
  },
  reducers: {
    showAlert: (state, action) => {
      state.show = true;
      state.message = action.payload.message;
      state.type = action.payload.type; // 确保这里接收 'success' 或 'error'
    },
    hideAlert: (state) => {
      state.show = false;
    }
  }
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
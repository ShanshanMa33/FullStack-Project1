import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogin, apiSignup, apiForgotPassword } from '../../api/auth';

export const signupThunk = createAsyncThunk(
    'auth/signup',
    async ({ email, password }, thunkAPI) => {
        try {
            return await apiSignup(email, password);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            return await apiLogin(email, password);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const forgotPasswordThunk = createAsyncThunk(
    'auth/forgotPassword',
    async ({ email }, thunkAPI) => {
        try {
            return await apiForgotPassword(email);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
); 

export const syncCartThunk = createAsyncThunk(
    'cart/sync',
    async (cartItems, { rejectWithValue }) => {
      try {
        const response = await apiUpdateCart(cartItems); 
        return response.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
import { createSlice } from '@reduxjs/toolkit';
import { signupThunk, loginThunk, forgotPasswordThunk } from './Thunks';

const storedToken = localStorage.getItem("token")

let storedUser = null;
try {
    const rawUser = localStorage.getItem("user");
    storedUser = rawUser ? JSON.parse(rawUser) : null;
} catch (e) {
    localStorage.removeItem("user");
    storedUser = null;
}

const initialState = {
    token: storedToken || null,
    user: storedUser,
    loading: false,
    error: null,
    successMessage: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.error = null;
            state.successMessage = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        clearAuthMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Signup Thunk
            .addCase(signupThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(signupThunk.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = 'Signup successful. Please log in.';
            })
            .addCase(signupThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Signup failed.';
            })

            // Login Thunk  
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.successMessage = 'Login successful.';
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed.';
            })

            // Forgot Password Thunk
            .addCase(forgotPasswordThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(forgotPasswordThunk.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = 'Password reset link sent to your email.';
            })
            .addCase(forgotPasswordThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Request failed.';
            });
    }
});

export const { logout, clearAuthMessages } = authSlice.actions;
export default authSlice.reducer;

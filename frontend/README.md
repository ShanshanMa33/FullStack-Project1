# Frontend

React application for the Product Management System.

This folder contains:
    UI Pages
    resuable components
    client-side validation
    API calls to backend

## Folder Structure
src/
  api/                # API request layer (no API calls in components)
    client.js
    authApi.js
  app/
    store.js          # Redux store
  features/
    auth/
      authSlice.js    # Redux slice
      authThunks.js   # Async logic (Redux Thunk)
  pages/
    Auth/
      SignIn.jsx
      SignUp.jsx
      ForgotPassword.jsx
      ForgotSuccess.jsx
  routes/
    ProtectedRoute.jsx
    AdminRoute.jsx
  components/
    Header.jsx        # shared component
    Footer.jsx        # shared component
  styles/
    auth.css

## Environment
VITE_API_BASE=http://localhost:4000

## Run
npm run dev
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import ProductPage from './pages/ProductPage/ProductPage';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import EditProduct from './pages/EditProduct/EditProduct';
import CartModal from './components/Cart/CartModal';
import AuthPage from './pages/Auth/AuthPage';
import ForgotSuccess from './pages/Auth/ForgotSuccess';
import './styles/auth.css';

function App() {
  const { user, token } = useSelector((state) => state.auth);
  const isLoggedIn = !!token;
  const isAdmin = isLoggedIn && user?.role === 'admin';

  return (
    <>
      <Header isAdmin={isAdmin}
        onOpenCart={() => setIsCartOpen(true)} />

      <div className="App">
        <Routes>

          <Route path="/" element={<ProductPage isAdmin={isAdmin} />} />
          <Route path="/products" element={<ProductPage isAdmin={isAdmin} />} />
          <Route
            path="/signin"
            element={isLoggedIn ? <Navigate to="/" /> : <AuthPage type="signin" />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" /> : <AuthPage type="signup" />}
          />
          <Route
            path="/forgot-password"
            element={isLoggedIn ? <Navigate to="/" /> : <AuthPage type="update-password" />}

          />
          <Route
            path="/forgot-password-success"
            element={isLoggedIn ? <Navigate to="/" /> : <ForgotSuccess />}
          />
          <Route
            path="/create-product"
            element={isAdmin ? <CreateProduct /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-product/:id"
            element={isAdmin ? <EditProduct /> : <Navigate to="/" />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
      <CartModal />
      <Footer />
    </>
  );
}

export default App;
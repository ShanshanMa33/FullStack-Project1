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
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import './styles/auth.css';

function App() {
  const { user, token } = useSelector((state) => state.auth);
  const isLoggedIn = !!token;
  const isAdmin = isLoggedIn && user?.role === 'admin';

  return (
    <Router>
      <Header isAdmin={isAdmin} 
          onOpenCart={() => setIsCartOpen(true)} />

      <div className="App">
        <Routes>
          
          <Route path="/" element={<ProductPage isAdmin={isAdmin} />} />
          <Route path="/products" element={<ProductPage isAdmin={isAdmin} />} />   
          <Route 
            path="/signin" 
            element={isLoggedIn ? <Navigate to="/" /> : <SignIn />} 
          />
          <Route 
            path="/signup" 
            element={isLoggedIn ? <Navigate to="/" /> : <SignUp />} 
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
    
    </Router>
  );
}

export default App;
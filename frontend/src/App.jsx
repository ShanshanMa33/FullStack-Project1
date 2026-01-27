import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import ProductPage from './pages/ProductPage/ProductPage';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import EditProduct from './pages/EditProduct/EditProduct';
import { CartProvider } from './context/CartContext';
import CartModal from './components/Cart/CartModal';
import Alert from './components/common/Alert/Alert';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <CartProvider>
    <Router>
      <Header isAdmin={isAdmin} 
          setIsAdmin={setIsAdmin} 
          onOpenCart={() => setIsCartOpen(true)} />

      <div className="App">
        <Routes>
          
          <Route path="/" element={<ProductPage isAdmin={isAdmin} />} />
          <Route path="/products" element={<ProductPage isAdmin={isAdmin} />} />    
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
      <CartModal 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      <Footer />
    
    </Router>
    </CartProvider>
  );
}

export default App;
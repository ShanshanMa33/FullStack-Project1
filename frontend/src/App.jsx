import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

//authentication pages
import LogIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import UpdatePassword from './pages/Auth/ForgotPassword';
import UpdatePasswordSent from './pages/Auth/ForgotSuccess';

// product pages
import CreateProduct from './pages/CreateProduct/CreateProduct';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Routes>
          {/*default route*/}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/*authentication routes*/}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<UpdatePassword />} />
          <Route path="/forgot-password-success" element={<UpdatePasswordSent />} />

          {/*product routes*/}
          <Route path="/create-product" element={<CreateProduct />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
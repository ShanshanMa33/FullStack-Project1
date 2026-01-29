import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux'; 
import { logout } from '../store/slices/authSlice';  
import { setCart } from '../store/slices/cartSlice';
import { clearCart } from '../store/slices/cartSlice';
import UserCertificate from '../assets/user-certification.svg';
import Button from './common/Button/Button';
import SearchBar from './SearchBar/SearchBar';
import Cart from './Cart/Cart';

const Header = ({ onOpenCart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const isLoggedIn = !!token;
  const isAdmin = user?.role === 'admin';

  const goToHome = () => navigate('/'); 
  

  const handleAuthAction = () => {
    if (isLoggedIn) {
      if (window.confirm("Are you sure you want to sign out?")) {
        const guestCart = JSON.parse(localStorage.getItem('guest_cart_snapshot')) || [];
        dispatch(setCart(guestCart));
        localStorage.removeItem('guest_cart_snapshot');
        dispatch(logout());
        navigate('/');
      }
    } else {
      navigate('/signin');
    }
  };

  return (
    <header className="main-header">
      {/* Part 1: Logo Section */}
      <div className="frame-3">
        <Button 
          variant="ghost" 
          size="raw" 
          onClick={goToHome}
          className="logo-btn"
        >
          <div className="logo-web">
            <span className="logo-management">Management</span>
            <span className="logo-chuwa">Chuwa</span>
          </div>
        </Button>

        {/* Part 2: Search Box Section */}
        <SearchBar />
      </div>

      {/* Part 3: User and Cart section */}
      <div className="frame-2">
        <Button variant="ghost" size="header" onClick={handleAuthAction}>
          <img src={UserCertificate} className="user-certificate" alt="user" />
          <span>{isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
        </Button>

        <Cart onOpenCart={onOpenCart}/>
      </div>
    </header>
  );
};

export default Header;
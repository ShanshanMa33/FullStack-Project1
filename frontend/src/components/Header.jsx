import React from 'react';
import './Header.css';
import searchIcon from '../assets/search.svg';
import cartIcon from '../assets/cart.svg';
import UserCertificate from '../assets/user-certification.svg';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';


const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)
  const isLoggedIn = !!user;

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login");
  };

  return (
    <header className="main-header">
      {/* Part 1: Logo Section */}
      <div className="frame-3">
        <div className="logo-web">
          <span className="logo-management">Management</span>
          <span className="logo-chuwa">Chuwa</span>
        </div>

        {/* Part 2: Search Box Section */}
        <div className="search-box">
          <span className="search-text">Search</span>
          <img src={searchIcon} className="search-icon" alt="search icon" />
        </div>
      </div>

      {/* Part 3: User and Cart section */}
      <div className="frame-2">
        {isLoggedIn ? (
          <button type="button" className='sign-out-box' onClick={handleLogout}>
            <img src={UserCertificate} className='user-certificate' alt="user" />
            <span className="sign-out-text">Sign Out</span>
          </button>
        ) : (
          <Link to="/login" className='sign-out-box'>
            <img src={UserCertificate} className='user-certification' alt='user' />
            <span className='sign-out-text'>Sign In</span>
          </Link>
        )}

        <div className="my-cart">
          <img src={cartIcon} className="cart-icon" alt='cart' />
          <span className="total-price">$0.00</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
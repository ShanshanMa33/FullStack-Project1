import React from 'react';
import './Header.css';
import searchIcon from '../assets/search.svg'; 
import cartIcon from '../assets/cart.svg';
import UserCertificate from '../assets/user-certification.svg';

const Header = () => {
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
        <div className="sign-out-box">
          <img src={UserCertificate} className="user-certificate" alt="user" />
          <span className="sign-out-text">Sign Out</span>
        </div>

        <div className="my-cart">
          <img src={cartIcon} className="cart-icon" alt='cart' />
          <span className="total-price">$0.00</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
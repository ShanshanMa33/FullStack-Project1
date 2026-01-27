import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import UserCertificate from '../assets/user-certification.svg';
import Button from './common/Button/Button';
import SearchBar from './SearchBar/SearchBar';
import Cart from './Cart/Cart';

const Header = ({ onOpenCart }) => {

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/'); 
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
        <Button variant="ghost" size="header">
          <img src={UserCertificate} className="user-certificate" alt="user" />
          <span>Sign Out</span>
        </Button>

        <Cart onOpenCart={onOpenCart}/>
      </div>
    </header>
  );
};

export default Header;
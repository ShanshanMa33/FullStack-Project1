import React from 'react';
import './Footer.css';
import youtubeIcon from '../assets/youtube.svg';
import twitterIcon from '../assets/twitter.svg';
import facebookIcon from '../assets/facebook.svg';

const Footer = () => {
  return (
    <footer className="page-footer">
      {/* 1. Left side copyright text */}
      <div className="footer-copyright">
        ©2022 All Rights Reserved.
      </div>

      {/* 2. Middle social icons group */}
      <div className="footer-social-group">
        <img src={youtubeIcon} className="social-icon youtube" alt="youtube" />
        <img src={twitterIcon} className="social-icon twitter" alt="twitter" />
        <img src={facebookIcon} className="social-icon facebook" alt="facebook" />
      </div>

      {/* 3. Right side links container */}
      <div className="footer-right-container">
        <a href="#contact" className="footer-link contact-link">Contact us</a>
        <a href="#privacy" className="footer-link privacy-link">Privacy Policies</a>
        <a href="#help" className="footer-link help-link">Help</a>
      </div>
    </footer>
  );
};

export default Footer;
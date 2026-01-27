import React from 'react';
import './Footer.css';
import Button from './common/Button/Button';
import youtubeIcon from '../assets/youtube.svg';
import twitterIcon from '../assets/twitter.svg';
import facebookIcon from '../assets/facebook.svg';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        {/* 1. Copyright Text */}
        <div className="footer-copyright">
          ©2022 All Rights Reserved.
        </div>

        {/* 2. Social Icons */}
        <div className="footer-social-group">
          <Button href="https://youtube.com" target="_blank" variant="ghost" size="raw">
            <img src={youtubeIcon} className="social-icon youtube" alt="youtube" />
          </Button>
          <Button href="https://twitter.com" target="_blank" variant="ghost" size="raw">
            <img src={twitterIcon} className="social-icon twitter" alt="twitter" />
          </Button>
          <Button href="https://facebook.com" target="_blank" variant="ghost" size="raw">
            <img src={facebookIcon} className="social-icon facebook" alt="facebook" />
          </Button>
        </div>

        {/* 3. Right Links*/}
        <div className="footer-right-container">
          <Button href="#contact" variant="ghost" size="raw" className="footer-link">Contact us</Button>
          <Button href="#privacy" variant="ghost" size="raw" className="footer-link">Privacy Policies</Button>
          <Button href="#help" variant="ghost" size="raw" className="footer-link">Help</Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
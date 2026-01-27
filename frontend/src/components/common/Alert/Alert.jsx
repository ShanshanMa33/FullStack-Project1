// components/common/Alert/Alert.jsx
import React, { useEffect } from 'react';
import './Alert.css';

const Alert = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`alert-toast alert-${type}`}>
      <div className="alert-icon-wrapper">
        {/* 这里是一个简单的成功勾选图标 */}
        {type === 'success' && (
          <svg className="success-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <span className="alert-text">{message}</span>
      <button className="alert-close" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Alert;
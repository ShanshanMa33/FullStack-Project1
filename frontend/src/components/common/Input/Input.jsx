import React from 'react';
import './Input.css';

/**
 * Common Input Component
 * @param {string} label - The text shown above the input
 * @param {string} error - Error message to display
 * @param {string} className - Additional CSS classes
 */
const Input = ({ label, error, className = '', ...props }) => {
    return (
      <div className={`input-container ${className}`}>

        {label && <label className="input-label">{label}</label>}
        
        <input 
          className={`custom-input ${error ? 'input-error' : ''}`} 
          {...props} 
        />

        {error && <span className="error-message">{error}</span>}
      </div>
    );
  };
  
  export default Input;
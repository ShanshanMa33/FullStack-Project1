import React from 'react';
import './Input.css';

/**
 * Reusable Input component designed to standardize form fields across the application.
 * This supports the "enough validations" requirement for both Phase I (Auth) 
 * and Phase II (Product Management).
 */
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
import React from 'react';
import './InputWithButton.css';
import Button from '../Button/Button';

/**
 * A composite input component that attaches a button directly to the input field.
 * Primarily used for the Image URL 'Upload/Preview' flow and the Discount Code 'Apply' section.
 */
const InputWithButton = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  btnText, 
  onBtnClick, 
  className = "",
  ...rest
}) => {
  return (
    <div className={`input-with-btn-container ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <div className="inner-wrapper">
     
        <input 
          className="custom-input with-btn" 
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...rest} 
        />
        
        <Button 
          variant="primary" 
          size="raw" 
          className="inner-upload-btn"
          onClick={onBtnClick}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
};

export default InputWithButton;
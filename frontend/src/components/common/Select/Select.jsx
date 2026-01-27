import React from 'react';
import './Select.css';
import triangleIcon from '../../../assets/icons/Triangle.svg';

const Select = ({ label, options = [], className = '', ...props }) => {
  return (
    <div className={`select-container ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <div className="select-wrapper">
        <select className="custom-select" {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <img src={triangleIcon} className="select-arrow-icon" alt="arrow" />
      </div>
    </div>
  );
};

export default Select;
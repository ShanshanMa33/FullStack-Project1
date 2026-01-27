import React, { useState, useRef, useEffect } from 'react';
import triangleUp from '../../../assets/icons/Triangle-up.svg';
import triangleDown from '../../../assets/icons/Triangle.svg';
import checkIcon from '../../../assets/icons/check.svg';
import './SortSelect.css';

const SortSelect = ({ onSortChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = ['Last added', 'Price: low to high', 'Price: high to low'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sort-select-container" ref={dropdownRef}>
      
      <div 
        className={`sort-select-selected ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <img src={isOpen ? triangleUp : triangleDown} alt="arrow" className="arrow-svg" />
      </div>

    
      {isOpen && (
        <ul className="sort-select-options">
          {options.map((option) => (
            <li 
              key={option} 
              className={`sort-option-item ${value === option ? 'selected' : ''}`}
              onClick={() => {
                onSortChange(option); 
                setIsOpen(false);
              }}
            >
              {value === option && (
                <img src={checkIcon} alt="check" className="check-svg" />
              )}
              <span className="option-text">{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortSelect;
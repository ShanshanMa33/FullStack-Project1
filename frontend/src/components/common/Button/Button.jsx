
import React, { useRef, useEffect } from 'react';
import plusIcon from '../../../assets/plus.svg'; 
import minusIcon from '../../../assets/minus.svg';
import plusIconGray from '../../../assets/plus-gray.svg'; 
import minusIconGray from '../../../assets/minus-gray.svg';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isStepper = false,
  stepperTheme = 'default',
  count = 0, 
  onIncrease, 
  onDecrease,
  ...props
}) => {
  const buttonClass = `custom-btn ${variant} ${size} ${className}`;

  const currentIcons = {
    plus: stepperTheme === 'gray' ? plusIconGray : plusIcon,
    minus: stepperTheme === 'gray' ? minusIconGray : minusIcon
  };

 if (isStepper && count > 0) {
    return (
      <div className={`stepper-container ${variant} ${size} ${className} ${stepperTheme === 'gray' ? 'theme-gray' : ''}`}>
        <button type="button" className="stepper-btn" onClick={onDecrease}>
          <img src={currentIcons.minus} alt="minus" className="stepper-icon" />
        </button>
        
        <span className="stepper-val">{count}</span>
        
        <button type="button" className="stepper-btn" onClick={onIncrease}>
          <img src={currentIcons.plus} alt="plus" className="stepper-icon" />
        </button>
      </div>
    );
  }

  const Tag = props.href ? 'a' : 'button';

  return (
    <Tag className={buttonClass} {...props}>
      {children}
    </Tag>
  );
};

export default Button;
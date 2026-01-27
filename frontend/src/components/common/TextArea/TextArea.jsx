import React from 'react';
import './TextArea.css';
import lineLong from '../../../assets/line-long.svg';
import lineShort from '../../../assets/line-short.svg';

const TextArea = ({ label, className = '', ...props }) => {
  return (
    <div className={`textarea-container ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <div className="textarea-wrapper">
        <textarea className="custom-textarea" {...props}></textarea>
        <div className="corner-decoration">
          <img src={lineLong} className="svg-line-long" alt="" />
          <img src={lineShort} className="svg-line-short" alt="" />
        </div>
      </div>
    </div>
  );
};

export default TextArea;
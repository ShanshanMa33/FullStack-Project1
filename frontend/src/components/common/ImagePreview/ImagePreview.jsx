import React from 'react';
import './ImagePreview.css';
import imagePlaceholder from '../../../assets/image-icon.svg';

/**
 * ImagePreview provides a real-time visual feedback for product images.
 * Essential for the Create/Edit flow to ensure the user has a professional 
 * preview before submitting the form.
 */
const ImagePreview = ({ imageUrl, className = '' }) => {

  const hasImage = imageUrl && imageUrl !== "http://" && imageUrl.trim() !== "";

  return (
    <div className={`image-preview-area ${className}`}>
      <div className="preview-box">
        {hasImage ? (
          <img 
            src={imageUrl} 
            className="uploaded-preview-img" 
            alt="Product Preview" 
            onError={(e) => { e.target.src = imagePlaceholder; }}
          />
        ) : (
          <>
            <img src={imagePlaceholder} className="preview-icon" alt="placeholder" />
            <span className="preview-text">image preview!</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
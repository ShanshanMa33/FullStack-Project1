import React from 'react';
import './CreateProduct.css';

import lineLong from '../../assets/line-long.svg';
import lineShort from '../../assets/line-short.svg';
import triangleIcon from '../../assets/Triangle.svg';
import imagePlaceholder from '../../assets/image-icon.svg';
import dashedBorder from '../../assets/dash-line.svg';

const CreateProduct = () => {
  return (
    <div className="create-product-page">

      {/* Your provided Main Content */}
      <main className="form-container-area">
        <div className="form-main-layout">
          <div className="create-product-title">Create Product</div>
          
          <div className="content-wrapper">
            <div className="form-card">
              {/* Product name input */}
              <div className="product-name-group">
                <label className="input-label">Product name</label>
                <input type="text" className="product-name-input" placeholder="iWatch" />
              </div>

              {/* Product Description input */}
              <div className='product-description-group'>
                <label className='input-label'>Product Description</label>
                <div className="textarea-wrapper">
                  <textarea className="product-textarea"></textarea>
                  <div className="corner">
                    <img src={lineLong} className="svg-line-long" alt="long line" />
                    <img src={lineShort} className="svg-line-short" alt="short line" />
                  </div>
                </div>
              </div>

              <div className="input-row">
                {/* Category Group */}
                <div className='category-group'>
                  <label className='input-label'>Category</label>
                  <div className="select-wrapper">
                    <select className="product-select">
                      <option value="">Category1</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                    </select>
                    <img src={triangleIcon} className="select-arrow-icon" alt="arrow" />
                  </div>
                </div>

                {/* Price Group */}
                <div className='price-group'>
                  <label className='input-label'>Price</label>
                  <input className="product-input" type="number" placeholder="Please enter price here" />
                </div>
              </div>

              {/* Quantity & Image Link */}
              <div className="input-row second-row">
                {/* In Stock Quantity Group */}
                <div className='quantity-group'>
                  <label className='input-label'>In Stock Quantity</label>
                  <input type="number" className="product-input" placeholder="eg: 100" />
                </div>

                {/* Add Image Link Group */}
                <div className='image-group'>
                  <label className='input-label'>Add Image Link</label>
                  <div className="input-with-button">
                    <input type="text" className="product-input" placeholder="http://" />
                    <button className="upload-button">Upload</button>
                  </div>
                </div>
              </div>

              {/* Image Preview group */}
              <div className="image-preview-container">
                <div className="image-preview-box" style={{ backgroundImage: `url(${dashedBorder})` }}>
                    {/* <img src={previewIcon} className="preview-icon" alt="preview" /> */}
                  <img src={imagePlaceholder} className="preview-icon" alt="placeholder" />
                  <span className="preview-text">image preview!</span>
                </div>
              </div>

              {/* Add Product Button */}
              <div className="form-submit-row">
                <button type="submit" className="add-product-btn">
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default CreateProduct;
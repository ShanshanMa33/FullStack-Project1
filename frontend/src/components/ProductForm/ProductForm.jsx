import React, { useState, useEffect, useRef } from 'react';
import './ProductForm.css';
import Input from '../common/Input/Input';
import TextArea from '../common/TextArea/TextArea';
import Select from '../common/Select/Select';
import InputWithButton from '../common/InputWithButton/InputWithButton';
import ImagePreview from '../common/ImagePreview/ImagePreview';
import Button from '../common/Button/Button';
import { apiUploadImage } from '../../api/products';

const categoryOptions = [
  { label: 'Mobile', value: 'Mobile' },
  { label: 'Laptop', value: 'Laptop' },
  { label: 'Watch', value: 'Watch' },
  { label: 'Accessories', value: 'Accessories' }
];

const ProductForm = ({ mode = 'create', initialData = {}, onSubmit, onDelete }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const isEdit = mode === 'edit';

  // 1. Centralized Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Mobile', // Default category
    price: '',
    quantity: '', 
    image: ''
  });

  // 2. Load initial data if in Edit mode
  useEffect(() => {
    // Only update if we are in edit mode and initialData is not empty
    if (isEdit && initialData && Object.keys(initialData).length > 0) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category || 'Mobile',
        price: initialData.price || '',
        quantity: initialData.quantity || '', // Match this with your backend key!
        image: initialData.image || ''
      });
    }
  }, [isEdit, initialData]);

  // 3. Generic Change Handler

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const uploadData = new FormData();
    uploadData.append('image', file);
  
    setIsUploading(true);
    try {
      const data = await apiUploadImage(uploadData);
  
      if (data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="form-card">
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
        accept="image/*"
      />
      {/* Product Name */}
      <Input 
        label="Product name" 
        placeholder="e.g. iWatch" 
        className="product-name-group"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      
      {/* Description */}
      <TextArea 
        label="Product Description" 
        placeholder="Enter description here..." 
        className="product-description-group"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />

      {/* Row 1: Category & Price */}
      <div className="input-row">
        <Select 
          label="Category" 
          options={categoryOptions} 
          className="category-group"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
        />
        <Input 
          label="Price" 
          type="number" 
          placeholder="0.00" 
          className="price-group"
          value={formData.price}
          onChange={(e) => handleChange('price', e.target.value)}
        />
      </div>


      {/* Row 2: Quantity & Image Link */}
      <div className="input-row second-row">
        <Input 
          label="In Stock Quantity" 
          type="number" 
          placeholder="100" 
          className="quantity-group"
          value={formData.quantity}
          onChange={(e) => handleChange('quantity', e.target.value)}
        />
        <InputWithButton 
          label="Add Image Link" 
          placeholder={isUploading ? "Uploading..." : "http://"} 
          className="image-group"
          value={formData.image}
          onChange={(e) => handleChange('image', e.target.value)}
          onBtnClick={triggerFileSelect} 
          btnText={isUploading ? "Wait..." : (isEdit ? "Update" : "Upload")}
        />
      </div>

      {/* Preview Area */}
      <ImagePreview imageUrl={formData.image} className="image-preview-container" />

      {/* Form Action */}
      <div className="form-submit-row">
        <Button 
          variant="primary" 
          className="add-product-btn" 
          onClick={() => onSubmit && onSubmit(formData)}
        >
          {isEdit ? 'Update Product' : 'Add Product'}
        </Button>
        {mode === 'edit' && (
          <Button 
            variant="danger" 
            className="delete-product-btn"
            onClick={onDelete}
          >
            Delete Product
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductForm;
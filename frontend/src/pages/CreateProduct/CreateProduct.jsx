import React from 'react';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useNavigate } from 'react-router-dom';
import { apiCreateProduct } from '../../api/products';

/**
 * CreateProduct Page Component.
 * Simplified version using browser native alerts to ensure stable workflow.
 */
const CreateProduct = () => {
  const navigate = useNavigate(); 

  /**
   * handleCreateSubmit: Processes the form data and communicates with the backend.
   */
  const handleCreateSubmit = async (formData) => {
    try {
      const result = await apiCreateProduct(formData);

      if (result.success) {
        window.alert('Product created successfully!');
        navigate(-1); 
      } else {
        window.alert(result.message || 'Failed to create product');
      }
    } catch (err) {
      console.error("Submission failed:", err.message);
      window.alert(err.message || 'Network error: Check your connection.');
    }
  };
  

  return (
    <div className="form-page-container">
      <div className="form-main-layout">
        <h1 className="page-title">Create Product</h1>
        <ProductForm mode="create" onSubmit={handleCreateSubmit} />
      </div>
    </div>
  );
};

export default CreateProduct;
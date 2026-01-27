import React from 'react';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity)
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        window.alert('Product created successfully!');
        navigate('/'); 
      } else {
        window.alert(result.message || 'Failed to create product');
      }
    } catch (err) {
      console.error("Submission failed:", err);
      window.alert('Network error: Please check if your backend server is running on port 8000.');
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
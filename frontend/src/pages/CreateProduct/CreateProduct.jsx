import React from 'react';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {

  const navigate = useNavigate(); 
  const showAlert = useAlert();

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

      if (result.success) {
        showAlert('Product created successfully!', 'success');
        
        navigate('/products'); 
      } else {
        showAlert(result.message || 'Failed to create product', 'error');
      }
    } catch (err) {
      console.error("Submission failed:", err);
      showAlert('Network error, please check your server.', 'error');
    }
  };

  return (
    <div className="form-page-container">
      <div className="form-main-layout">
        {/* Uses the global .page-title from App.css */}
        <h1 className="page-title">Create Product</h1>
        
        {/* The reusable form shell */}
        <ProductForm mode="create" onSubmit={handleCreateSubmit} />
      </div>
    </div>
  );
};

export default CreateProduct;
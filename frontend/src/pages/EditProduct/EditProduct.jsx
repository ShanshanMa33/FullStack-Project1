import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../../components/ProductForm/ProductForm';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProductData(data))
      .catch(err => console.error("Fetch Error:", err));
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`Failed to update: ${errorData.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Update request error:", err);
      alert("An error occurred. Check if the backend is running.");
    }
  };

  if (!productData) {
    return <div>Loading data from server...</div>;
  }

  return (
    <div className="form-page-container">
      <div className="form-main-layout">
      <h1 className='page-title'>Now Editing: {productData.name}</h1>
      
      <ProductForm 
        mode="edit" 
        initialData={productData} 
        onSubmit={handleUpdate} 
      />
      </div>
    </div>
  );
};

export default EditProduct;
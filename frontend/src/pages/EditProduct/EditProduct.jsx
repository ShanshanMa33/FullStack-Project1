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
      .then(data => setProductData(data.data || data))
      .catch(err => console.error("Fetch Error:", err));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.alert('Product deleted successfully!');
        navigate(-1);
      } else {
        const error = await response.json();
        window.alert('Delete failed: ' + error.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
      window.alert('Network error, please try again.');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity)
        }),
      });

      const result = await response.json();

      if (response.ok) {
        window.alert("Product updated successfully!");
        navigate(-1);
      } else {
        window.alert(`Failed: ${result.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      window.alert("Network error, please check backend.");
    }
  };

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="form-page-container">
      <div className="form-main-layout">
        <h1 className='page-title'>Editing: {productData.name}</h1>
        <ProductForm mode="edit" initialData={productData} onSubmit={handleUpdate} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default EditProduct;
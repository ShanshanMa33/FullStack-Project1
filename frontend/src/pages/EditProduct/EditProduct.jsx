import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../../components/ProductForm/ProductForm';
import './EditProduct.css';
import { apiGetProductById, apiUpdateProduct, apiDeleteProduct } from '../../api/products';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
        try {
            const data = await apiGetProductById(id);
            setProductData(data.data || data);
        } catch (err) {
            console.error("Fetch Error:", err.message);
        }
    };
    loadProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;

    try {
      await apiDeleteProduct(id);
      window.alert('Product deleted successfully!');
      navigate('/');
    } catch (err) {
      window.alert('Delete failed: ' + err.message);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const result = await apiUpdateProduct(id, formData);

      if (result) {
        window.alert("Product updated successfully!");
        navigate(-1);
      }
    } catch (err) {
      window.alert(`Failed: ${err.message}`);
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
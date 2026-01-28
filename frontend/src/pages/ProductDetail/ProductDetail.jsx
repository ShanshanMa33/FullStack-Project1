import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import Button from '../../components/common/Button/Button';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data.data || data);
      } catch (err) {
        console.error("Fetch detail error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (loading) return <div className="loading-state">Loading...</div>;
  if (!product) return <div className="error-state">Product not found!</div>;

  return (
    <div className="product-detail-container">
      <div className="detail-page-header">
        <span className="back-link" onClick={() => navigate(-1)}>Products</span> 
        &nbsp;/ Details
      </div>

      <div className="detail-content-card">
        <div className="product-image-large-container">
          <img 
            src={product.image}
            alt={product.name} 
            className="product-image-large" 
          />
        </div>

        <div className="product-info-details">
          <p className="product-category">{product.category}</p>
          <h2 className="product-title">{product.name}</h2>

          <div className="product-price-row">
            <span className="product-price-detail">${product.price}</span>
            <span className={`stock-tag ${product.quantity > 0 ? 'in' : 'out'}`}>
              {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p className="product-description">
            {product.description || "This product has no detailed description yet."}
          </p>

          <div className="product-actions">
          <Button 
              variant="primary"
              className='add-to-cart-btn'
              onClick={handleAddToCart}
              disabled={product.quantity <= 0}
            >
              Add To Cart
            </Button>
            <Button 
              variant="secondary"
              className="edit-product-btn"
              onClick={() => navigate(`/edit-product/${product._id}`)}
              style={{ marginLeft: '12px' }}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
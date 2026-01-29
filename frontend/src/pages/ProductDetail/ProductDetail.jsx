import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetProductById } from '../../api/products';
import { addToCart, updateQuantity } from '../../store/slices/cartSlice';
import Button from '../../components/common/Button/Button';

const ProductDetail = () => {
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.auth);
  const isAdmin = !!token && user?.role === 'admin';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const cartItem = useSelector(state => 
    state.cart.items.find(item => item._id === id) 
  );
  
    const count = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await apiGetProductById(id);
        setProduct(data.data || data);
      } catch (err) {
        console.error("Fetch detail error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
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
          size="md"             
          className="add-to-cart-btn"
          disabled={product.quantity <= 0}
          isStepper={count > 0}      
          count={count}         
          onIncrease={(e) => { 
            e.stopPropagation(); 
            dispatch(addToCart(product));
          }}
          onDecrease={(e) => { 
            e.stopPropagation(); 
            dispatch(updateQuantity({ id: product._id, amount: -1 }));
          }}
          onClick={(e) => { 
            e.stopPropagation(); 
            if(count === 0) dispatch(addToCart(product));
          }}
        >
          Add to Cart
        </Button>
            {isAdmin && (
              <Button 
                variant="secondary"
                className="edit-product-btn"
                onClick={() => navigate(`/edit-product/${product._id}`)}
                style={{ marginLeft: '12px' }}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
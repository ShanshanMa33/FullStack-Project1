import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button/Button';
import './ProductCard.css';

const ProductCard = ({ product, isAdmin }) => {
  const navigate = useNavigate();
  
  const { getItemQuantity, updateQuantity } = useCart();
  
  const count = getItemQuantity(product._id);

  if (!product) return null;

  const goToDetail = () => {
    navigate(`/product/${product._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); 
    navigate(`/edit-product/${product._id}`);
  };

  return (
    <div className="product-card">

      <div className="card-clickable-area" onClick={goToDetail}>
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image" 
          />
        </div>

        <div className="product-info-box">
          <div className="product-name">{product.name}</div>
          <div className="product-price">${Number(product.price).toFixed(2)}</div>
        </div>
      </div>

      <div className="card-button-group">
        <Button 
          variant="primary" 
          size="xs"             
          className="card-add-btn"
          isStepper={count > 0}      
          count={count}         
          onIncrease={(e) => { 
            e.stopPropagation(); 
            updateQuantity(product, 1);
          }}
          onDecrease={(e) => { 
            e.stopPropagation(); 
            updateQuantity(product, -1);
          }}
          onClick={(e) => { 
            e.stopPropagation(); 
            if(count === 0) updateQuantity(product, 1);
          }} 
        >
          {count === 0 ? "Add to Cart" : ""}
        </Button>

        {isAdmin && (
          <Button 
            variant="secondary" 
            size="xs" 
            className="card-edit-btn"
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateQuantity } from '../../store/slices/cartSlice';
import Button from '../../components/common/Button/Button';
import './ProductCard.css';

const ProductCard = ({ product, isAdmin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartItem = useSelector(state => 
    state.cart.items.find(item => item._id === product._id)
  );

  const count = cartItem ? cartItem.quantity : 0;

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
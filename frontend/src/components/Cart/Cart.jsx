import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartModal } from '../../store/slices/cartSlice';
import './Cart.css';
import Button from '../common/Button/Button'; 
import cartIcon from '../../assets/cart.svg';

/**
 * Cart trigger component for the global header.
 * Displays real-time quantity and subtotal from the CartContext.
 */
const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleOpenCartModal = () => {
    dispatch(toggleCartModal());
  };

  return (
    <Button variant="ghost" size="header" className="cart-header-btn" onClick={handleOpenCartModal}>
      <div className="cart-icon-wrapper">
        <img src={cartIcon} className="cart-icon" alt='cart' />
        
        {totalQuantity > 0 && (
          <span className="cart-badge">
            {totalQuantity}
          </span>
        )}
      </div>

      <span className="total-price">
        ${subtotal.toFixed(2)}
      </span>
    </Button>
  );
};

export default Cart;
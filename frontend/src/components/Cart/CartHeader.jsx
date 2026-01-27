import React from 'react';
import './CartHeader.css';

/**
 * CartHeader handles the top section of the cart drawer.
 * Displays the current item count to maintain consistency across the app.
 */
const CartHeader = ({ totalQuantity, onClose }) => {
  return (
    <div className="cart-modal-header">

      <div className="cart-title-container">
        <h2 className="cart-title-text">Cart</h2>
        <span className="cart-quantity-text">({totalQuantity})</span>
      </div>
      
      <button className="close-x" onClick={onClose} aria-label="Close Cart">
        ✕
      </button>
    </div>
  );
};

export default CartHeader;
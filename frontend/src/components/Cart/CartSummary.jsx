import React from 'react';
import './CartSummary.css';
import Button from '../common/Button/Button';

/**
 * CartSummary handles the final price calculations including tax and discounts.
 * This component addresses the Phase III requirement for cart price calculation 
 * and promotion code implementation.
 */
const CartSummary = ({ subtotal, cartItems }) => {

  const tax = subtotal * 0.1;
  const discount = cartItems.length > 0 ? 20.00 : 0;
  const estimatedTotal = subtotal + tax - discount;

  return (
    <div className="cart-modal-footer">
  
      <div className="promo-section">
        <label className="promo-label">Apply Discount Code</label>
        <div className="promo-row">
          <input 
            type="text" 
            className="promo-input-field" 
            placeholder="Enter Code" 
          />
          <Button variant="primary" size="promo">
            Apply
          </Button>
        </div>
      </div>

      <div className="checkout-box">
        <div className="summary-line">
          <span>Subtotal</span>
          <span className="amount">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="summary-line">
          <span>Tax</span>
          <span className="amount">${tax.toFixed(2)}</span>
        </div>
        
        <div className="summary-line">
          <span>Discount</span>
          <span className="amount">-${discount.toFixed(2)}</span>
        </div>

        <div className="summary-line total-bold">
          <span>Estimated total</span>
          <span className="amount">${estimatedTotal.toFixed(2)}</span>
        </div>
        
        <div className="checkout-btn-container">
          <Button variant="primary" size="checkout">
            Continue to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
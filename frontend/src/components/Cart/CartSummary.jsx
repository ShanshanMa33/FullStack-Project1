import React, { useState, useEffect } from 'react'; // 🌟 引入 useEffect
import { useSelector, useDispatch } from 'react-redux';
import { setPromo, clearPromo } from '../../store/slices/cartSlice';
import './CartSummary.css';
import Button from '../common/Button/Button';

/**
 * CartSummary handles the final price calculations including tax and discounts.
 * This component addresses the Phase III requirement for cart price calculation 
 * and promotion code implementation.
 */
const CartSummary = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [promoCode, setPromoCode] = useState(''); 
  const appliedPromo = useSelector((state) => state.cart.appliedPromo);
  const [error, setError] = useState('');

  useEffect(() => {
    if (appliedPromo) {
      setPromoCode(appliedPromo.code);
    }
  }, [appliedPromo]);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
 
  let discount = 0;
  let discountDetail = '';

  if (appliedPromo && cartItems.length > 0) {
    const val = Number(appliedPromo.discountValue || 0);
    const type = appliedPromo.discountType;
    if (type === 'amount') {
      discount = val;
      discountDetail = `(-$${val.toFixed(2)})`;
    } else if (type === 'percentage') {
      discount = subtotal * (val / 100);
      discountDetail = `(${val}% OFF)`;
    }
  }

  const estimatedTotal = Math.max(0, subtotal + tax - discount);

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode })
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setPromo(data.data || data));
      } else {
        alert(`Error: ${data.message || 'Invalid code'}`);
        setError(data.message || 'Invalid code');
        dispatch(clearPromo());
      }
    } catch (err) {
      setError('Server error, please try again later');
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setError('');
    dispatch(clearPromo());
  };

  return (
    <div className="cart-modal-footer">

      <div className="promo-container">
      <div className="promo-section">
        <label className="promo-label">Apply Discount Code</label>
        <div className="promo-row">
          <input 
            type="text" 
            className="promo-input-field" 
            placeholder="Enter Code" 
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={!!appliedPromo}
          />
          {!appliedPromo ? (
              <Button variant="primary" size="promo" onClick={handleApplyPromo}>
                Apply
              </Button>
            ) : (
              <Button variant="secondary" size="promo" onClick={handleRemovePromo}>
                Remove
              </Button>
            )}
        </div>
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
          <span>
            Discount <span style={{ fontSize: '0.8em', color: '#666' }}>{appliedPromo ? `${discountDetail}` : ''}</span>
          </span>
          <span className="amount">
            {discount > 0 ? `-$${discount.toFixed(2)}` : '$0.00'}
          </span>
        </div>
        

        <div className="summary-line">
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
import React from 'react';
import { useCart } from '../../context/CartContext';
import './Cart.css';
import Button from '../common/Button/Button'; 
import cartIcon from '../../assets/cart.svg';

const Cart = ({ onOpenCart }) => {
  // 🌟 从全局获取实时数据
  const { totalQuantity, subtotal } = useCart();

  return (
    <Button variant="ghost" size="header" className="cart-header-btn" onClick={onOpenCart}>
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
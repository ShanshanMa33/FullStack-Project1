import React from 'react';
import { useCart } from '../../context/CartContext';
import CartHeader from './CartHeader';           
import CartItem from './CartItem';                 
import CartSummary from './CartSummary';          
import './CartModal.css';                          

/**
 * CartModal serves as the main container for the shopping cart interface.
 * It coordinates data from CartContext to provide a unified view of the user's selection.
 */
const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, totalQuantity, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <CartHeader totalQuantity={totalQuantity} onClose={onClose} />
        
        <div className="cart-modal-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-msg">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item.id} item={item} updateQuantity={updateQuantity} />
            ))
          )}
        </div>

        <CartSummary subtotal={subtotal} cartItems={cartItems} />
      </div>
    </div>
  );
};

export default CartModal;
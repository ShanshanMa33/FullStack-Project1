import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCartModalOpen, updateQuantity } from '../../store/slices/cartSlice';
import CartHeader from './CartHeader';           
import CartItem from './CartItem';                 
import CartSummary from './CartSummary';          
import './CartModal.css';                          

/**
 * CartModal serves as the main container for the shopping cart interface.
 * It coordinates data from CartContext to provide a unified view of the user's selection.
 */
const CartModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.cart.isCartModalOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const handleClose = () => dispatch(setCartModalOpen(false));

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={handleClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <CartHeader totalQuantity={totalQuantity} onClose={handleClose} />
        
        <div className="cart-modal-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-msg">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item._id} item={item} onUpdate={(id, amount) => dispatch(updateQuantity({ id, amount }))} />
            ))
          )}
        </div>

        <CartSummary subtotal={subtotal} cartItems={cartItems} />
      </div>
    </div>
  );
};

export default CartModal;
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import './CartItem.css';
import Button from '../common/Button/Button'

/**
 * Individual item component within the Cart drawer.
 * Handles item display and quantity modification as per Phase III requirements.
 */
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

    return (
      <div className="cart-item-container"> 
        <div className="cart-item-img-wrapper">
        <img className="cart-item-img" src={item.image} alt={item.name} />
        </div>

        <div className="cart-item-info">
          <div className="cart-item-top">
            <h4 className="cart-item-name">{item.name}</h4>
            <span className="cart-item-price">${Number(item.price).toFixed(2)}</span>
          </div>
  

          <div className="cart-item-bottom">
               <Button 
                  isStepper={true} 
                  stepperTheme="gray"
                  count={item.quantity} 
                  onIncrease={() => dispatch(addToCart(item))}
                  onDecrease={() => dispatch(updateQuantity({ id: item._id, amount: -1 }))}
                  className="cart-item-stepper"
                />
            <button 
              className="cart-item-remove" 
              onClick={() => dispatch(removeFromCart(item._id))}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default CartItem;
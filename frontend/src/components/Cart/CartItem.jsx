import React from 'react';
import './CartItem.css';
import Button from '../common/Button/Button'

const CartItem = ({ item, updateQuantity }) => {
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
                  onIncrease={() => updateQuantity(item, 1)}
                  onDecrease={() => updateQuantity(item, -1)}
                  className="cart-item-stepper"
                />
            <button 
              className="cart-item-remove" 
              onClick={() => updateQuantity(item, -item.quantity)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default CartItem;
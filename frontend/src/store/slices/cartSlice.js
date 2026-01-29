import { createSlice } from '@reduxjs/toolkit';

const savedCart = localStorage.getItem('cartItems');
const savedPromo = localStorage.getItem('appliedPromo');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: savedCart ? JSON.parse(savedCart) : [], // Initialize: empty cart
    appliedPromo: savedPromo ? JSON.parse(savedPromo) : null,
    isCartModalOpen: false,
  },
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item._id === product._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    // remove from cart
    removeFromCart: (state, action) => {
        const id = action.payload;
        state.items = state.items.filter(item => item._id !== id);
      },
  
    // update cart
    updateQuantity: (state, action) => {
        const { id, amount } = action.payload;
        const item = state.items.find(item => item._id === id);
        if (item) {
          item.quantity += amount;
          if (item.quantity <= 0) {
            state.items = state.items.filter(i => i._id !== id);
          }
        }
      },

      setCart: (state, action) => {
        state.items = action.payload;
      },
    
      setPromo: (state, action) => {
        state.appliedPromo = action.payload;
        localStorage.setItem('appliedPromo', JSON.stringify(action.payload));
    },

      clearPromo: (state) => {
        state.appliedPromo = null;
        localStorage.removeItem('appliedPromo');
    },

      clearCart: (state) => {
        state.items = [];
        state.appliedPromo = null;
        localStorage.removeItem('cartItems');
        localStorage.removeItem('appliedPromo');
    },

      toggleCartModal: (state) => {
        state.isCartModalOpen = !state.isCartModalOpen;
    },

      setCartModalOpen: (state, action) => {
        state.isCartModalOpen = action.payload;
      }
    
  },
});

export const { addToCart, removeFromCart, updateQuantity, setCart, clearCart, toggleCartModal, 
    setCartModalOpen, setPromo, clearPromo } = cartSlice.actions;
export default cartSlice.reducer;
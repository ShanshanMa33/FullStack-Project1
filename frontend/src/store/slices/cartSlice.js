import { createSlice } from '@reduxjs/toolkit';
import { logout } from './authSlice';

const saveToLocalStorage = (items) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};
const savePromoToLocalStorage = (promo) => {
  if (promo) {
    localStorage.setItem('appliedPromo', JSON.stringify(promo));
  } else {
    localStorage.removeItem('appliedPromo');
  }
};

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
      const existingItem = state.items.find(item => (item._id === product._id) || (item.productId === product._id));
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, 
          productId: product._id,
          quantity: 1 });
      }
      saveToLocalStorage(state.items);
    },
    // remove from cart
    removeFromCart: (state, action) => {
        const id = action.payload;
        state.items = state.items.filter(item => item._id !== id);
        saveToLocalStorage(state.items);
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
        saveToLocalStorage(state.items);
      },

      setCart: (state, action) => {
        state.items = action.payload;
        saveToLocalStorage(state.items);
      },
    
      setPromo: (state, action) => {
        state.appliedPromo = action.payload;
        savePromoToLocalStorage(state.appliedPromo);
    },

      clearPromo: (state) => {
        state.appliedPromo = null;
        savePromoToLocalStorage(null);
    },

      clearCart: (state) => {
        state.items = [];
        state.appliedPromo = null;
        saveToLocalStorage([]); 
        savePromoToLocalStorage(null);
    },

      toggleCartModal: (state) => {
        state.isCartModalOpen = !state.isCartModalOpen;
    },

      setCartModalOpen: (state, action) => {
        state.isCartModalOpen = action.payload;
      }
    
  },
  extraReducers: (builder) => {
    
    builder.addCase(logout, (state) => {
      state.items = [];
      state.appliedPromo = null;
      saveToLocalStorage([]);
      savePromoToLocalStorage(null);
    });
  }
});

export const { addToCart, removeFromCart, updateQuantity, setCart, clearCart, toggleCartModal, 
    setCartModalOpen, setPromo, clearPromo } = cartSlice.actions;
export default cartSlice.reducer;
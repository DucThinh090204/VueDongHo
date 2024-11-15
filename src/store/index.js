// store/index.js
import { createStore } from 'vuex';
import products from './modules/products';
import cart from './modules/cart'; // Import module cart

export default createStore({
  modules: {
    products,
    cart, // Thêm module cart vào store
  },
});
// store/modules/cart.js
export default {
    namespaced: true,
    state: {
      items: [], // Danh sách sản phẩm trong giỏ hàng
    },
    mutations: {
      ADD_TO_CART(state, product) {
        const existingProduct = state.items.find(item => item.id === product.id);
        if (existingProduct) {
          existingProduct.quantity += 1; // Tăng số lượng nếu sản phẩm đã có trong giỏ
        } else {
          state.items.push({ ...product, quantity: 1 }); // Thêm sản phẩm mới vào giỏ
        }
      },
      REMOVE_FROM_CART(state, productId) {
        state.items = state.items.filter(item => item.id !== productId); // Xóa sản phẩm khỏi giỏ
      },
      CLEAR_CART(state) {
        state.items = []; // Xóa tất cả sản phẩm trong giỏ
      },
    },
    getters: {
      cartItems: (state) => {
        return state.items; // Lấy danh sách sản phẩm trong giỏ
      },
      totalItems: (state) => {
        return state.items.reduce((total, item) => total + item.quantity, 0); // Tính tổng số lượng sản phẩm
      },
      totalPrice: (state) => {
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0); // Tính tổng giá trị giỏ hàng
      },
    },
    actions: {
      addToCart({ commit }, product) {
        if (!product) {
          console.error('Cannot add undefined product to cart');
          return;
        }
        console.log('Adding product to cart:', product);
        commit('ADD_TO_CART', product);
      },
      removeFromCart({ commit }, productId) {
        commit('REMOVE_FROM_CART', productId); // Gọi mutation để xóa sản phẩm khỏi giỏ
      },
      clearCart({ commit }) {
        commit('CLEAR_CART'); // Gọi mutation để xóa tất cả sản phẩm
      },
    },
  };
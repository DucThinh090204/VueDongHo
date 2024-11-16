import cartService from "../services/cartService"

export default {
  namespaced: true,
  
  state: {
    items: [], 
    cartError: null, 
    loading: false 
  },
  
  mutations: {
    SYNC_LOCAL_STORAGE(state) {
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    
    SET_CART_ITEMS(state, items) {
      state.items = items
      localStorage.setItem('cart', JSON.stringify(items))
    },
    
    ADD_TO_CART(state, item) {
      const existingItem = state.items.find(i => i.productId === item.productId)
      
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        state.items.push(item)
      }
      
      // Đồng bộ với Local Storage
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    
    REMOVE_FROM_CART(state, productId) {
      state.items = state.items.filter(item => item.productId !== productId)
      
      // Đồng bộ với Local Storage
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    
    UPDATE_CART_ITEM(state, { productId, quantity }) {
      const item = state.items.find(i => i.productId === productId)
      if (item) {
        item.quantity = quantity
      }
      
      // Đồng bộ với Local Storage
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    
    SET_CART_ERROR(state, error) {
      state.cartError = error
    },

    CLEAR_CART_ERROR(state) {
      state.cartError = null;
    },

    // Mutation tăng số lượng sản phẩm
    INCREASE_QUANTITY(state, { productId, maxStock }) {
      const cartItem = state.items.find(item => item.productId === productId);
      console.log(cartItem)
      if (cartItem && cartItem.quantity < maxStock) {
        cartItem.quantity += 1;
      }
    },

    // Mutation giảm số lượng sản phẩm
    DECREASE_QUANTITY(state, productId) {
      const cartItem = state.items.find(item => item.productId === productId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }
    }
  },
  
  actions: {

    initializeCart({ commit }) {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        commit('SET_CART_ITEMS', parsedCart)
      }
    },
    // Fetch giỏ hàng từ server
    async fetchCartItems({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await cartService.getCartItems()
        commit('SET_CART_ITEMS', response.data)
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_CART_ERROR', 'Lỗi tải giỏ hàng')
        commit('SET_LOADING', false)
      }
    },
    
    async addToCart({ commit, state }, { product, quantity = 1 }) {
      commit('SET_LOADING', true)
      
      try {
        const existingItem = state.items.find(item => item.productId === product.id)
        
        if (existingItem) {
          const updatedQuantity = existingItem.quantity + quantity
          
          await cartService.updateCartItem(existingItem.id, {
            ...existingItem,
            quantity: updatedQuantity
          })
          
          commit('UPDATE_CART_ITEM', { 
            productId: product.id, 
            quantity: updatedQuantity 
          })
        } else {
          const newCartItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
          }
          
          const response = await cartService.addToCart(newCartItem)
          commit('ADD_TO_CART', response.data)
        }
        
        // Đồng bộ với Local Storage
        commit('SYNC_LOCAL_STORAGE')
        
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_CART_ERROR', 'Lỗi thêm sản phẩm')
        commit('SET_LOADING', false)
      }
    },
    
    async removeFromCart({ commit, state }, { productId }) {
      commit('SET_LOADING', true);
      
      try {
        // Log để debug
        console.log('Current cart items:', state.items);
        console.log('Product ID to remove:', productId);
    
        // Tìm sản phẩm trong giỏ hàng
        // Kiểm tra nhiều trường để so sánh
        const cartItemToRemove = state.items.find(
          item => 
            item.productId === productId || 
            item.id === productId || 
            item.productId === Number(productId) ||
            item.id === Number(productId)
        );
        
        // Nếu không tìm thấy sản phẩm
        if (!cartItemToRemove) {
          console.error('Sản phẩm không tồn tại trong giỏ hàng');
          commit('SET_CART_ERROR', 'Sản phẩm không tồn tại trong giỏ hàng');
          commit('SET_LOADING', false);
          return;
        }
    
        // Log thông tin sản phẩm được tìm thấy
        console.log('Cart item to remove:', cartItemToRemove);
    
        // Xóa trên server
        try {
          // Kiểm tra và xóa trên server nếu có id
          if (cartItemToRemove.id) {
            await cartService.removeCartItem(cartItemToRemove.id);
          }
        } catch (serverError) {
          console.error('Lỗi khi xóa trên server:', serverError);
        }
    
        // Xóa sản phẩm khỏi state
        // Sử dụng productId hoặc id để xóa
        commit('REMOVE_FROM_CART', cartItemToRemove.productId || cartItemToRemove.id);
        
        // Đồng bộ với Local Storage
        const updatedItems = state.items.filter(
          item => item.productId !== productId && item.id !== productId
        );
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    
        commit('SET_LOADING', false);
      } catch (error) {
        console.error('Lỗi xóa sản phẩm:', error);
        commit('SET_CART_ERROR', 'Lỗi xóa sản phẩm');
        commit('SET_LOADING', false);
      }
    },
    
    // Mutation tương ứng
    REMOVE_FROM_CART(state, productId) {
      // Sử dụng filter để loại bỏ sản phẩm
      state.items = state.items.filter(
        item => item.productId !== productId && item.id !== productId
      );
    },
    
    // Xóa toàn bộ giỏ hàng
    async clearCart({ commit }) {
      commit('SET_LOADING', true)
      
      try {
        await cartService.clearCart()
        commit('SET_CART_ITEMS', [])
        localStorage.removeItem('cart')
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_CART_ERROR', 'Lỗi xóa giỏ hàng')
        commit('SET_LOADING', false)
      }
    },

    clearError({ commit }) {
      commit('CLEAR_CART_ERROR');
    },

    // Action tăng số lượng sản phẩm
    async increaseQuantity({ commit, state }, { productId, maxStock }) {
      commit('SET_LOADING', true);
      
      try {
        // Tìm sản phẩm trong giỏ hàng
        const cartItem = state.items.find(item => item.productId === productId);
        
        if (cartItem) {
          // Kiểm tra số lượng tối đa
          if (cartItem.quantity < maxStock) {
            // Gọi service để cập nhật số lượng trên server
            await cartService.updateCartItem(cartItem.id, {
              ...cartItem,
              quantity: cartItem.quantity + 1
            });

            // Commit mutation để tăng số lượng
            commit('INCREASE_QUANTITY', { productId, maxStock });
            commit('SET_LOADING', false);
          } else {
            commit('SET_CART_ERROR', 'Số lượng vượt quá tồn kho');
            commit('SET_LOADING', false);
          }
        }
      } catch (error) {
        commit('SET_CART_ERROR', 'Lỗi khi tăng số lượng');
        commit('SET_LOADING', false);
      }
    },

    // Action giảm số lượng sản phẩm
    async decreaseQuantity({ commit, state }, productId) {
      commit('SET_LOADING', true);
      
      try {
        // Tìm sản phẩm trong giỏ hàng
        const cartItem = state.items.find(item => item.productId === productId);
        
        if (cartItem && cartItem.quantity > 1) {
          // Gọi service để cập nhật số lượng trên server
          await cartService.updateCartItem(cartItem.id, {
            ...cartItem,
            quantity: cartItem.quantity - 1
          });

          // Commit mutation để giảm số lượng
          commit('DECREASE_QUANTITY', productId);
          commit('SET_LOADING', false);
        }
      } catch (error) {
        commit('SET_CART_ERROR', 'Lỗi khi giảm số lượng');
        commit('SET_LOADING', false);
      }
    }
  },
  
  getters: {
    cartItems: (state) => state.items,
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    isCartEmpty: (state) => state.items.length === 0,
    cartError: (state) => state.cartError,
    isLoading: (state) => state.loading,
    getProductQuantity: (state) => (productId) => {
      const cartItem = state.items.find(item => item.productId === productId);
      return cartItem ? cartItem.quantity : 0;
    }
  }
}
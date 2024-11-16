<template>
  <div class="cart-container">
    <div class="cart-header">
      <h2>Giỏ Hàng</h2>
      <span class="cart-count">({{ totalItems }} sản phẩm)</span>
    </div>

    <!-- Thông báo giỏ hàng trống -->
    <div v-if="cartItems.length === 0" class="empty-cart">
      <img src="../assets/empty-cart.png" alt="Giỏ hàng trống">
      <p>Giỏ hàng của bạn đang trống</p>
      <router-link to="/" class="btn-continue-shopping">
        Tiếp tục mua sắm
      </router-link>
    </div>

    <!-- Danh sách sản phẩm trong giỏ -->
    <div v-else class="cart-content">
      <div class="cart-items-section">
        <div 
          v-for="item in cartItems" 
          :key="item.id" 
          class="cart-item-card"
        >
          <!-- Hình ảnh sản phẩm -->
          <div class="cart-item-image">
            <img :src="require(`@/${item.image}`)" :alt="item.name">
          </div>

          <!-- Thông tin sản phẩm -->
          <div class="cart-item-details">
            <h3>{{ item.name }}</h3>
            <p class="cart-item-price">
              {{ formatCurrency(item.price) }}
            </p>

            <!-- Điều khiển số lượng -->
            <div class="quantity-control">
              <button 
                @click="decreaseQuantity(item.id)"
                class="quantity-btn minus"
                :disabled="item.quantity <= 1"
              >
                <span class="quantity-symbol">-</span>
              </button>
              
              <span class="quantity-display">
                {{ item.quantity }} 
              </span>
              
              <button 
                @click="increaseQuantity(item.id)"
                class="quantity-btn plus"
                :disabled="item.quantity >= item.maxQuantity"
              >
                <span class="quantity-symbol">+</span>
              </button>
            </div>

            <!-- Nút xóa sản phẩm -->
            <button 
              @click="removeFromCart(item.id)" 
              class="btn-remove-item"
            >
              Xóa
            </button>
          </div>

          <!-- Tổng giá sản phẩm -->
          <div class="cart-item-total">
            {{ formatCurrency(item.price * item.quantity) }}
          </div>
        </div>
      </div>

      <!-- Tóm tắt giỏ hàng -->
      <div class="cart-summary">
        <div class="summary-row">
          <span>Tổng sản phẩm:</span>
          <span>{{ totalItems }}</span>
        </div>
        <div class="summary-row">
          <span>Tổng tiền:</span>
          <span>{{ formatCurrency(totalPrice) }}</span>
        </div>
        
        <button 
          @click="proceedToCheckout" 
          class="btn-checkout"
          :disabled="cartItems.length === 0"
        >
          Thanh Toán
        </button>
      </div>
    </div>

    <!-- Thông báo lỗi -->
    <div v-if="cartError" class="cart-error-message">
      {{ cartError }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ComCart',
  computed: {
    ...mapGetters({
      cartItems: 'cart/cartItems',
      totalItems: 'cart/totalItems',
      totalPrice: 'cart/totalPrice',
      cartError: 'cart/cartError'
    })
  },
  methods: {
    ...mapActions({
      removeItemFromCart: 'cart/removeFromCart',
      increaseItemQuantity: 'cart/increaseQuantity',
      clearCartError: 'cart/clearError'
    }),
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
      }).format(value);
    },
    increaseQuantity(productId) {
      this.increaseItemQuantity(productId);
    },
    decreaseQuantity(productId) {
      const item = this.cartItems.find(i => i.id === productId);
      if (item && item.quantity > 1) {
        this.$store.dispatch('cart/decreaseQuantity', productId);
      }
    },
    removeFromCart(productId) {
    this.$store.dispatch('cart/removeFromCart', { productId })
  },
    proceedToCheckout() {
      // Chuyển đến trang thanh toán
      this.$router.push('/checkout');
    },
    clearError() {
      this.clearCartError();
    }
  },
  watch: {
    cartError(newError) {
      if (newError) {
        // Tự động xóa thông báo lỗi sau 3 giây
        setTimeout(() => {
          this.clearError();
        }, 3000);
      }
    }
  }
}
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.cart-header h2 {
  margin-right: 10px;
}

.cart-count {
  color: #888;
}

.empty-cart {
  text-align: center;
  padding: 50px 0;
}

.empty-cart img {
  max-width: 300px;
  margin-bottom: 20px;
}

.btn-continue-shopping {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.cart-item-card {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.cart-item-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item-total {
  font-weight: bold;
}

.cart-summary {
  margin-top: 30px;
  text-align: right;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.btn-checkout {
  width: 100%;
  padding: 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
}

.btn-checkout:disabled {
  background-color: #cccccc;
}

.cart-error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}
</style>
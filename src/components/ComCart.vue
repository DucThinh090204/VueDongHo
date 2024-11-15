<template>
  <div class="cart">
    <h1 class="cart-title">Giỏ hàng của bạn</h1>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Giỏ hàng của bạn hiện đang trống.</p>
    </div>
    <div v-else>
      <ul class="cart-items">
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="require(`@/${item.img}`)" alt="Product Image" class="product-image" />
          <div class="item-details">
            <h2 class="item-name">{{ item.name }}</h2>
            <p class="item-price">Giá: {{ formatCurrency(item.price) }}</p>
            <p class="item-quantity">Số lượng: {{ item.quantity }}</p>
            <button @click="removeFromCart(item.id)" class="remove-button">Xóa</button>
          </div>
        </li>
      </ul>
      <div class="cart-summary">
        <h2>Tổng giá: {{ formatCurrency(totalPrice) }}</h2>
        <button @click="checkout" class="checkout-button">Thanh toán</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('cart', {
      cartItems: state => state.items,
    }),
    ...mapGetters('cart', {
      totalPrice: 'totalPrice',
    }),
  },
  methods: {
    removeFromCart(productId) {
      this.$store.dispatch('cart/removeFromCart', productId);
    },
    checkout() {
      alert('Chức năng thanh toán chưa được triển khai.');
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
  },
};
</script>

<style scoped>
.cart {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.cart-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  color: #666;
}

.cart-items {
  list-style-type: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  transition: box-shadow 0.3s;
}

.cart-item:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100px;
  height: auto;
  margin-right: 20px;
  border-radius: 5px;
}

.item-details {
  flex-grow: 1;
}

.item-name {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.item-price, .item-quantity {
  font-size: 16px;
  color: #555;
}

.remove-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #ff1a1a;
}

.cart-summary {
  margin-top: 20px;
  text-align: right;
}

.checkout-button {
  background-color: #4ecdc4;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkout-button:hover {
  background-color: #45b7b3;
}
</style>
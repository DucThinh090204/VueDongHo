<template>
  <div class="cart">
    <h1>Giỏ hàng của bạn</h1>
    <div v-if="cartItems.length === 0">
      <p>Giỏ hàng của bạn hiện đang trống.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" alt="Product Image" />
          <div>
            <h2>{{ item.name }}</h2>
            <p>Giá: {{ formatCurrency(item.price) }}</p>
            <p>Số lượng: {{ item.quantity }}</p>
            <button @click="removeFromCart(item.id)">Xóa</button>
          </div>
        </li>
      </ul>
      <div class="cart-summary">
        <h2>Tổng giá: {{ formatCurrency(totalPrice) }}</h2>
        <button @click="checkout">Thanh toán</button>
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
  padding:  20px;
}
.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.cart-item img {
  width: 100px;
  height: auto;
  margin-right: 20px;
}
.cart-summary {
  margin-top: 20px;
}
</style>
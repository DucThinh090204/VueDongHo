<template>
  <div class="product-view">
    <!-- Hiển thị trạng thái loading -->
    <div v-if="loading" class="loading">Loading...</div>

    <!-- Hiển thị lỗi nếu có -->
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- Nội dung chính khi đã tải dữ liệu -->
    <div v-else-if="product" class="product-details">
      <h1>{{ product.name }}</h1>
      <img :src="getProductImage(product.img)" :alt="product.name" class="product-image" />
      <p>{{ product.description }}</p>
      <div class="product-info">
        <span class="price">{{ formatPrice(product.price) }} VND</span>
        <span class="stock">Stock: {{ product.stock }}</span>
      </div>
      <div class="product-actions">
        <button 
          @click="addToCart(product)" 
          :disabled="product.stock === 0"
        >
          {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
        </button>
      </div>
    </div>

    <!-- Fallback nếu không có sản phẩm -->
    <div v-else class="no-product">
      No product found
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductView',

  data() {
    return {
      productId: null
    }
  },

  computed: {
    ...mapState('products', [
      'productDetails', 
      'loading', 
      'error'
    ]),
    product() {
      return this.productDetails;
    }
  },

  created() {
  this.productId = this.$route.params.id;
  this.fetchProductDetails(this.productId)
    .then(() => {
      console.log('Fetched product details:', this.productDetails);
    })
    .catch(error => {
      console.error('Error fetching product:', error);
    });
},

  methods: {
    ...mapActions('products', ['fetchProductDetails']),

    getProductImage(imageName) {
      if (!imageName) {
        return require('@/assets/logo.png'); // Default image
      }
      try {
        return require(`@/${imageName}`);
      } catch (error) {
        console.error('Image not found:', error);
        return require('@/assets/logo.png');
      }
    },

    formatPrice(price) {
      return price ? new Intl.NumberFormat('vi-VN').format(price) : '0';
    },

    async addToCart() {
      // Kiểm tra kỹ dữ liệu trước khi dispatch
      if (!this.product) {
        console.error('Invalid product: No product found');
        return;
      }

      try {
        await this.$store.dispatch('cart/addToCart', {
          product: {
            id: this.product.id,
            name: this.product.name,
            price: this.product.price,
            image: this.product.img, // Chú ý sử dụng 'img' thay vì 'image'
            stock: this.product.stock
          },
          quantity: 1
        });

        // Thêm thông báo thành công (tùy chọn)
        alert('Sản phẩm đã được thêm vào giỏ hàng');
      } catch (error) {
        console.error('Error adding to cart:', error);
        // Hiển thị thông báo lỗi cho người dùng
        alert('Không thể thêm sản phẩm vào giỏ hàng');
      }
    },

    async handleAddToCart() {
    try {
      // Đảm bảo truyền đúng object có id
      await this.$store.dispatch('cart/addToCart', {
        id: this.product.id,  // Chắc chắn có id
        quantity: 1  // Số lượng, có thể điều chỉnh
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  }
}
</script>

<style scoped>
.product-view {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  font-size: 1.5rem;
}

.error {
  color: red;
  text-align: center;
  font-size: 1.2rem;
}

.product-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.price {
  font-weight: bold;
  font-size: 1.5rem;
  color: #ff6b6b;
}

.stock {
  font-size: 1rem;
  color: #4a4a4a;
}

.product-actions {
  margin-top: 20px;
}

.product-actions button {
  width: 100%;
  background-color: #4ecdc4;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product-actions button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.product-actions button:hover:not(:disabled) {
  background-color: #45b7b3;
}

.no-product {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>
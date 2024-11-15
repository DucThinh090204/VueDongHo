<template>
  <div class="product-container">
    <!-- Hiển thị trạng thái loading -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>

    <!-- Hiển thị lỗi nếu có -->
    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <!-- Nội dung chính khi đã tải dữ liệu -->
    <template v-else>
      <div class="header">
        <div class="search-filter">
          <input 
            type="text" 
            placeholder="Search watches..." 
            :value="searchQuery"
            @input="updateSearchQuery($event.target.value)"
            class="search-input"
          >
          <select 
            :value="sortOption" 
            @change="updateSortOption($event.target.value)" 
            class="sort-select"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
          </select>
        </div>
      </div>

      <div class="product-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-card"
        >
          
          <div class="product-image">
            <img :src="require(`@/${product.img}`)" alt="Product Image" />
            <div class="product-overlay">
              <button 
                class="quick-view" 
                @click="viewProduct(product.id)"
              >
                Quick View
              </button>
            </div>
          </div>
          <div class="product-details">
            <h3>{{ product.name }}</h3>
            <div class="product-price-rating">
              <span class="price">{{ formatPrice(product.price) }} VND</span>
            </div>
            <div class="product-actions">
              <button 
                class="add-to-cart" 
                @click="addToCart(product)"
                :disabled="product.stock === 0"
              >
                {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Phân trang -->
      <div class="pagination">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="page-btn"
        >
          Previous
        </button>
        <span class="page-info">
          {{ currentPage }}/{{ totalPages }}
        </span>
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="page-btn"
        >
          Next
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
name: 'ProductList',

data() {
  return {
    productImages: {}
  }
},

created() {
  this.fetchProducts()
},

computed: {
  ...mapState('products', [
    'loading', 
    'error', 
    'currentPage', 
    'searchQuery', 
    'sortOption'
  ]),
  
  ...mapGetters('products', [
    'filteredAndSortedProducts', 
    'totalPages'
  ]),

  filteredProducts() {
    return this.filteredAndSortedProducts
  }
},

methods: {
  ...mapActions('products', [
    'fetchProducts',
    'changePage',
    'updateSearchQuery',
    'updateSortOption'
  ]),

  formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price)
  },

  viewProduct(id) {
    this.$router.push({ 
      name: 'ProductView', 
      params: { id: id } 
    })
  },

  prevPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1)
    }
  },

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1)
    }
  },

  addToCart(product) {
    if (product.stock > 0) {
      this.$store.dispatch('cart/addToCart', product)
      console.log("product : ")
    }
  }
}
}
</script>
  
  <style scoped>
  .product-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f4;
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .header h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 20px;
  }
  
  .search-filter {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .search-input, 
  .sort-select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 250px;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-bottom: 30px;
  }
  
  .product-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .product-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  }
  
  .product-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: #ff6b6b;
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 0.8rem;
    z-index: 10;
  }
  
  .product-image {
    position: relative;
    overflow: hidden;
    height: 300px;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .product-card:hover .product-image img {
    transform: scale(1.1);
  }
  
  .product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .product-card:hover .product-overlay {
    opacity: 1;
  }
  
  .quick-view {
    background: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    color: #333;
    transition: background-color 0.3s ease;
  }
  
  .quick-view:hover {
    background-color: #f0f0f0;
  }
  
  .product-details {
    padding: 20px;
  }
  
  .product-details h3 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: #333;
  }
  
  .product-price-rating {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .price {
    font-weight: bold;
    color: #ff6b6b;
    font-size: 1.2rem;
  }
  
  .rating .star {
    color: #ffd700;
    margin-left: 2px;
  }
  
  .add-to-cart {
    background-color: #4ecdc4;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 5px;
    width: 100%;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .add-to-cart:hover {
    background-color: #45b7 b3;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
  
  .page-btn {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .page-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .page-info {
    font-size: 1.2rem;
    margin: 0 10px;
  }
  </style>
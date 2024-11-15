import axios from 'axios';

export default {
  namespaced: true,
  state: {
    items: [],
    currentPage: 1,
    itemsPerPage: 6,
    searchQuery: '',
    sortOption: 'price-asc',
    loading: false,
    error: null,
    productDetails: null, // Thêm state để lưu thông tin chi tiết sản phẩm
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
      state.currentPage = 1; // Reset current page khi tìm kiếm
    },
    SET_SORT_OPTION(state, option) {
      state.sortOption = option;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_PRODUCT_DETAILS(state, product) {
      state.productDetails = product; // Thêm mutation để cập nhật thông tin chi tiết sản phẩm
    },
    CLEAR_PRODUCT_DETAILS(state) {
      state.productDetails = null; // Thêm mutation để xóa thông tin chi tiết sản phẩm
    },
  },
  getters: {
    filteredAndSortedProducts: (state) => {
      let result = state.items.filter(item => 
        item.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );

      // Sorting logic
      switch(state.sortOption) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }

      // Pagination
      const start = (state.currentPage - 1) * state.itemsPerPage;
      return result.slice(start, start + state.itemsPerPage);
    },
    totalPages: (state) => {
      return Math.ceil(state.items.length / state.itemsPerPage);
    },
    isLoading: (state) => state.loading,
    errorMessage: (state) => state.error,
    productDetails: (state) => state.productDetails, // Getter để lấy thông tin chi tiết sản phẩm
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const response = await axios.get('http://localhost:3000/products');
        commit('SET_ITEMS', response.data);
      } catch (error) {
        commit('SET_ERROR', error.message);
        console.error('Error fetching products:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchProductDetails({ commit }, productId) {
        console.log('Fetching product details for ID:', productId); // Kiểm tra giá trị productId
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const response = await axios.get(`http://localhost:3000/products/${productId}`);
        console.log('Fetched product details:', response.data); // Kiểm tra dữ liệu trả về
        commit('SET_PRODUCT_DETAILS', response.data); // Cập nhật thông tin chi tiết sản phẩm
      } catch (error) {
        commit('SET_ERROR', error.message);
        console.error('Error fetching product details:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    changePage({ commit }, page) {
      commit('SET_CURRENT_PAGE', page);
    },
    updateSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query);
    },
    updateSortOption({ commit }, option) {
      commit('SET_SORT_OPTION', option);
    },
  },
};
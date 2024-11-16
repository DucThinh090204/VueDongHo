// services/cartService.js
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/cart' // Đảm bảo endpoint cart tồn tại trong db.json

export default {
  // Lấy danh sách giỏ hàng
  getCartItems() {
    return axios.get(BASE_URL)
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart(cartItem) {
    return axios.post(BASE_URL, cartItem)
  },

  // Cập nhật sản phẩm trong giỏ hàng
  updateCartItem(id, cartItem) {
    return axios.put(`${BASE_URL}/${id}`, cartItem)
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeCartItem(id) {
    return axios.delete(`${BASE_URL}/${id}`)
  },

  // Xóa toàn bộ giỏ hàng
  clearCart() {
    return axios.get(BASE_URL)
      .then(response => {
        const deletePromises = response.data.map(item => 
          axios.delete(`${BASE_URL}/${item.id}`)
        )
        return Promise.all(deletePromises)
      })
  }
}
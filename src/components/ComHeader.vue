<template>
  <header>
    <div class="container">
      <div class="logo">
        <img src="Images/logo.png" alt="Watch Store Logo">
      </div>
      <nav>
        <ul>
          <li><router-link to="/">Trang Chủ</router-link></li>
          <li><router-link to="/cart">Giỏ Hàng</router-link></li>
          <li><router-link to="/contact">Liên Hệ</router-link></li>
          <li><a href="#">Tin Tức</a></li>
        </ul>
      </nav>
      <div class="cta">
        <a href="#" class="cta-button">Đăng Nhập</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
}
</script>

<style scoped>
header {
  background-color: #0F4392; /* Màu nền tối */
  color: #ecf0f1; /* Màu chữ sáng */
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px; /* Tăng khoảng cách bên trong */
  max-width: 1200px; /* Giới hạn chiều rộng */
  margin: 0 auto; /* Căn giữa */
}

.logo img {
  height: 90px; 
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: scale(1.1);
}

nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin: 0 20px; /* Tăng khoảng cách giữa các mục */
}

nav ul li a {
  text-decoration: none;
  color: #ecf0f1; /* Màu chữ sáng */
  font-weight: 500; /* Đổi kiểu chữ nhẹ hơn */
  font-size: 1.1rem; /* Tăng kích thước chữ */
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #fcb034; /* Màu chữ khi hover */
  text-shadow: 0 0 5px rgba(252, 176, 52, 0.7); /* Hiệu ứng bóng */
}

.cta-button {
  padding: 10px 25px; /* Điều chỉnh padding */
  background-color: #fcb034; /* Màu nền nút */
  color: #fff; /* Màu chữ trắng */
  text-decoration: none;
  border-radius: 30px; /* Tạo góc tròn cho nút */
  font-size: 1rem; /* Kích thước chữ */
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
  background-color: #ffa726; /* Màu nền khi hover */
  transform: scale(1.05); /* Hiệu ứng phóng to */
}
</style>
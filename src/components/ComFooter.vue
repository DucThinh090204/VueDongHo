<template>
  <footer>
    <div class="footer-container">
      <p>&copy; 2023 Fashion Store. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style scoped>
footer {
  background-color: #333; /* Màu nền tối */
  color: white; /* Màu chữ sáng */
  text-align: center; /* Căn giữa chữ */
  width: 100%; /* Chiều rộng 100% */
  left: 0; /* Căn trái */
  padding: 15px 0; /* Padding trên và dưới */
}

.footer-container {
  max-width: 1200px; /* Giới hạn chiều rộng */
  margin: 0 auto; /* Căn giữa */
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Đảm bảo chiều cao tối thiểu của body là 100% chiều cao viewport */
}

main {
  flex: 1; 
}
</style>
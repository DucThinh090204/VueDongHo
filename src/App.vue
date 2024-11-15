<template>
  <div id="app">
    <ComHeader />
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <ComFooter />
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader.vue'
import ComFooter from '@/components/ComFooter.vue'

export default {
  name: 'App',
  components: {
    ComHeader,
    ComFooter
  }
}
</script>

<style>
/* Reset và CSS toàn cục */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Arial', sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1 0 auto;
  width: 100%;
}

/* Responsive và thiết lập chung */
* {
  box-sizing: border-box;
}

/* Các biến màu sắc */
:root {
  --primary-color: #4ecdc4;
  --secondary-color: #ff6b6b;
  --text-color: #333;
  --background-color: #f7f7f7;
}

/* Các class tiện ích */
.text-center {
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Nút chung */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 10px;
  }
}
</style>
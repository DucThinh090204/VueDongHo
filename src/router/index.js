import { createRouter, createWebHistory } from 'vue-router';
import Products from '@/components/ProductList.vue';
import ProductView from '@/components/ProductView.vue';
import Contact from '@/components/ComContact.vue';
import Cart from '@/components/ComCart.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Products
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }, 
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/products/:id',
    name: 'ProductView',
    component: ProductView
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product',
    name: 'product.list',

    component: () => import('../views/product/ProductList.vue'),
  },
  {
    path: '/product/create',
    name: 'product.form',
    component: () => import('../views/product/ProductForm.vue'),
  },
  {
    path: '/user',
    name: 'user.form',
    component: () => import('../views/users/UserList.vue'),
  },
  {
    path: '/user/create',
    name: 'user.list',
    component: () => import('../views/users/UserForm.vue'),
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'packing_order',
        name: 'packing_order',
        component: () => import('../views/home/PackingOrder.vue')
      },
      {
        path: 'packaging_type',
        name: 'packaging_type',
        component: () => import('../views/home/data/base/PackagingType.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router

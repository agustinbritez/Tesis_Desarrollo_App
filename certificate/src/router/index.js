import {
  createRouter,
  createWebHistory
} from 'vue-router'




const home = '/';

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import( /* webpackChunkName: "about" */ '../views/Home.vue')

  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/events',
    name: 'Event',
    components: {
      default: import('../views/Events.vue'),
      // modalEdit: import('../components/elements/ModalEdit.vue'),
    }
  },
  {
    path: '/areas',
    name: 'Areas',
    components: {
      default: import('../views/Areas.vue'),
      // modalEdit: import('../components/elements/ModalEdit.vue'),
    }
  },
  {
    path: '/areas/:id',
    name: 'AreaView',
    components: {
      default: import('../components/Areas/viewArea.vue'),
      // modalEdit: import('../components/elements/ModalEdit.vue'),
    }
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
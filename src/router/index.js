import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Signin from "../views/Signin";
import ManagementMenuPlanning from "../views/ManagementMenuPlanning";
import store from '../store/index'
import Planning from "../views/Planning";
import ManagementMenuContacts from "../views/ManagementMenuContacts";
import CreatePlanning from "../views/CreatePlanning";
import ManagementMenuTasks from "../views/ManagementMenuTasks";
import CreateTask from "../views/CreateTask";
import ManagementMenuEvents from "../views/ManagementMenuEvents";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/menuPlanning',
    name: 'MenuPlanning',
    component: ManagementMenuPlanning,
    meta: { requiresAuth: true }
  },
  {
    path: '/planning/:id/menuTasks',
    name: 'MenuTasks',
    component: ManagementMenuTasks,
    meta: { requiresAuth: true }
  },
  {
    path: '/planning/:id/menuEvents',
    name: 'MenuEvents',
    component: ManagementMenuEvents,
    meta: { requiresAuth: true }
  },
  {
    path: '/menuContacts',
    name: 'MenuContacts',
    component: ManagementMenuContacts,
    meta: { requiresAuth: true }
  },
  {
    path: '/planning/:id',
    name: 'planning',
    component: Planning,
    meta: { requiresAuth: true }
  },
  {
    path: '/planning',
    name: 'planningCreate',
    component: CreatePlanning,
    meta: { requiresAuth: true }
  },
  {
    path: '/planning/:id/task',
    name: 'TaskCreate',
    component: CreateTask,
    meta: { requiresAuth: true }
  },
  {
    path: '/logout',
    name: 'Logout',
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Logout') {
    store.dispatch('updateToken', '').then(() => {
      next({
        path: '/',
      })
    })

    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.token) {
      next();
      return;
    }

    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })

    return;
  }

  next()
})


export default router

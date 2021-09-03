import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Signin from "../views/Signin";
import ManagementMenuPlanning from "../views/MenuPlannings/ManagementMenuPlanning";
import store from '../store/index'
import Planning from "../views/Planning";
import ManagementMenuContacts from "../views/MenuContacts/ManagementMenuContacts";
import FirstLoginAddContact from "../views/FirstLoginAddContact";
import firstLoginUpdateUser from "../views/firstLoginUpdateUser";
import Account from "../views/Account";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/firstLoginContact',
    name: 'firstContact',
    component: FirstLoginAddContact,
    meta: { requiresAuth: true }
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: { requiresAuth: true }
  },
  {
    path: '/firstLoginUpdateUser',
    name: 'firstUser',
    component: firstLoginUpdateUser,
    meta: { requiresAuth: true }
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
    path: '/planning/:id',
    name: 'PlanningDelete',
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

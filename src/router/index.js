import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Signin from "../views/Signin";
import ManagementMenuPlanning from "../views/MenuPlannings/ManagementMenuPlanning";
import store from '../store/index'
import Planning from "../views/Planning";
import ManagementMenuContacts from "../views/MenuContacts/ManagementMenuContacts";
import ManagementMenuTasks from "../views/MenuTasks/ManagementMenuTasks";
import CreateTask from "../views/MenuTasks/CreateTask";
import CreateContact from "../views/MenuContacts/CreateContact";
import UpdateTask from "../views/MenuTasks/UpdateTask";
import UpdateContact from "../views/MenuContacts/UpdateContact";
import FirstLoginAddContact from "../views/FirstLoginAddContact";
import firstLoginUpdateUser from "../views/firstLoginUpdateUser";
import testView from "../views/testView";

const routes = [
  {
    path: '/test',
    name: 'test',
    component: testView,
  },
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
    path: '/firstLoginContact',
    name: 'firstContact',
    component: FirstLoginAddContact,
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
    path: '/planning/:id/menuTasks',
    name: 'MenuTasks',
    component: ManagementMenuTasks,
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
    path: '/planning/:id/task',
    name: 'TaskCreate',
    component: CreateTask,
    meta: { requiresAuth: true }
  },
  {
    path: '/contact',
    name: 'ContactCreate',
    component: CreateContact,
    meta: { requiresAuth: true }
  },
  {
    path: '/contact/:id',
    name: 'ContactUpdate',
    component: UpdateContact,
    meta: { requiresAuth: true }
  },
  {
    path: '/planning/:planningId/task/:taskId',
    name: 'TaskUpdate',
    component: UpdateTask,
    props: route => ({
      taskId: route.params.taskId,
      planningId: route.params.planningId,
    }),
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import decode from "jwt-decode";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
     component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path : 'usuarios',
        name : 'Usuarios',
        component: () => import(/* webpackChunkName: "usuarioDT" */ '../components/UsuarioDT.vue'),
        meta: { requiresAdmin: true },
      },
      {
        path : 'agenda',
        name : 'Agenda',
        component: () => import(/* webpackChunkName: "agendaDT" */ '../components/AgendaDT.vue')        
      },
      {
        path : 'documento',
        name : 'Documento',
        component: () => import(/* webpackChunkName: "documentoDT" */ '../components/DocumentoDT.vue')        
      },
      {
        path : 'estado',
        name : 'Estado',
        component: () => import(/* webpackChunkName: "estadoDT" */ '../components/EstadoDT.vue')        
      },
      {
        path : 'rol',
        name : 'Rol',
        component: () => import(/* webpackChunkName: "rolDT" */ '../components/RolDT.vue')        
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = decode(localStorage.getItem('token'));
    if (!token) {
      next({
        name: 'Login',
        // query: { redirect: to.fullPath }
      })
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin)){
		  if(token["codigorol"] === 'Administrador'){
			  next()
		  }else{
			  next({name : 'Admin'})
		  }
      }else{
		  next()
	  }
	}
  } else {
    next() // make sure to always call next()!
  }
})

export default router

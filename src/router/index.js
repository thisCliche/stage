import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决vue router 报错： Uncaught (in promise) 
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/Home')
  },
	{
	  path: '/detail/:id',
	  name: 'detail',
	  component: () => import('../views/home/Detail'),
		meta: {
		  requiresAuth: true
		}
	},
	{
	  path: '/listdetail',
	  name: 'listdetail',
	  component: () => import('../views/home/ListDetail')
	},
	{
	  path: '/all',
	  name: 'all',
	  component: () => import('../views/all/All')
	},
	{
	  path: '/shopcart',
	  name: 'shopcart',
	  component: () => import('../views/shopcart/ShopCart'),
		meta: {
		  requiresAuth: true
		}
	},
	{
	  path: '/my',
	  name: 'my',
	  component: () => import('../views/my/My')
	},
  {
    path: '/set',
    name: 'set',
    component: () => import('../views/my/Set'),
		meta: {
		  requiresAuth: true
		}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/Register')
  },
  {
    path: '/modifypsw',
    name: 'modifypsw',
    component: () => import('../views/my/ModifyPsw'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/forgetpsw',
    name: 'forgetpsw',
    component: () => import('../views/login/ForgetPsw')
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/login/Privacy')
  },
	{
	  path: '/order',
	  name: 'order',
	  component: () => import('../views/my/Order'),
		meta: {
		  requiresAuth: true
		}
	},
	{
	  path: '/collection',
	  name: 'collection',
	  component: () => import('../views/my/Collection'),
		meta: {
		  requiresAuth: true
		}
	},
	{
	  path: '/address',
	  name: 'address',
	  component: () => import('../views/my/Address'),
		meta: {
		  requiresAuth: true
		}
	},
	{
	  path: '/addaddress',
	  name: 'addaddress',
	  component: () => import('../views/my/AddAddress')
	},
  {
    path: '*',
    redirect: "/home"
  }
]

const router = new VueRouter({
  routes
})

export default router

import { Toast } from 'vant';
//  路由权限控制 进入my组件时候 需要登录状态
router.beforeEach((to,from,next) => {
  // console.log(to.meta.requiresAuth)
  if(to.meta.requiresAuth){
    // 如果不为空 说明已经登录 直接放行
   // console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token")!= null){
      next();
    }else{
     Toast({
        message: 'Please log in first！',
        duration: 1000
      });
      next({path: "/login"});
    }
  }else{
    next();
  }
});
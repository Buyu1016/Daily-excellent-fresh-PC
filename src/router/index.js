import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import routes from './router';
import store from '../store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});
store.commit('user/setMessage', Cookies.get('user') ? JSON.parse(Cookies.get('user')) : { isLogin: false });
router.beforeEach((to, from, next) => {
  if (to.name === 'Sign') {
    // 强制在已经登录的状态下不让再次进入登录界面
    if (store.state.user.isLogin) {
      next({
        name: 'Statistics',
      });
    } else {
      next();
    }
  }
  if (store.state.user.isLogin) {
    next();
  } else {
    next({
      name: 'Sign',
    });
  }
  // 类目权限管理
  // if (to.name === 'Category') {
  //   if (store.state.user.role === 'admin') {
  //     next();
  //   } else {
  //     next({
  //       name: 'Statistics',
  //     });
  //   }
  // }
});
export default router;

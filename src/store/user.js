import { setCookie, cancellationCookie } from '@/utils/userCookie';

export default {
  namespaced: true,
  state: {
    username: null,
    email: null,
    appkey: null,
    role: null,
    isLogin: false,
  },
  mutations: {
    setMessage(store, payload) {
      if (!store.isLogin) {
        store.username = payload.username;
        store.email = payload.email;
        store.appkey = payload.appkey;
        store.role = payload.role;
        store.isLogin = payload.isLogin || false;
        if (payload.username && payload.email && payload.appkey && payload.role) {
          store.isLogin = true;
          alert('成功登录');
        }
        const userMessage = {
          username: store.username || null,
          email: store.email || null,
          appkey: store.appkey || null,
          role: store.role || null,
          isLogin: payload.isLogin || store.isLogin,
        };
        setCookie('user', userMessage);
      } else {
        alert('已有账号登录，请注销后再进行尝试');
      }
    },
    cancellationUser(store) {
      if (store.isLogin) {
        store.username = null;
        store.email = null;
        store.appkey = null;
        store.role = null;
        store.isLogin = false;
        cancellationCookie('user');
        alert('已成功注销用户');
      } else {
        alert('当前未登录,请先进行登录');
      }
    },
  },
};

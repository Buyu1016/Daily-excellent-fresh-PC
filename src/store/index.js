import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import shopMessage from './shopMessage';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    shopMessage,
  },
});

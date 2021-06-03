import shopMessage from '@/api/shopMessage';
import category from '@/api/category';

export default {
  namespaced: true,
  state: {
    dataTotal: 0,
    data: [],
    shopTypeAll: {},
  },
  mutations: {
    setData(store, payload) {
      store.dataTotal = payload.total;
      store.data = payload.data;
    },
    setShopTypeAll(store, payload) {
      store.shopTypeAll = payload;
    },
  },
  actions: {
    async setStateData(store, payload) {
      await store.dispatch('setStateShopTypeAll', {
        appkey: payload.appkey,
      });
      const data = await shopMessage.getShopAll(payload).then((resp) => {
        const newResp = resp.data.map((item, index) => ({
          categoryName: '',
          key: index,
          ...item,
        }));
        for (let i = 0; i < newResp.length; i += 1) {
          for (let j = 0; j < store.state.shopTypeAll.data.length; j += 1) {
            if (newResp[i].category === store.state.shopTypeAll.data[j].id) {
              newResp[i].categoryName = store.state.shopTypeAll.data[j].name;
            }
          }
        }
        return {
          data: newResp,
          total: resp.total,
        };
      });
      store.commit('setData', data);
    },
    async setStateShopTypeAll(store, payload) {
      const typeAll = await category.getCategoryAll(payload);
      store.commit('setShopTypeAll', typeAll);
    },
  },
};

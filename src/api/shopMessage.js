import axios from '@/api/axios';

export default {
  getShopAll(params) {
    return axios.get('/products/all', { params });
  },
  deleteShop(params) {
    return axios.delete(`/products/${params.id}`, { params });
  },
  postShopMessage(params) {
    return axios.post('/products/add', params);
  },
  getShopMessage(params) {
    return axios.get(`/products/${params.id}`, { params });
  },
  getEditShopMessage(params) {
    return axios.put('/products/edit', params);
  },
};

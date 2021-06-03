import axios from '@/api/axios';

export default {
  getCategoryAll(params) {
    return axios.get('/category/all', { params });
  },
  getCategoryAdd(params) {
    return axios.post('/category/add', params);
  },
};

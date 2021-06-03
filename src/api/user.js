import axios from '@/api/axios';

export default {
  // 用户登录
  userLogin(params) {
    return axios.post('/passport/login', params);
  },
};

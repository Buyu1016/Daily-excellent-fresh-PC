import axios from 'axios';

const loginMessage = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
// 请求拦截器   在发送请求前应该干啥
loginMessage.interceptors.request.use((resp) => resp, (error) => Promise.reject(error));
// 响应拦截器   对响应数据应该干啥
loginMessage.interceptors.response.use((resp) => {
  if (resp.data.status === 'success') {
    return resp.data.data;
  }
  return Promise.reject(resp.data.msg);
}, (error) => Promise.reject(error));
export default loginMessage;

import axios from 'axios';
import * as util from '../assets/util.js';

const instance = axios.create({
  baseURL: '/server',
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': 'true',
    'Access-Control-Allow-Method': 'OPTIONS,POST,GET'
  },
  withCredentials: true
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
//错误处理
instance.interceptors.response.use(function(response) {
  return response;
}, util.catchError);

export default instance;

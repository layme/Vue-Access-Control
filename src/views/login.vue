<template>

</template>

<script>
import axios from 'axios';
import CryptoJS from "crypto-js";
import * as util from '../assets/util.js';
//登录
const requestLogin = params => {
  let words = CryptoJS.enc.Utf8.parse(params.password);
  let base64 = CryptoJS.enc.Base64.stringify(words);
  params.password = base64;
  return axios.get('/api/api', {params})
};

export default {
  data() {
    return {
      username: '',
      password: '',
      isBtnLoading: false
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  methods: {
    login() {
      var vm = this;
      if (!vm.username) {
        vm.$message.error('请填写用户名！！！');
        return;
      }
      if (!vm.password) {
        vm.$message.error('请填写密码');
        return;
      }

      let loginParams = {name: vm.username, password: vm.password};
      vm.isBtnLoading = true;
      requestLogin(loginParams).then(res => {
        vm.isBtnLoading = false;
        if(res.data.token){
          util.session('token', res.data);
          vm.$emit('login', vm.$router.currentRoute.query.from);
        }else{
          return Promise.reject({
            message: '登录异常！'
          });
        }
      }).catch(util.catchError);
    }
  },
  created() {
    sessionStorage.clear();
  }
};
</script>

<style scoped>
  #app{display: table;width:100%;}
  .main-title{text-align: center;}
  .des{text-align: center;color:#999;margin-bottom: 2em;}
  .login-form{width: 400px;margin:13% auto 0;}
  .login-page{background:#fff;}
</style>

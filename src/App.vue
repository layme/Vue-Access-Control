<template>
  <router-view id="app" @login="loginDirect" @logout="logoutDirect"></router-view>
</template>

<script>
import Vue from 'vue';
import instance from './api';
import userPath from './router/fullpath.js';
import * as util from './assets/util.js';

// 请求拦截句柄
let myInterceptor;

export default {
  data() {
    return {
      menuData: null,
      userData: null
    }
  },
  methods: {
    // 获取资源列表 （按钮权限）
    getPermission: function(userInfo) {
      let resourcePermission = {};
      if (Array.isArray(userInfo.resources)) {
        userInfo.resources.forEach(function(e, i) {
          let key = e.method.toLowerCase() + ',' + e.url;
          resourcePermission[key] = true;
        });
      }
      return resourcePermission;
    },

    // 根据资源列表设置拦截器
    setInterceptor: function(resourcePermission) {
      let vm = this;
      myInterceptor = instance.interceptors.request.use(function(config) {
        // 得到请求路径
        let perName = config.url.replace(config.baseURL, '').replace('/GET','').replace('/POST','').split('?')[0];
        // 权限格式1 /path/${param}
        let reg1 = perName.match(/^(\/[^\/]+\/)[^\/]+$/);
        if (reg1) {
          perName = reg1[1] + '**';
        }
        // 权限格式2 /path/${param}/path
        let reg2 = perName.match(/^\/[^\/]+\/([^\/]+)\/[^\/]+$/);
        if (reg2) {
          perName = perName.replace(reg2[1], '*');
        }
        // 校验权限
        if (!resourcePermission[config.method + ',' + perName]) {
          // 调试信息
          console.warn(resourcePermission, config.method + ',' + perName);
          vm.$message({
            message: '无访问权限，请联系企业管理员',
            type: 'warning'
          });
          // 拦截请求
          return Promise.reject({
            message: 'no permission'
          });
        }
        return config;
      });
    },

    // 获取路由列表 （菜单权限）
    getRoutes: function(menuList) {
      if(!menuList){
        return console.warn(menuList);
      }
      let vm = this;
      let allowedRouter = [];
      // 将菜单数据转成多维数组格式
      let arrayMenus = util.buildMenu(menuList);

      console.log("arrayMenus => ", arrayMenus);
      // 将多维数组转成对象格式
      let hashMenus = {};
      let setMenu2Hash = function(array, base) {
        array.map(key => {
          if (key.route) {
            let hashKey = ((base ? base + '/' : '') + key.route).replace(/^\//, '');
            hashMenus['/' + hashKey] = true;
            if (Array.isArray(key.children)) {
              setMenu2Hash(key.children, key.route);
            }
          }
        });
      };
      setMenu2Hash(arrayMenus);

      console.log("hashMenus => ", hashMenus);
      // 全局挂载hashMenus，用于实现路由守卫
      this.$root.hashMenus = hashMenus;
      // 筛选本地路由方法
      let findLocalRoute = function(array, base) {
        let replyResult = [];
        array.forEach(function(route) {
          let pathKey = (base ? base + '/' : '') + route.path;
          if (hashMenus[pathKey]) {
            if (Array.isArray(route.children)) {
              route.children = findLocalRoute(route.children, route.path);
            }
            replyResult.push(route);
          }
        });
        if (base) {
          return replyResult;
        } else {
          allowedRouter = allowedRouter.concat(replyResult);
        }
      }
      let originPath = util.deepcopy(userPath[0].children);
      findLocalRoute(originPath);
      return allowedRouter;
    },

    // 动态拓展路由
    extendRoutes: function(allowedRouter) {
      let vm = this;
      let actualRouter = util.deepcopy(allowedRouter);
      actualRouter.map(e => {
        // 复制子菜单信息到meta用于实现导航相关效果，非必需
        if (e.children) {
          if (!e.meta) e.meta = {};
          e.meta.children = e.children;
        }
        // 为动态路由添加独享守卫
        return e.beforeEnter = function(to, from, next){
          console.log("to => ", to);
          console.log("to.path => ", to.path);
          if(vm.$root.hashMenus[to.path]){
            next()
          }else{
            console.log("没有权限，跳转401");
            next('/401')
          }
        }
      });
      let originPath = util.deepcopy(userPath);
      originPath[0].children = actualRouter;
      // 注入路由
      vm.$router.addRoutes(originPath.concat([{
        path: '*',
        redirect: '/404'
      }]));
    },

    signin: function(callback) {
      let vm = this;
      // 设置请求头统一携带token
      // instance.defaults.headers.common['Authorization'] = 'Bearer ' + localUser.token;
      // 获取用户信息及权限数据
      instance.get(`/api/system/getUpsList`).then((res) => {
        let data = res.data;
        if (data.result === false) {
          vm.$message.error('获取权限异常！');
          return;
        }
        let menuList = data.data.menuDataVos;
        // 取得资源权限对象
         let resourcePermission = vm.getPermission(menuList);
        // 使用资源权限设置请求拦截
        // vm.setInterceptor(resourcePermission);
        // 获得实际路由
        let allowedRouter = vm.getRoutes(menuList);
        console.log("allowedRouter => ", allowedRouter);
        // 若无可用路由限制访问
        if (!allowedRouter || !allowedRouter.length) {
          util.session('token','');
          return document.body.innerHTML = ('<h1>账号访问受限，请联系系统管理员！</h1>');
        }
        // 动态注入路由
        vm.extendRoutes(allowedRouter);
        // 保存数据用作他处，非必需
        vm.menuData = allowedRouter;
        vm.userData = data.data.employeeEntity;
        // 权限检验方法
        Vue.prototype.$_has = function(rArray) {
          let resources = [];
          let permission = true;
          // 提取权限数组
          if (Array.isArray(rArray)) {
            rArray.forEach(function(e) {
              resources = resources.concat(e.p);
            });
          } else {
            resources = resources.concat(rArray.p);
          }
          // 校验权限
          resources.forEach(function(p) {
            if (!resourcePermission[p]) {
              return permission = false;
            }
          });
          return permission;
        }
        // 执行回调
        typeof callback === 'function' && callback();
      }).catch(util.catchError);
    },

    test: function() {
      window.location.href="http://localhost:9999/api/system/getUpsList"
    },

    // 登录
    loginDirect: function(newPath){
      this.signin(() => {
        this.$router.replace({path: newPath || '/'});
      });
    },

    // 退出
    logoutDirect: function(){
      // 清除session
      util.session('token','');
      // 清除请求权限控制
      instance.interceptors.request.eject(myInterceptor);
      // 清除菜单权限
      this.$root.hashMenus = {};
      // 清除请求头token
      instance.defaults.headers.common['Authorization'] = '';
      // 回到登录页
      this.$router.replace({path: '/'});
    }
  },
  created: function(newPath) {
    this.test();
  }
}
</script>

<style>
  @import './assets/common.css';
</style>

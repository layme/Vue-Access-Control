<template>
  <div class="g-body">
    <el-row type="flex" class="g-head">
      <!--<img src="../assets/images/logo3.png" class="logo-img">-->
      <span class="logo" icon="el-icon-menu">ZINN Management System</span>
      <div class="nav">
        <div class="usermenu" v-if="user.empCode">
          <el-tooltip content="点击切换简易版和全功能版页面" placement="bottom" effect="light">
            <el-button :type="this.btnType" :isEasy="isEasy" circle style="margin-right: 35px" @click="easySwitch">{{ this.btnText }}</el-button>
          </el-tooltip>
          欢迎您：{{user.empName}}
          <router-link :to="{path: '/'}"><i class="el-icon-location"></i>首页</router-link>
          <a href="javascript:;" @click="logout"><i class="el-icon-circle-close"></i>退出</a>
        </div>
      </div>
    </el-row>

    <el-menu :default-active="activeMenu" class="g-side" router unique-opened>
      <template v-for="(route, index) in menus">
        <template v-if="route.children">
          <el-submenu :key="index" :index="route.name">
            <template slot="title">
              <i :class="route.meta.icon"></i>
              {{route.name}}
            </template>
            <el-menu-item v-for="(cRoute, cIndex) in route.children" :key="cIndex" :index="cRoute.name" :route="cRoute">
              <i :class="cRoute.meta.icon"></i>{{cRoute.name}}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :route="route" :index="route.name">{{route.name}}</el-menu-item>
        </template>
      </template>
    </el-menu>
    <div class="about">
      <span>@自如驿 V3.0.0</span>
    </div>
    <div class="g-statues-bar p-lr">
      <el-breadcrumb separator="/" class="bread" id="mybread">
        <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="item">
          {{ item.meta.name || item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <template v-if="$route.path=='/'">
        <dashboard id="main"/>
      </template>
      <template v-else>
        <router-view id="main"></router-view>
      </template>
    </el-card>

  </div>
</template>
<script>
  import instance from "../api";
  import {changePw} from "../api/account";

  export default {
    components: {
      dashboard: () => import("../components/dashboard.vue")
    },
    data() {
      return {
        user: {},
        menus: [],
        isEasy: true,
        btnText: '简',
        btnType: 'success'
      };
    },
    computed: {
      activeMenu: function () {
        return this.$route.name
      },
      breadcrumbs: function () {
        return (this.$route && this.$route.matched) || []
      }
    },
    methods: {
      logout: function () {
        this.$confirm("确定退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        })
          .then(() => {
            this.$emit("logout");
          })
          .catch(() => {
          });
      },
      easySwitch: function () {
        let vm = this;
        vm.isEasy = !vm.isEasy;
        if (vm.isEasy) {
          vm.btnText = '简';
          vm.btnType = "success";
          vm.$emit('login', vm.isEasy);
        } else {
          vm.btnText = '全';
          vm.btnType = "primary";
          vm.$emit('login', vm.isEasy);
        }
      }
    },
    created: function () {
      let user = this.$parent.userData;
      if (user) {
        this.user = user;
      } else {
        this.$router.push({path: "/"});
      }
      let menus = this.$parent.menuData;
      if (menus) {
        this.menus = menus;
      }
    }
  };
</script>

<style scoped>
  .g-body {
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 100%;
    padding: 110px 20px 0 270px;
    background-color: #eeeeee;
  }

  .g-statues-bar {
    position: fixed;
    z-index: 90;
    top: 65px;
    left: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: auto;
    height: 40px;
    margin-left: 250px;
    background: #fff;
  }

  .g-statues-bar .bread {
    line-height: 40px;
    background-color: #eeeeee;
  }

  .g-side {
    position: fixed;
    z-index: 90;
    top: 0;
    left: 0;
    bottom: 30px;
    box-sizing: border-box;
    width: 230px;
    padding-top: 60px;
    /*border-right: 1px solid #dedede;*/
    overflow-y: auto;
  }

  .g-head {
    position: fixed;
    z-index: 91;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #409EFF;
  }

  .logo {
    float: left;
    text-align: center;
    width: 400px;
    font-size: 1.6em;
    text-decoration: none;
    color: #fff;
  }

  .nav {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }

  .usermenu {
    float: right;
    padding: 0 2em;
    color: #fff;
  }

  .usermenu a {
    text-decoration: none;
    margin: 0 0.2em 0 1em;
    color: inherit;
  }

  #main {
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #ffffff;
    position: fixed;
    z-index: 90;
    padding: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 250px;
    left: 0;
    top: 105px;
    right: 20px;
    bottom: 20px;
  }

  .logo-img {
    height: 50px;
    margin-left: 15px;
    margin-top: 5px;
  }

  .about {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 30px;
    width: 213px;
    z-index: 91;
    padding-left: 15px;
    text-align: left;
    background-color: #ffffff;
    color: #8c939d;
    border-top: #eeeeee solid 1px;
  }
</style>

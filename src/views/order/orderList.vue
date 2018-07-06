<template>
  <div v-loading="loading">
    <el-row>
      <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
    </el-row>
    <!-- list -->
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="orderNumber" label="订单号"></el-table-column>
      <el-table-column prop="otaOrderNumber" label="OTA订单号"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
      <el-table-column prop="projectName" label="项目"></el-table-column>
      <el-table-column prop="name" label="预订人"></el-table-column>
      <el-table-column prop="phone" label="预定手机号"></el-table-column>
      <el-table-column prop="bedCount" label="入住人数"></el-table-column>
      <el-table-column prop="bedNights" label="间夜数"></el-table-column>
      <el-table-column prop="startDate" label="入住时间"></el-table-column>
      <el-table-column prop="endDate" label="退房时间"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="amountNoCoupon" label="金额"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import instance from '../../api/index';

  export default {
    data() {
      return {
        list: [],
        loading: false,
        canReset: false,
        pageInfo: {
          pageSize: 10,
          pageIndex: 2
        }
      };
    },
    methods: {
      fetchData: function() {
        let vm = this;
        vm.loading = true;
        instance.post('/v1/getOrderList', vm.pageInfo).then(res => {
          vm.list = res.data.data.rows;
          vm.loading = false;
        });
      }
    },
    created() {
      this.fetchData();
    }
  };
</script>

<style scoped>

</style>

<template>
  <div v-loading="loading" text="拼命加载中">
    <el-row>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <!-- list -->
    <el-table :data="list" stripe style="width: 100%" height="528">
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
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page=this.pageDto.pageIndex
        :page-sizes="[10, 20, 30, 40]"
        :page-size=this.pageDto.pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total=this.total>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import instance from '../../api/index';
  import * as util from '../../assets/util.js';

  export default {
    data() {
      return {
        list: [],
        loading: false,
        canReset: false,
        pageDto: {
          pageSize: 10,
          pageIndex: 1
        },
        total: 0,
        formInline: {
          user: '',
          region: ''
        }
      };
    },
    methods: {
      fetchData: function() {
        let vm = this;
        vm.loading = true;
        instance.post('/v1/getOrderList', vm.pageDto).then(res => {
          vm.list = res.data.data.rows;
          vm.total = res.data.data.total;
        }).catch(util.catchError);
        vm.loading = false;
      },
      handleSizeChange(val) {
        this.pageDto.pageSize = val;
        this.fetchData();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageDto.pageIndex = val;
        this.fetchData();
        console.log(`当前页: ${val}`);
      }
    },
    created() {
      this.fetchData();
    }
  };
</script>

<style scoped>
  .block {
    margin-top: 25px;
    text-align: right;
  }
</style>

<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <!--表单-->
    <el-form :model="orderListForm" :label-position="position" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="订单号">
            <el-input v-model.trim="orderListForm.orderNumber" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单状态">
            <el-select v-model="orderListForm.orderStatus" placeholder="请选择">
              <el-option
                v-for="item in orderStatusEnum"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单来源">
            <el-select v-model="orderListForm.firstChannel" placeholder="请选择">
              <el-option
                v-for="item in firstChannelEnum"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否分配床位">
            <el-select v-model="orderListForm.isDistribution" placeholder="请选择">
              <el-option
                v-for="item in isDistributionEnum"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" v-if="!this.easy">
        <el-col :span="6">
          <el-form-item label="预定人手机号">
            <el-input v-model.trim="orderListForm.phone" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预定人姓名">
            <el-input v-model.trim="orderListForm.name" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="入住人证件号">
            <el-input v-model.trim="orderListForm.credentialNumber" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="入住人姓名">
            <el-input v-model.trim="orderListForm.checkInUserName" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="创建日期">
            <el-date-picker class="date-picker" @change="onDataPickerChange1"
                            v-model="orderListForm.createTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="入住日期">
            <el-date-picker class="date-picker" @change="onDataPickerChange2"
                            v-model="orderListForm.checkInTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="退房日期">
            <el-date-picker class="date-picker" @change="onDataPickerChange3"
                            v-model="orderListForm.checkOutTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="OTA订单号">
            <el-input v-model.trim="orderListForm.otaOrderNumber" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="medium" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>

    <!--表格-->
    <el-table :data="list" stripe style="width: 100%" height="440" size="small" >
      <el-table-column prop="orderNumber" label="订单号"></el-table-column>
      <el-table-column prop="otaOrderNumber" label="OTA订单号"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
      <el-table-column prop="projectName" label="项目"></el-table-column>
      <el-table-column prop="name" label="预订人"></el-table-column>
      <el-table-column prop="phone" label="预定手机号"></el-table-column>
      <el-table-column prop="bedCount" label="入住人数"></el-table-column>
      <el-table-column prop="bedNights" label="间夜数"></el-table-column>
      <el-table-column prop="startDate" label="入住时间" :formatter="format"></el-table-column>
      <el-table-column prop="endDate" label="退房时间" :formatter="format"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" :formatter="format"></el-table-column>
      <el-table-column prop="amountNoCoupon" label="金额"></el-table-column>
    </el-table>

    <!--分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page=this.orderListForm.pageIndex
        :page-sizes="[10, 20, 30, 40]"
        :page-size=this.orderListForm.pageSize
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
        loading: false,
        position: 'right',
        easy: true,
        list: [],
        total: 0,
        orderListForm: {
          pageSize: 10,
          pageIndex: 1,
          orderNumber: '',
          orderStatus: '',
          firstChannel: '',
          createTime: [],
          createStartTime: '',
          createEndTime: '',
          checkInTime: [],
          checkInStartTime: '',
          checkInEndTime: '',
          checkOutTime: [],
          checkOutStartTime: '',
          checkOutEndTime: '',
          isDistribution: '',
          phone: '',
          name: '',
          credentialNumber: '',
          checkInUserName: '',
          otaOrderNumber: ''
        },
        orderStatusEnum: [{
          value: '1',
          label: '已支付'
        }, {
          value: '2',
          label: '已入住'
        }, {
          value: '3',
          label: '退款申请中'
        }, {
          value: '4',
          label: '已退款'
        }, {
          value: '5',
          label: '待支付'
        }, {
          value: '6',
          label: '已退房'
        }, {
          value: '7',
          label: '已取消'
        }, {
          value: '8',
          label: '已支付取消'
        }, {
          value: '9',
          label: '未入住取消'
        }, {
          value: '10',
          label: '未入住退'
        }, {
          value: '11',
          label: '已退订'
        }],
        firstChannelEnum: [{
          value: '0',
          label: '自如APP'
        }, {
          value: '1',
          label: 'WALK IN'
        }, {
          value: '2',
          label: 'OTA订单'
        }],
        isDistributionEnum: [{
          value: '1',
          label: '未分配床位'
        }, {
          value: '2',
          label: '已分配床位'
        }]
      };
    },
    methods: {
      fetchData() {
        let vm = this;
        vm.loading = true;
        instance.post('/api/order/getOrderList', vm.orderListForm).then(res => {
          vm.list = res.data.data.rows;
          vm.total = res.data.data.total;
        }).catch(util.catchError);
        vm.loading = false;
      },
      handleSizeChange(val) {
        this.orderListForm.pageSize = val;
        this.fetchData();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.orderListForm.pageIndex = val;
        this.fetchData();
        console.log(`当前页: ${val}`);
      },
      format(row, column) {
        return util.tableDateFormat(row, column);
      },
      onDataPickerChange1(val) {
        console.log("val => ", val);
        this.orderListForm.createStartTime = val[0];
        this.orderListForm.createEndTime = val[1];
      },
      onDataPickerChange2(val) {
        this.orderListForm.checkInStartTime = val[0];
        this.orderListForm.checkInEndTime = val[1];
      },
      onDataPickerChange3(val) {
        this.orderListForm.checkOutStartTime = val[0];
        this.orderListForm.checkOutEndTime = val[1];
      },
      setIsEasy(val) {
        console.log("isEasy => ", this.isEasy);
        this.easy = val;
      }
    },
    created() {
      this.fetchData();
      console.log("isEasy => ", this.isEasy);
    }
  };
</script>

<style scoped>
  .block {
    margin-top: 15px;
    text-align: right;
  }

  .date-picker {
    width: auto;
  }

  .el-select {
    width: 100%;
  }
</style>

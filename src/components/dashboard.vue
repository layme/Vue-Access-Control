<template>
  <el-row>
    <el-col :span="6">
      <el-button size="small" icon="chuang" @click="handleAdd" style="padding:6px 4px;width: 90px">
        新增群组1
      </el-button>
      <el-button size="small" class="ele-icon-chuang" @click="handleAdd" style="padding:6px 4px;width: 90px">
        新增群组2
      </el-button>
      <dashboard-goods v-if="$_has([goods.request])" />
    </el-col>
  </el-row>
</template>

<script>
import * as goods from '../api/goods';

let myMixin = {
  data: function() {
    return { goods }
  }
}

export default {
  mixins: [myMixin],
  data() {
    return {

    }
  },
  components:{
    'dashboard-goods':  () => import('../components/dashboard-goods.vue')
  },
  methods: {

  },
  created() {

  }
};
</script>

<style scoped>

</style>

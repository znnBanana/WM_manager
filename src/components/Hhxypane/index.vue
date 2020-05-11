<template>
  <div class="hhxy_pane">
    <!-- 表格 -->
    <div v-if="data.length > 0">
      <div>
          <!-- {{props}} -->
        <el-table size="small" :data="data"  v-loading="loading">
          <el-table-column type="expand" >
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="顾客姓名"><span>{{ props.row.customer_realname }}</span></el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="员工姓名"><span>{{ props.row.waiter_realname }}</span></el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="顾客联系方式"><span>{{ props.row.customer_telephone }}</span></el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="员工联系方式"><span>{{ props.row.waiter_telephone }}</span></el-form-item>
                      </el-col>
                    </el-row>
                </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单编号" prop="id"></el-table-column>
          <el-table-column label="下单时间" prop="orderTime"></el-table-column>
          <el-table-column label="支付金额" prop="total"></el-table-column>
          <el-table-column label="员工" prop="waiter_realname"></el-table-column>
          <el-table-column label="顾客" prop="customer_realname"></el-table-column>
          <!-- <el-table-column label="顾客地址" prop="addressId" width="300">
              <template slot-scope="scope">
                  {{scope.row.province}}
                  {{scope.row.city}}
                  {{scope.row.area}}
                  {{scope.row.address}}
              </template>
          </el-table-column> -->
          <el-table-column label="状态" prop="status" width="100px" >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="statusHandler(scope.row)">{{scope.row.status}}</el-button>
            </template>
          </el-table-column>
      </el-table>
      </div>
    </div>    
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  // 期待接受的参数
  props:['data'],
  computed:{
    visible:{
      get(){
        // alert(this.OrderData);
        return this.data;
      },
      set(val){
        this.$emit('on-change-visible',val)
      }
    }
  }
}
</script>
<style scoped>

</style>

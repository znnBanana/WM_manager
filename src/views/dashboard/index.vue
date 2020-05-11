<template>
  <div class="dashboard-container">
    <div class="imgage">
      <img src="http://jgz.app.todayguizhou.com/data/upload/image/20180315/20180315100137_73501.gif" alt="">
    </div>
    <div class="dashboard-text"><i class="iconfont icon-waimai2" style="font-size:30px;color:#52C48F"></i> 飞毛腿 外卖订餐</div>
    <div style="margin-top:3em">
      <div class="block">
        <!-- <span class="demonstration">Click 指示器触发</span> -->
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item >
            <img src="../../assets/images/1index.jpeg" alt="">
          </el-carousel-item>
          <el-carousel-item >
            <img src="../../assets/images/2index.jpeg" alt="">
          </el-carousel-item>
          <el-carousel-item >
            <img src="../../assets/images/3index.jpeg" alt="">
          </el-carousel-item>
          <el-carousel-item >
            <img src="../../assets/images/4index.jpeg" alt="">
          </el-carousel-item>
          <el-carousel-item >
            <img src="../../assets/images/5index.jpg" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: '飞毛腿外卖订餐',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-text {
  font-family: STXingkai;
  font-size: 40px;
  color: #304156;
}
.imgage {
  float: right;
  padding: 0;
  width: 400px;
  height: 400px;
}
</style>

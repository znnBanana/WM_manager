<template>
    <div class="customer">
        <!-- 按钮 -->
        <el-button size="small" type="primary" plain icon="el-icon-caret-left" @click="BackHandler">返回</el-button>
        <!-- /按钮 -->
        <!-- 标签页 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- 基本信息 -->
            <!-- {{($route.querBy)}} -->
            <el-tab-pane label="基本信息" name="first">
                <el-card class="box-card">
                    <div class="waiter_info">
                        <div>
                            <img class="info_img" :src="url" alt="">
                        </div>
                        <div>姓名：{{($route.query).username}}</div>
                    </div>
                    <div>默认地址：{{($route.query).province}} {{($route.query).city}} {{($route.query).area}}</div>
                    <div>注册时间：{{($route.query).registerTime | dateFormat}}</div>
                    <div>最后一次登录时间：{{($route.query).lastLoginTime | dateFormat}}</div>
                </el-card>
            </el-tab-pane>
            <!-- /基本信息 -->
            <!-- 订单信息 -->
            <el-tab-pane label="顾客订单" name="second">
                <el-tabs type="border-card">
                <!-- {{orderList}} -->
                    <el-tab-pane label="全部订单">
                        <el-table :data="ordercList" style="width: 100% !important" size="small">
                            <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
                            <el-table-column prop="orderTime" label="下单时间" align="center"></el-table-column>
                            <el-table-column prop="customerId" label="顾客" align="center"></el-table-column>
                            <el-table-column prop="waiterId" label="服务员" align="center"></el-table-column>
                            <el-table-column prop="addressId" label="地址" align="center"></el-table-column>
                            <el-table-column prop="status" label="状态" align="center"></el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <el-pagination
                            style="float:right;margin: .8em 0"
                            :total="orderc.total"
                            :page-size="orderc.pageSize"
                            @current-change="pageChange"
                            background
                            layout="total, prev, pager, next">
                        </el-pagination>
                        <!-- /分页 -->
                    </el-tab-pane>
                    <el-tab-pane label="待支付">
                        <el-table :data="ordersFilter('待支付')" style="width: 100% !important" size="small">
                            <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
                            <el-table-column prop="orderTime" label="下单时间" align="center"></el-table-column>
                            <el-table-column prop="customerId" label="顾客" align="center"></el-table-column>
                            <el-table-column prop="waiterId" label="服务员" align="center"></el-table-column>
                            <el-table-column prop="addressId" label="地址" align="center"></el-table-column>
                            <el-table-column prop="status" label="状态" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="待接单">
                        <el-table :data="ordersFilter('待接单')" style="width: 100% !important" size="small">
                            <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
                            <el-table-column prop="orderTime" label="下单时间" align="center"></el-table-column>
                            <el-table-column prop="customerId" label="顾客" align="center"></el-table-column>
                            <el-table-column prop="waiterId" label="服务员" align="center"></el-table-column>
                            <el-table-column prop="addressId" label="地址" align="center"></el-table-column>
                            <el-table-column prop="status" label="状态" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="待派单">
                        <el-table :data="ordersFilter('待派单')" style="width: 100% !important" size="small">
                            <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
                            <el-table-column prop="orderTime" label="下单时间" align="center"></el-table-column>
                            <el-table-column prop="customerId" label="顾客" align="center"></el-table-column>
                            <el-table-column prop="waiterId" label="服务员" align="center"></el-table-column>
                            <el-table-column prop="addressId" label="地址" align="center"></el-table-column>
                            <el-table-column prop="status" label="状态" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="待确认">
                        <el-table :data="ordersFilter('待确认')" style="width: 100% !important" size="small">
                            <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
                            <el-table-column prop="orderTime" label="下单时间" align="center"></el-table-column>
                            <el-table-column prop="customerId" label="顾客" align="center"></el-table-column>
                            <el-table-column prop="waiterId" label="服务员" align="center"></el-table-column>
                            <el-table-column prop="addressId" label="地址" align="center"></el-table-column>
                            <el-table-column prop="status" label="状态" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="已完成">
                        <el-table :data="ordersFilter('已完成')" style="width: 100% !important" size="small">
                            <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
                            <el-table-column prop="orderTime" label="下单时间" align="center"></el-table-column>
                            <el-table-column prop="customerId" label="顾客" align="center"></el-table-column>
                            <el-table-column prop="waiterId" label="服务员" align="center"></el-table-column>
                            <el-table-column prop="addressId" label="地址" align="center"></el-table-column>
                            <el-table-column prop="status" label="状态" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <!-- /订单信息 -->
            <!-- 地址列表 -->
            <el-tab-pane label="地址列表" name="third">
                <!-- {{address_c}} -->
                <el-table :data="address_c" size="small" :show-header="false">
                    <el-table-column prop="id" type="index" width="100" align="center"></el-table-column>
                    <el-table-column prop="addrecc" label="地址" align="center" width="300px">
                        <template slot-scope="scope">
                        <!-- 湖南省怀化市鹤城区坨院街道 -->
                        {{scope.row.province}}
                        {{scope.row.city}}
                        {{scope.row.area}}
                        {{scope.row.address}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <!-- /地址列表 -->
        </el-tabs>
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
    data() {
        return {
            url: this.$route.query.imgPhoto,
            activeName: 'first',
        }
    },
    computed: {
        ...mapState('customer',['customer_ById']),
        ...mapState('order',['orderc','ordercList']),
        ...mapState('address',['address_c']),
        ...mapGetters('order',['ordersFilter'])
    },
    created() {
        // this.findCustomerById(this.$route.query.id)
        // 调用根据顾客id分页查询订单
        this.params = {
            page:0,
            pageSize:10,
            customerId:this.$route.query.id
        }
        this.findOrdersBycus(this.params)  
        // 根据顾客id查询顾客地址
        this.findAddressesByCus(this.$route.query.id)
    },
    methods: {
        ...mapActions('customer',['findCustomerById']),
        ...mapActions('order',['findOrdersBycus']),
        ...mapActions('address',['findAddressesByCus']),
        handleClick(){

        },
        // 页码改变
        pageChange(page){
            this.params.page = page - 1
            this.findOrdersBycus(this.params) 
        },
        // 返回顾客列表
        BackHandler(){
            this.$router.push({path:'/customer/list'})
        }
    }
}
</script>

<style scoped>
    .box-card div {
        margin: 1em;
    }
    .box-card {
        margin: .5em;
        width: 480px;
    }
    .waiter_info {
        width: 400px;
        text-align: center;
    }
    .info_img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin: 1em;
    }
</style>
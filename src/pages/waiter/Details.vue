<template>
    <div class="customer">
        <!-- 按钮 -->
        <el-button size="small" type="primary" plain icon="el-icon-caret-left" @click="BackHandler">返回</el-button>
        <!-- /按钮 -->
        <!-- 标签页 -->
        <!-- {{$route.query}} -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- 基本信息 -->
            <el-tab-pane label="基本信息" name="first">
                <el-card class="box-card">
                    <div class="waiter_info">
                        <div>
                            <img class="info_img" :src="url" alt="">
                        </div>
                        <div>会员名：{{($route.query).username}}</div>
                        <div>真实姓名：{{($route.query).realname}}</div>
                    </div>
                    <div>身份证号：{{($route.query).idCard}}</div>
                    <div>银行卡号：{{($route.query).bankCard}}</div>
                    <div>注册时间：{{($route.query).registerTime | dateFormat}}</div>
                    <div>最后一次登录时间：{{($route.query).lastLoginTime | dateFormat}}</div>
                </el-card>
            </el-tab-pane>
            <!-- /基本信息 -->
            <!-- 订单信息 -->
            <el-tab-pane label="员工订单" name="second">
                <el-tabs type="border-card">
                    <el-tab-pane label="全部订单">
                        <!-- {{orderw[1]}} -->
                        <el-table :data="orderw" style="width: 100%" size="small">
                            <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
                            <el-table-column prop="orderTime" label="下单时间" align="center" :formatter="dateFormat"></el-table-column>
                            <el-table-column prop="total" label="下单金额" align="center"></el-table-column>
                            <el-table-column prop="customer.username" label="顾客" align="center"></el-table-column>
                            <el-table-column prop="addressId" label="服务地址" width="200px" align="center">
                                <template>
                                    <div slot-scope="scope">
                                        {{scope.row.addressId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态" align="center"></el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <!-- <el-pagination
                            style="float:right;margin: .8em 0"
                            :total="orderw.total"
                            :page-size="orderw.pageSize"
                            @current-change="pageChange"
                            background
                            layout="total, prev, pager, next">
                        </el-pagination> -->
                        <!-- /分页 -->
                    </el-tab-pane>
                    <el-tab-pane label="待接单">
                        <el-table :data="ordersFilterw('待接单')" style="width: 100%" size="small">
                            <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
                            <el-table-column prop="orderTime" label="下单时间" align="center" :formatter="dateFormat"></el-table-column>
                            <el-table-column prop="total" label="下单金额" align="center"></el-table-column>
                            <el-table-column prop="customer.username" label="顾客" align="center"></el-table-column>
                            <el-table-column prop="addressId" label="服务地址" width="200px" align="center">
                                <template>
                                    <div slot-scope="scope">
                                        {{scope.row.addressId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="待服务">
                        <el-table :data="ordersFilterw('待服务')" style="width: 100%" size="small">
                            <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
                            <el-table-column prop="orderTime" label="下单时间" align="center" :formatter="dateFormat"></el-table-column>
                            <el-table-column prop="total" label="下单金额" align="center"></el-table-column>
                            <el-table-column prop="customer.username" label="顾客" align="center"></el-table-column>
                            <el-table-column prop="addressId" label="服务地址" width="200px" align="center">
                                <template>
                                    <div slot-scope="scope">
                                        {{scope.row.addressId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="待确认">
                        <el-table :data="ordersFilterw('待确认')" style="width: 100%" size="small">
                            <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
                            <el-table-column prop="orderTime" label="下单时间" align="center" :formatter="dateFormat"></el-table-column>
                            <el-table-column prop="total" label="下单金额" align="center"></el-table-column>
                            <el-table-column prop="customer.username" label="顾客" align="center"></el-table-column>
                            <el-table-column prop="addressId" label="服务地址" width="200px" align="center">
                                <template>
                                    <div slot-scope="scope">
                                        {{scope.row.addressId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="已完成">
                        <el-table :data="ordersFilterw('已完成')" style="width: 100%" size="small">
                            <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
                            <el-table-column prop="orderTime" label="下单时间" align="center" :formatter="dateFormat"></el-table-column>
                            <el-table-column prop="total" label="下单金额" align="center"></el-table-column>
                            <el-table-column prop="customer.username" label="顾客" align="center"></el-table-column>
                            <el-table-column prop="addressId" label="服务地址" width="200px" align="center">
                                <template>
                                    <div slot-scope="scope">
                                        {{scope.row.addressId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <!-- /订单信息 -->

            <!-- 收益信息 -->
            <el-tab-pane label="收益信息" name="third">
                <!-- {{incomes}} -->
                <el-table :data="incomes.list" style="width: 100%" size="small">
                    <el-table-column prop="id" label="收益编号" width="80" align="center"></el-table-column>
                    <el-table-column prop="money" label="收益金额" align="center"></el-table-column>
                    <el-table-column prop="transactionTime" label="收益时间" align="center" :formatter="dateFormat"></el-table-column>
                    <!-- <el-table-column prop="customer_realname" label="顾客" align="center">
                        <template slot-scope="scope">
                            {{scope.row.customer_realname}}
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="description" label="描述" width="300" align="center"></el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    style="float:right;margin: .8em 0"
                    :total="incomes.total"
                    :page-size="incomes.pageSize"
                    @current-change="pageChange"
                    background
                    layout="total, prev, pager, next">
                </el-pagination>
                <!-- /分页 -->
            </el-tab-pane>
            <!-- /收益信息 -->
            
        </el-tabs>
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import moment from 'moment'

export default {
    data() {
        return {
            url: this.$route.query.imgPhoto,
            activeName: 'first',
            params: {
                page: 0,
                pageSize: 8
            },
            
        }
    },
    computed: {
        ...mapState('waiter',['incomes']),
        ...mapState('order',['orderw','orderwList']),
        ...mapGetters('order',['ordersFilterw'])
    },
    created() {
        // 调用员工收益
        this.waiterIncome(this.params)
        this.param = {
            waiterId: this.$route.query.id
        }
        this.queryOrdersByWai(this.param)
    },
    methods: {
        ...mapActions('waiter',['waiterIncome']),
        ...mapActions('order',['queryOrdersByWai']),
        // 页码改变
        pageChange(page){
            this.params.page = page - 1
            this.waiterIncome(this.params)
        },
        // 时间戳转换
        dateFormat(row,colnum){
            return moment(row[colnum.property]).format('YYYY-MM-DD HH:MM:SS')
        },

        handleClick(){

        },
        // 返回顾客列表
        BackHandler(){
            this.$router.push({path:'/waiter/list'})
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
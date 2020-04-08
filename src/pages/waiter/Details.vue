<template>
    <div class="customer">
        <!-- 按钮 -->
        <el-button size="small" type="primary" plain icon="el-icon-caret-left" @click="BackHandler">返回</el-button>
        <!-- /按钮 -->
        <!-- 标签页 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- 基本信息 -->
            <el-tab-pane label="基本信息" name="first">
                <el-card class="box-card">
                    <div class="waiter_info">
                        <div>
                            <img class="info_img" src="../../assets/images/header.png" alt="">
                        </div>
                        <div>会员名：waiter1</div>
                        <div>真实姓名：李一</div>
                    </div>
                    <div>身份证号：</div>
                    <div>银行卡号：</div>
                    <div>注册时间：2020-01-02</div>
                    <div>最后一次登录时间：2020-01-02</div>
                </el-card>
            </el-tab-pane>
            <!-- /基本信息 -->
            <!-- 订单信息 -->
            <el-tab-pane label="员工订单" name="second">
                <el-tabs type="border-card">
                    <el-tab-pane label="全部订单">
                        <el-table :data="orders" style="width: 100%" size="small">
                            <el-table-column prop="id" label="订单编号" width="100" align="center"></el-table-column>
                            <el-table-column prop="orderTime" label="下单时间" align="center"></el-table-column>
                            <el-table-column prop="customerId" label="顾客" align="center"></el-table-column>
                            <el-table-column prop="waiterId" label="服务员" align="center"></el-table-column>
                            <el-table-column prop="addressId" label="地址" align="center"></el-table-column>
                            <el-table-column prop="status" label="状态" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="待接单">待接单</el-tab-pane>
                    <el-tab-pane label="待服务">待服务</el-tab-pane>
                    <el-tab-pane label="待确认">待确认</el-tab-pane>
                    <el-tab-pane label="已完成">已完成</el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <!-- /订单信息 -->
            <!-- 收益信息 -->
            <el-tab-pane label="收益信息" name="third">
                <el-table :data="incomes" style="width: 100%" size="small">
                    <el-table-column prop="id" label="收益编号" width="80" align="center"></el-table-column>
                    <el-table-column prop="money" label="收益金额" align="center"></el-table-column>
                    <el-table-column prop="transactionTime" label="收益时间" align="center"></el-table-column>
                    <el-table-column prop="userId" label="顾客" align="center">
                        <template slot-scope="scope">
                            customer1
                            {{scope.row.name}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" label="描述" width="300" align="center"></el-table-column>
                </el-table>
            </el-tab-pane>
            <!-- /收益信息 -->
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'first',
            orders: [{
                id: '1',
                orderTime: '2020-01-01',
                customerId: '顾客1',
                waiterId: 'waiter1',
                addressId: '湖南省怀化市鹤城区坨院街道',
                status: '已完成'
            }],
            addresses: [{
                id: '1',
                addres: '湖南省怀化市鹤城区坨院街道'
            },
            {
                id: '2',
                addres: '湖南省怀化市鹤城区坨院街道'
            }],
            incomes: [{
                id: '1',
                money: '120',
                transactionTime: '2020-02-01',
                userId: 'customerId',
                description: '送餐快'
            }]
        }
    },
    computed: {

    },
    created() {

    },
    methods: {
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
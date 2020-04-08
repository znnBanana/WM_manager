<template>
    <div class="order">
        <!-- 标签页 -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <!-- {{orders}} -->
            <el-tab-pane label="全部订单" name="first">
                <!-- 全部订单列表 -->
                <Hhxypane :data="ordersList" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane>
                <!-- <el-table size="small" :data="ordersList"  v-loading="loading">
                    <el-table-column type="expand" >
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-row>
                                <el-col :span="12">
                                    <el-form-item label="顾客编号"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="员工编号"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-col :span="12">
                                    <el-form-item label="顾客姓名"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="员工姓名"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-col :span="12">
                                    <el-form-item label="顾客联系方式"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="员工联系方式"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                </el-row>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单编号" prop="id"></el-table-column>
                    <el-table-column label="下单时间" prop="orderTime"></el-table-column>
                    <el-table-column label="支付金额" prop="total"></el-table-column>
                    <el-table-column label="员工" prop="waiterId"></el-table-column>
                    <el-table-column label="顾客" prop="customerId"></el-table-column>
                    <el-table-column label="顾客地址" prop="addressId" width="300">
                        <template slot-scope="scope">
                            湖南省怀化市鹤城区坨院街道
                            {{scope.row.province}}
                            {{scope.row.city}}
                            {{scope.row.area}}
                            {{scope.row.address}}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" prop="status" width="100px" >
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="statusHandler(scope.row)">{{scope.row.status}}</el-button>
                        </template>
                    </el-table-column>
                </el-table> -->
                <!-- 分页 -->
                <el-pagination
                    style="float:right;margin: .8em 0"
                    :total="orders.total"
                    :page-size="orders.pageSize"
                    @current-change="pageChange"
                    background
                    layout="total, prev, pager, next">
                </el-pagination>
                <!-- /分页 -->
                <!-- /全部订单列表 -->
            </el-tab-pane>
            
            <el-tab-pane label="待支付">
                <!-- {{allOrders}} -->
                <!-- 待支付 -->
                <!-- <el-table size="small" :data="ordersStatusFilter('待支付')"  v-loading="loading">
                    <el-table-column type="expand" >
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-row>
                                <el-col :span="12">
                                    <el-form-item label="顾客编号"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="员工编号"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-col :span="12">
                                    <el-form-item label="顾客姓名"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="员工姓名"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-col :span="12">
                                    <el-form-item label="顾客联系方式"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="员工联系方式"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                </el-row>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单编号" prop="id"></el-table-column>
                    <el-table-column label="下单时间" prop="orderTime"></el-table-column>
                    <el-table-column label="支付金额" prop="total"></el-table-column>
                    <el-table-column label="员工" prop="waiterId"></el-table-column>
                    <el-table-column label="顾客" prop="customerId"></el-table-column>
                    <el-table-column label="顾客地址" prop="addressId" width="300">
                        <template slot-scope="scope">
                            湖南省怀化市鹤城区坨院街道
                            {{scope.row.province}}
                            {{scope.row.city}}
                            {{scope.row.area}}
                            {{scope.row.address}}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" prop="status" width="100px" >
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="statusHandler(scope.row)">{{scope.row.status}}</el-button>
                        </template>
                    </el-table-column>
                </el-table> -->
                <Hhxypane :data="ordersStatusFilter('待支付')" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane>
                <!-- /待支付 -->
            </el-tab-pane>

            <el-tab-pane label="待派单">
                <!-- 待派单 -->
                <!-- <el-table size="small" :data="ordersStatusFilter('待派单')"  v-loading="loading">
                    <el-table-column type="expand" >
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-row>
                                <el-col :span="12">
                                    <el-form-item label="顾客编号"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="员工编号"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-col :span="12">
                                    <el-form-item label="顾客姓名"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="员工姓名"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                </el-row>
                                <el-row>
                                <el-col :span="12">
                                    <el-form-item label="顾客联系方式"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="员工联系方式"><span>{{ props.row.name }}</span></el-form-item>
                                </el-col>
                                </el-row>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单编号" prop="id"></el-table-column>
                    <el-table-column label="下单时间" prop="orderTime"></el-table-column>
                    <el-table-column label="支付金额" prop="total"></el-table-column>
                    <el-table-column label="员工" prop="waiterId"></el-table-column>
                    <el-table-column label="顾客" prop="customerId"></el-table-column>
                    <el-table-column label="顾客地址" prop="addressId" width="300">
                        <template slot-scope="scope">
                            湖南省怀化市鹤城区坨院街道
                            {{scope.row.province}}
                            {{scope.row.city}}
                            {{scope.row.area}}
                            {{scope.row.address}}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" prop="status" width="100px" >
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="statusHandler(scope.row)">{{scope.row.status}}</el-button>
                        </template>
                    </el-table-column>
                </el-table> -->
                <Hhxypane :data="ordersStatusFilter('待派单')" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane>
                <!-- /待派单 -->
            </el-tab-pane>

            <el-tab-pane label="待接单">
                <!-- 待接单 -->
                <Hhxypane :data="ordersStatusFilter('待接单')" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane>
                <!-- /待接单 -->
            </el-tab-pane>

            <el-tab-pane label="待完成">
                <!-- 待完成 -->
                <Hhxypane :data="ordersStatusFilter('待完成')" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane>
                <!-- /待完成 -->
            </el-tab-pane>

            <el-tab-pane label="待确认">
                <!-- 待确认 -->
                <Hhxypane :data="ordersStatusFilter('待确认')" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane>
                <!-- /待确认 -->
            </el-tab-pane>

            <el-tab-pane label="已完成">
                <!-- 已完成 -->
                <Hhxypane :data="ordersStatusFilter('已完成')" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane>
                <!-- /已完成 -->
            </el-tab-pane>
            
        </el-tabs>
        <!-- /标签页 -->
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
    data() {
        return {
            visible: false,
            activeName: 'first',
            params: {
                page: 0,
                pageSize: 8
            }
        }
    },
    computed: {
        ...mapState('order',['orders','ordersList','allOrders']),
        ...mapGetters('order',['ordersStatusFilter'])
    },
    created() {
        this.findOrdersQuery(this.params)
        this.findAllOrders()
    },
    methods: {
        ...mapActions('order',['findOrdersQuery','findAllOrders']),
        handlerVisibleChange(val){
            this.visible = val;
        },
        pageChange(page){
            this.params.page = page - 1
            this.findOrdersQuery(this.params)
        },
        // 变换标签页
        handleClick(tab, event){
            console.log(tab, event)
        }
    }
}
</script>
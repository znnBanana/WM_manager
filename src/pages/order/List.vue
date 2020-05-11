<template>
    <div class="order">
        <!-- 标签页 -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <!-- {{orders}} -->
            <el-tab-pane label="全部订单" name="first">
                <!-- 全部订单列表 -->
                <!-- <Hhxypane :data="ordersList" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane> -->
                <el-table size="small" :data="ordersList" >
                    <el-table-column label="订单编号" width="120" prop="id" align="center"></el-table-column>
                    <el-table-column label="下单时间" prop="orderTime" align="center" :formatter="dateFormat"></el-table-column>
                    <el-table-column label="支付金额(/元)" align="center" prop="total"></el-table-column>
                    <!-- <el-table-column label="员工" prop="waiter_realname"></el-table-column> -->
                    <el-table-column label="顾客" prop="customer_realname" align="center"></el-table-column>
                    <el-table-column label="状态" prop="status" width="100px" align="center" >
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="statusHandler(scope.row)">{{scope.row.status}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
                <el-table size="small" :data="ordersStatusFilter('待支付')"  >
                    <el-table-column label="订单编号" width="120" prop="id" align="center"></el-table-column>
                    <el-table-column label="下单时间" prop="orderTime" align="center" :formatter="dateFormat"></el-table-column>
                    <el-table-column label="支付金额(/元)" align="center" prop="total"></el-table-column>
                    <!-- <el-table-column label="员工" prop="waiter_realname"></el-table-column> -->
                    <el-table-column label="顾客" prop="customer_realname" align="center"></el-table-column>
                    <el-table-column label="状态" prop="status" width="100px" align="center" >
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="statusHandler(scope.row)">{{scope.row.status}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <Hhxypane :data="ordersStatusFilter('待支付')" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane> -->
                <!-- /待支付 -->
            </el-tab-pane>

            <el-tab-pane label="待派单">
                <!-- 待派单 -->
                <el-table size="small" :data="ordersStatusFilter('待派单')" >
                    <el-table-column label="订单编号" width="120" prop="id" align="center"></el-table-column>
                    <el-table-column label="下单时间" prop="orderTime" align="center" :formatter="dateFormat"></el-table-column>
                    <el-table-column label="支付金额(/元)" align="center" prop="total"></el-table-column>
                    <!-- <el-table-column label="员工" prop="waiter_realname"></el-table-column> -->
                    <el-table-column label="顾客" prop="customer_realname" align="center"></el-table-column>
                    <el-table-column label="状态" prop="status" width="100px" align="center" >
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="statusHandler(scope.row)">{{scope.row.status}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                         <el-button type="text" size="small" @click="sendOrderHandler(scope.row.id)">派单</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <Hhxypane :data="ordersStatusFilter('待派单')" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane> -->
                <!-- /待派单 -->
            </el-tab-pane>

            <el-tab-pane label="待接单">
                <!-- 待接单 -->
                <el-table size="small" :data="ordersStatusFilter('待接单')">
                    <el-table-column label="订单编号" width="120" prop="id" align="center"></el-table-column>
                    <el-table-column label="下单时间" prop="orderTime" align="center" :formatter="dateFormat"></el-table-column>
                    <el-table-column label="支付金额(/元)" align="center" prop="total"></el-table-column>
                    <el-table-column label="员工" prop="waiter_realname"></el-table-column>
                    <el-table-column label="顾客" prop="customer_realname" align="center"></el-table-column>
                    <el-table-column label="状态" prop="status" width="100px" align="center" >
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="statusHandler(scope.row)">{{scope.row.status}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <Hhxypane :data="ordersStatusFilter('待接单')" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane> -->
                <!-- /待接单 -->
            </el-tab-pane>

            <el-tab-pane label="待完成">
                <!-- 待完成 -->
                <el-table size="small" :data="ordersStatusFilter('待完成')"  >
                    <el-table-column label="订单编号" width="120" prop="id" align="center"></el-table-column>
                    <el-table-column label="下单时间" prop="orderTime" align="center" :formatter="dateFormat"></el-table-column>
                    <el-table-column label="支付金额(/元)" align="center" prop="total"></el-table-column>
                    <el-table-column label="员工" prop="waiter_realname"></el-table-column>
                    <el-table-column label="顾客" prop="customer_realname" align="center"></el-table-column>
                    <el-table-column label="状态" prop="status" width="100px" align="center" >
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="statusHandler(scope.row)">{{scope.row.status}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <Hhxypane :data="ordersStatusFilter('待完成')" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane> -->
                <!-- /待完成 -->
            </el-tab-pane>

            <el-tab-pane label="待确认">
                <!-- 待确认 -->
                <el-table size="small" :data="ordersStatusFilter('待确认')" >
                    <el-table-column label="订单编号" width="120" prop="id" align="center"></el-table-column>
                    <el-table-column label="下单时间" prop="orderTime" align="center" :formatter="dateFormat"></el-table-column>
                    <el-table-column label="支付金额(/元)" align="center" prop="total"></el-table-column>
                    <el-table-column label="员工" prop="waiter_realname"></el-table-column>
                    <el-table-column label="顾客" prop="customer_realname" align="center"></el-table-column>
                    <el-table-column label="状态" prop="status" width="100px" align="center" >
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="statusHandler(scope.row)">{{scope.row.status}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <Hhxypane :data="ordersStatusFilter('待确认')" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane> -->
                <!-- /待确认 -->
            </el-tab-pane>

            <el-tab-pane label="已完成">
                <!-- 已完成 -->
                <el-table size="small" :data="ordersStatusFilter('已完成')">
                    <el-table-column label="订单编号" width="120" prop="id" align="center"></el-table-column>
                    <el-table-column label="下单时间" prop="orderTime" align="center" :formatter="dateFormat"></el-table-column>
                    <el-table-column label="支付金额(/元)" align="center" prop="total"></el-table-column>
                    <el-table-column label="员工" prop="waiter_realname"></el-table-column>
                    <el-table-column label="顾客" prop="customer_realname" align="center"></el-table-column>
                    <el-table-column label="状态" prop="status" width="100px" align="center" >
                        <template slot-scope="scope">
                        <el-button type="text" size="small" @click="statusHandler(scope.row)">{{scope.row.status}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <Hhxypane :data="ordersStatusFilter('已完成')" @on-change-visible="handlerVisibleChange" :drawerVisible="visible"></Hhxypane> -->
                <!-- /已完成 -->
            </el-tab-pane>
        </el-tabs>
        <!-- /标签页 -->

        <!-- 模态框 -->
        <el-dialog title="派单" :visible.sync="dialogFormVisible">
          <el-radio style="margin:.5em 1em" v-for="r in all_waiters" v-model="waiterId" :label="r.id" :key="r.id">{{ r.username }}</el-radio>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit('orderId')">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 模态框 -->
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import moment from 'moment'
export default {
    data() {
        return {
            waiterId: '',
            dialogFormVisible: false,
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
        ...mapGetters('order',['ordersStatusFilter']),
        ...mapState('waiter',['all_waiters'])
    },
    created() {
        this.findOrdersQuery(this.params)
        this.findAllOrders()
        // 查询员工
        this.findAllWaiters()
    },
    methods: {
        ...mapActions('order',['findOrdersQuery','findAllOrders','sendOrder']),
        ...mapActions('waiter',['findAllWaiters']),
        // 派单
        sendOrderHandler(id){
            // this.findOrdersQuery(this.params)
            this.orderId = id
            this.dialogFormVisible = true
        },
        // 派单
        submit() {
            let orderForm = {
                orderId: this.orderId,
                waiterId: this.waiterId
            }
            this.sendOrder(orderForm)
            .then(()=>{
                this.findAllOrders()
                this.dialogFormVisible = false
                this.$message({
                    showClose: true,
                    message: '派单成功',
                    type: 'success'
                })
            })  
        },
        // 关闭模态框
        close(){
            this.$confirm('是否关闭派单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.dialogFormVisible = false
            })
        },
        handlerVisibleChange(val){
            this.visible = val;
        },
        // 时间戳转换
        dateFormat(row,colnum){
            return moment(row[colnum.property]).format('YYYY-MM-DD HH:MM:SS')
        },
        pageChange(page){
            this.params.page = page - 1
            this.findOrdersQuery(this.params)
        },
        // 变换标签页
        handleClick(tab, event){
            // console.log(tab, event)
        }
    }
}
</script>
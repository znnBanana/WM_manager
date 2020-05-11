<template>
    <div class="customer">
        <!-- 搜索区域 -->
        <!-- <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
            <el-form-item label="顾客状态" >
                <el-select v-model="formInline.status" placeholder="顾客状态">
                    <el-option 
                        v-for="formInline in customers.list" 
                        :key="formInline.id" 
                        :label="formInline.status" 
                        :value="formInline.status">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="onSubmit">查询</el-button>
                <el-button type="warning" plain @click="handlerReset">重置</el-button>
            </el-form-item>
        </el-form> -->
        <!-- /搜索区域 -->

        <!-- 表格 -->
        <!-- {{customers.total}} -->
        <el-table :data="customers.list" style="width: 100%" size="small">
            <el-table-column prop="id" label="顾客编号" width="100" align="center"></el-table-column>
            <el-table-column prop="username" label="会员名" align="center"></el-table-column>
            <el-table-column prop="realname" label="真实姓名" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" align="center"></el-table-column>
            <el-table-column prop="telephone" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="addresses" label="默认地址" width="400" align="center">
                <!-- <template slot-scope="scope">
                    {{address_c[0].province}}
                    {{address_c[0].city}}
                    {{address_c[0].area}}
                    {{address_c[0].address}} 
                    {{scope.row.province}}
                    {{scope.row.city}}
                    {{scope.row.area}}
                    {{scope.row.address}}
                </template> -->
            </el-table-column>
            <!-- <el-table-column prop="status" label="状态" align="center">
                <template>
                    <div slot-scope="scope">
                        {{scope.row.status}}
                    </div>
                </template>
            </el-table-column> -->
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="toDetailsHandler(scope.row)">
                        <i class="el-icon-share"></i>
                    </el-button>
                </template>
            </el-table-column> 
        </el-table>
        <!-- {{customers}} -->
        <!-- /表格 -->

        <!-- 分页 -->
        <el-pagination
            style="float:right;margin: .8em 0"
            :total="customers.total"
            :page-size="customers.pageSize"
            @current-change="pageChange"
            background
            layout="total, prev, pager, next">
        </el-pagination>
        <!-- /分页 -->
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    data() {
        return {
            value: false,
            params: {
                page: 0,
                pageSize: 8
            },
            formInline: {},
        }
    },
    computed: {
        ...mapState('customer',['customers','customer_ByStatus']),
        ...mapState('address',['address_c']),
    },
    created() {
        this.queryCustomers(this.params)
        // 根据顾客id查询顾客地址
        // this.findAddressesByCus(this.customers.list.id)
    },
    methods: {
        ...mapActions('customer',['queryCustomers','findCustomerByStatus']),
        ...mapActions('address',['findAddressesByCus']),

        // 页面改变时
        pageChange(page){
            this.params.page = page - 1
            this.queryCustomers(this.params)
        },
        // 跳转详情页面
        toDetailsHandler(row){
            // 通过路由跳转携带参数，获取当前行数据
            this.$router.push({path:'/customer/details',query:row})
        },
        // 重置
        handlerReset(){
            // alert(1)
            this.queryCustomers(this.params)
        },
        // 根据状态查询
        onSubmit(){
            this.params = {
                page: 0,
                pageSize: 100,
                status: this.formInline.status,
            }
            this.queryCustomers(this.params)
        }
    }
}
</script>
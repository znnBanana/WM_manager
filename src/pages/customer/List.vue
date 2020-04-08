<template>
    <div class="customer">
        <!-- 搜索区域 -->
        <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
            <el-form-item label="顾客状态" >
                <el-select v-model="formInline.region" placeholder="顾客状态">
                <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- /搜索区域 -->

        <!-- 表格 -->
        <!-- {{customers.total}} -->
        <el-table :data="customers.list" style="width: 100%" size="small">
            <el-table-column prop="id" label="顾客编号" width="100" align="center"></el-table-column>
            <el-table-column prop="username" label="姓名" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" align="center"></el-table-column>
            <el-table-column prop="telephone" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
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
                pageSize: 5
            },
            formInline: {
                user: '',
                region: ''
            }
        }
    },
    computed: {
        ...mapState('customer',['customers'])
    },
    created() {
        this.queryCustomers(this.params)
    },
    methods: {
        ...mapActions('customer',['queryCustomers']),
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
        // 根据状态查询
        onSubmit(){

        }
    }
}
</script>
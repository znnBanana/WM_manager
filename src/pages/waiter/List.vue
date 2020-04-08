<template>
    <div class="waiter">
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
        <el-table :data="waiters" style="width: 100%" size="small">
            <el-table-column prop="id" label="员工编号" width="100" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" align="center"></el-table-column>
            <el-table-column prop="telephone" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="addrecc" label="地址" align="center" width="300px">
                <template slot-scope="scope">
                  湖南省怀化市鹤城区坨院街道
                  {{scope.row.province}}
                  {{scope.row.city}}
                  {{scope.row.area}}
                  {{scope.row.address}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="toDetailsHandler(scope.row)">
                        <i class="el-icon-share"></i>
                    </el-button>
                    <el-button type="text" @click="toAccessHandler(scope.row)">
                        审核
                    </el-button>
                </template>
            </el-table-column> 
        </el-table>
        <!-- /表格 -->

        <!-- 分页 -->
        <el-pagination
            :hide-on-single-page="true"
            :total="5"
            layout="prev, pager, next">
        </el-pagination>
        <!-- /分页 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: false,
            waiters:[{
                id: '1',
                name: '张三',
                gender: '男',
                telephone: '15516727388',
                status: '启用',
            }],
            formInline: {
                user: '',
                region: ''
            }
        }
    },
    computed: {

    },
    created() {

    },
    methods: {
        // 审核
        toAccessHandler(){
            // 审核 - > 已审核
        },
        // 跳转详情页面
        toDetailsHandler(){
            this.$router.push({path:'/waiter/details'})
        },
        // 根据状态查询
        onSubmit(){

        }
    }
}
</script>
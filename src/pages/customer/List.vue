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
        <el-table :data="customers" style="width: 100%" size="small">
            <el-table-column prop="id" label="顾客编号" width="100" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" align="center"></el-table-column>
            <el-table-column prop="telephone" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <!-- <template slot-scope="scope"> -->
                <el-button type="text" size="mini" @click="toDetailsHandler">
                    <i class="el-icon-share"></i>
                </el-button>
                <!-- </template> -->
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
            customers:[{
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
        // 跳转详情页面
        toDetailsHandler(){
            this.$router.push({path:'/customer/details'})
        },
        // 根据状态查询
        onSubmit(){

        }
    }
}
</script>
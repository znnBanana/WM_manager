<template>
    <div class="comment">
        <!-- 按钮 -->
        <el-button type="danger" size="small" plain @click="batchDeleteHandler">批量删除</el-button>
        <!-- /按钮 -->
        <!-- 表格 -->
        <el-table :data="comments" style="width: 100%" size="small">
            <el-table-column prop="id" type="selection" width="100" align="center"></el-table-column>
            <el-table-column prop="content" label="评论内容" align="center"></el-table-column>
            <el-table-column prop="commentTime" label="评论时间" align="center"></el-table-column>
            <el-table-column prop="orderId" label="订单" align="center"></el-table-column>
            <el-table-column prop="cusId" label="顾客" align="center">
                <template slot-scope="scope">
                    customer1
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="toDeleteHandler(scope.row)">
                        <i class="el-icon-delete"></i>
                    </el-button>
                    <el-button type="text" @click="toAccessHandler(scope.row)">
                        通过审核
                    </el-button>
                </template>
            </el-table-column> 
        </el-table>
        <!-- /表格 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: true,
            comments: [{
                content: '好吃忘不了',
                commentTime: '2020-03-12',
                orderId: '1000',
                status: '已通过'
            }]
        }
    },
    computed: {

    },
    created() {

    },
    methods: {
        // 批量删除
        batchDeleteHandler(){

        },
        // 通过审核
        toAccessHandler(){

        },
        // 删除
        toDeleteHandler(){

        }
    }
}
</script>
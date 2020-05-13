<template>
    <div class="comment">
        <!-- 按钮 -->
        <el-button style="margin-bottom:1em" type="danger" size="small" plain @click="batchDeleteHandler">批量删除</el-button>
        <!-- /按钮 -->
        <!-- 表格 -->
        <el-table :data="comments.list" style="width: 100%" size="small" @selection-change="idsChangeHandler">
            <el-table-column prop="id" type="selection" width="100" align="center"></el-table-column>
            <el-table-column prop="content" label="评论内容" width="300" align="center"></el-table-column>
            <el-table-column prop="commentTime" label="评论时间" width="180" align="center" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="orderId" label="订单" align="center"></el-table-column>
            <el-table-column prop="customername" label="顾客" align="center">
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="toDeleteHandler(scope.row.id)">
                        <i class="el-icon-delete"></i>
                    </el-button>
                    <!-- <el-button type="text" @click="toAccessHandler(scope.row)">
                        通过审核
                    </el-button> -->
                    <el-button v-if="scope.row.status=='审核不通过'" type="text" size="mini" @click="passHandler(scope.row.id)">通过审核</el-button>
                    <el-button v-else type="text" size="mini" @click="refuseHandler(scope.row.id)">拒绝审核</el-button>
                </template>
            </el-table-column> 
        </el-table>
        <!-- /表格 -->
        <!-- 分页 -->
        <el-pagination
            style="float:right;margin: .8em 0"
            :total="comments.total"
            :page-size="comments.pageSize"
            @current-change="pageChange"
            background
            layout="total, prev, pager, next">
        </el-pagination>
        <!-- /分页 -->
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import moment from 'moment'
export default {
    data() {
        return {
            value: true,
            params: {
                page: 0,
                pageSize: 8
            }
        }
    },
    computed: {
        ...mapState('comment',['comments'])
    },
    created() {
        this.queryComments(this.params)
    },
    methods: {
        ...mapActions('comment',['queryComments','deleteComment','batchDeleteComments','passComment','refuseComment']),
        // 页码改变
        pageChange(page){
            this.params.page = page - 1
            this.queryComments(this.params)
        },
        // 时间戳转换
        dateFormat(row,colnum){
            return moment(row[colnum.property]).format('YYYY-MM-DD HH:MM:SS')
        },
        // 通过审核
        passHandler(id) {
            this.passComment(id)
            .then(()=>{
                this.queryComments(this.params)
            })
        },
        // 拒绝审核
        refuseHandler(id) {
            // console.log(id)
            this.refuseComment(id)
            .then(()=>{
                this.queryComments(this.params)
            })
        },
        // 批量删除
        // 多选。拿ids
        idsChangeHandler(val) {
        this.ids = val.map(item => item.id)
        console.log(this.ids);
        },
        batchDeleteHandler(){
            if(this.ids == ''){
                this.$message({
                message: '进行批量操作之前,请进行多选',
                type: 'warning'
                });
            }else{
                this.$confirm('确认删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.batchDeleteComments(this.ids)
                    .then(()=>{
                        this.queryComments(this.params)
                    })
                    .then((response) => {
                        this.$message({ type: 'success', message: response.statusText })
                    })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                    })
                })
            }
        },
        // 删除
        toDeleteHandler(id){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteComment({id:id})
                .then(()=>{
                    this.queryComments(this.params)
                })
                this.$message({ type: 'success', message: '删除成功!' });
                this.visible = false
            })
        }
    }
}
</script>
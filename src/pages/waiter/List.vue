<template>
    <div class="waiter">
        <!-- 搜索区域 -->
        <!-- <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
            <el-form-item label="顾客状态" >
                <el-select v-model="formInline.region" placeholder="顾客状态">
                <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form> -->
        <!-- /搜索区域 -->

        <!-- 表格 -->
        <el-table :data="waiters.list" style="width:100%" size="small">
            <el-table-column prop="id" label="员工编号" width="100" align="center"></el-table-column>
            <el-table-column prop="username" label="姓名" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" align="center"></el-table-column>
            <el-table-column prop="telephone" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="addrecc" label="地址" align="center" width="300px">
                <template slot-scope="scope">
                  <!-- 湖南省怀化市鹤城区坨院街道 -->
                  {{scope.row.province}}
                  {{scope.row.city}}
                  {{scope.row.area}}
                  {{scope.row.address}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.status}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="toDetailsHandler(scope.row)">
                        <i class="el-icon-share"></i>
                    </el-button>
                    <el-button v-if="scope.row.status != '启用'" type="text" size="mimi" @click="toAccessHandler(scope.row.id)">
                        审核
                    </el-button>
                    <el-button v-if="scope.row.status == '启用'" type="text" size="mimi" @click="toLookHandler(scope.row.id)">
                        查看
                    </el-button>
                </template>
            </el-table-column> 
        </el-table>
        <!-- /表格 -->

        <!-- 模态框 -->
        <el-dialog title="审核员工" :visible.sync="dialogFormVisible">
            <!-- {{this.waiter_id}} -->
            <p>用户名：{{ this.waiter_id.username }}</p>
            <p class="idcard">身份证号：{{ this.waiter_id.idCard }}</p>
            <div class="left">
                <p>身份证正面照:</p>
                <img width="250" height="120" :src="'http://134.175.100.63:8686/'+this.waiter_id.idcardPhotoPositive">
                <!-- <div style="width:250px;line-height:120px;color:red;border:1px solid #f1f1f1" v-if="idcardPhotoPositive == ''">
                    <img alt="员工还未实名认证，暂时不能审核 ">
                </div> -->
            </div>
            <div class="right">
                <p>身份证反面照:</p>
                <img width="250" height="120" :src="'http://134.175.100.63:8686/'+this.waiter_id.idcardPhotoNegative">
                <!-- <div style="width:250px;line-height:120px;color:red;border:1px solid #f1f1f1" v-if="idcardPhotoNegative == ''">
                    <img alt="员工还未实名认证，暂时不能审核 ">
                </div> -->
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">审核通过</el-button>
                <el-button type="danger" @click="refuseHandler">拒绝审核</el-button>
            </div>
        </el-dialog>

        <el-dialog title="查看审核" :visible.sync="dialogFormVisible1">
            <!-- {{this.waiter_id}} -->
            <p>用户名：{{ this.waiter_id.username }}</p>
            <p class="idcard">身份证号：{{ this.waiter_id.idCard }}</p>
            <div class="left">
                <p>身份证正面照:</p>
                <img width="250" height="120" :src="'http://134.175.100.63:8686/'+this.waiter_id.idcardPhotoPositive">
            </div>
            <div class="right">
                <p>身份证反面照:</p>
                <img width="250" height="120" :src="'http://134.175.100.63:8686/'+this.waiter_id.idcardPhotoNegative">
            </div>
        </el-dialog>
        <!-- /模态框 -->
        <!-- 分页 -->
        <el-pagination
            style="float:right;margin: .8em 0"
            :total="waiters.total"
            :page-size="waiters.pageSize"
            @current-change="pageChange"
            background
            layout="total, prev, pager, next">
        </el-pagination>
        <!-- /分页 -->
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    data() {
        return {
            dialogFormVisible: false,
            dialogFormVisible1: false,
            value: false,
            formInline: {
                user: '',
                region: ''
            },
            params: {
                page: 0,
                pageSize: 8
            }
        }
    },
    computed: {
        ...mapState('waiter',['waiters','waiter_id'])
    },
    created() {
        this.queryWaiters(this.params) 
    },
    
    methods: {
        ...mapActions('waiter',['queryWaiters','waiterById','passWaiter']),
        // 页码改变
        pageChange(page){
            this.params.page = page - 1
            this.queryWaiters(this.params)
        },
        // 拒绝审核
        refuseHandler() {
            this.$message({
                showClose: true,
                message: '拒绝成功',
                type: 'success'
            })
            this.dialogFormVisible = false
        },
        // 审核
        submit() {
            var payload = {
                id: this.waiter_id.id,
                img1: this.waiter_id.idcardPhotoPositive,
                img2: this.waiter_id.idcardPhotoNegative
            }
            this.passWaiter(payload).then((res)=>{
                this.queryWaiters(this.params)
            })
            // this.waiter_id.status = '启用'
            this.dialogFormVisible = false
            this.$message({
                showClose: true,
                message: '审核成功',
                type: 'success'
            })
            
        },
        // 审核
        toAccessHandler(id){
            // 根据员工id查询员工信息
            this.waiterById({id:id})
            this.dialogFormVisible = true
            // 审核 - > 已审核
        },
        toLookHandler(id){
            // 根据员工id查询员工信息
            this.waiterById({id:id})
            this.dialogFormVisible1 = true
        },
        // 跳转详情页面
        toDetailsHandler(row){
            this.$router.push({path:'/waiter/details',query:row})
        },
        // 根据状态查询
    }
}
</script>
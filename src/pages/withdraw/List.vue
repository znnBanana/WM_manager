<template>
    <div class="withdraw">
        <!-- 上传凭证 -->
        <!-- /上传凭证 -->
        <!-- 表格 -->
        <!-- {{incomes}} -->
        <el-table :data="incomes.list" style="width: 100%" size="small">
            <el-table-column prop="id" label="审核编号" width="100" align="center"></el-table-column>
            <el-table-column prop="waiter_username" label="员工" align="center">
            </el-table-column>
            <el-table-column prop="money" label="金额(/元)" align="center"></el-table-column>
            <el-table-column prop="description" label="描述" align="center"></el-table-column>
            <el-table-column align="center" prop="transferAccounts" label="凭证">
                <template slot-scope="scope">
                    <!-- {{scope.row}} -->
                    <el-button v-if="scope.row.transferAccounts==null||scope.row.status=='0'" type="text" size="small" @click="uplodeHandler(scope.row)">上传凭证</el-button>
                    <el-button v-else type="text" size="small" @click="lookdetails(scope.row.transferAccounts)">查看凭证</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status=='1'" type="text" size="small">已审核</el-button>
                    <el-button v-else type="text" size="small" @click="toAccessHandler(scope.row)">审核</el-button>
                </template>
            </el-table-column> 
        </el-table>
        <!-- /表格 -->
        <!-- 凭证模态框 -->
        <el-dialog title="上传凭证" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-upload
                action="http://134.175.100.63:5588/file/upload"
                list-type="picture-card"
                :on-success="showPic"
                :preview-image='imgUrl'
                >
                <!-- <img v-if="imgUrl" :src="imgUrl" class="avatar" style="width:100px;height:100px"> -->
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitHandler">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog width="30%" :visible.sync="dialogVisible1" title="查看凭证">
            <img style="width:200px;height:200px" :src="dialogImageUrl" alt="">
        </el-dialog>
        <!-- /凭证模态框 -->
        <!-- 分页 -->
        <el-pagination
            style="float:right;margin: .8em 0"
            :total="incomes.total"
            :page-size="incomes.pageSize"
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
            imgUrl: '',
            dialogImageUrl: '',
            dialogVisible: false,
            dialogVisible1: false,
            params: {
                page: 0,
                pageSize: 8,
                type: '提现'
            },
            form: {}
        }
    },
    computed: {
        ...mapState('waiter',['waiters','incomes'])
    },
    created() {
        this.queryWaiters(this.params)
        // 员工首页信息
        this.waiterIncome(this.params)
    },
    methods: {
        ...mapActions('waiter',['queryWaiters','waiterIncome','WidthDraw','uploadExamine']),
        showPic(res,file,fileList){
            // console.log(res)
            this.imgUrl = 'http://134.175.100.63:8686/group1/' + res.data.id
        },
        // 上传成功
        submitHandler(){
            // console.log(this.form)
            this.form.transferAccounts = this.imgUrl
            this.uploadExamine(this.form)
            this.dialogVisible = false,
            this.$message({
                showClose: true,
                message: '上传成功',
                type: 'success'
            })
        },
        // 上传凭证
        uplodeHandler(params){
            if (params.status == '0') {
                this.$message({
                showClose: true,
                message: '未审核，请审核',
                type: 'error'
                })
            } else {
                this.dialogVisible = true
                // console.log(this.form)
                this.form = params
                // console.log(this.form)
            }
        },
        //查看凭证
        lookdetails(transferAccounts){
            console.log(transferAccounts)
            this.dialogVisible1 = true
            this.dialogImageUrl = transferAccounts
            // console.log(this.transferAccounts)
        },
        // 页码改变
        pageChange(page){
            this.params.page = page - 1
            this.waiterIncome(this.params)
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible1 = true;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        // 通过审核
        toAccessHandler(params){
            // 审核->已审核
            params.status = 1
            this.WidthDraw(params)
            this.$message({
                showClose: true,
                message: '审核成功',
                type: 'success'
            })
        }
    }
}
</script>
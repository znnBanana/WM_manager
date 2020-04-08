<template>
    <div class="withdraw">
        <!-- 上传凭证 -->
        <!-- /上传凭证 -->
        <!-- 表格 -->
        <el-table :data="withdraw" style="width: 100%" size="small">
            <el-table-column prop="id" label="审核编号" width="100" align="center"></el-table-column>
            <el-table-column prop="money" label="金额" align="center"></el-table-column>
            <el-table-column prop="userId" label="员工" align="center">
                <template slot-scope="scope">
                    waiter1
                  {{scope.row.province}}
              </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="toAccessHandler(scope.row)">
                        审核
                    </el-button>
                    <el-button type="text" size="mini" @click="upLoadHandler">
                        上传凭证
                    </el-button>
                </template>
            </el-table-column> 
        </el-table>
        <!-- /表格 -->
        <!-- 凭证模态框 -->
        <el-dialog title="上传凭证" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible1">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
        <!-- /凭证模态框 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            dialogVisible1: false,
            withdraw: [{
                id: '1',
                money: '20',
                description: '3单跑腿费'
            }]
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
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
        // 上传凭证
        upLoadHandler(){
            // 上传凭证 -> 查看凭证
            this.dialogVisible = true;
        },
        // 通过审核
        toAccessHandler(){
            // 审核->已审核
        }
    }
}
</script>
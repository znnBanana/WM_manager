<template>
    <div class="product">
        <!-- 搜索区域 -->
        <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
            <el-form-item label="商品名称" >
                <el-select v-model="formInline.region" placeholder="请输入商品名称" clearable>
                    <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="success" plain @click="toAddHandler">添加</el-button>
                <el-button type="danger" plain @click="batchDeleteHandler">批量删除</el-button>
            </el-form-item>
        </el-form>
        <!-- /搜索区域 -->
        <!-- 表格区域 -->
        <el-table :data="products" style="width: 100%" size="small">
            <el-table-column prop="id" type="selection" width="100" align="center"></el-table-column>
            <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="price" label="价格" align="center"></el-table-column>
            <el-table-column prop="categoryId" label="品类" align="center"></el-table-column>
            <el-table-column prop="description" label="商品描述" width="300px" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="toEditHandler(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" size="mini" @click="toDeleteHandler(scope.row)">
                        <i class="el-icon-delete"></i>
                    </el-button>
                    <el-button type="text" size="mini" @click="toDetailsHandler(scope.row)">
                        <i class="el-icon-share"></i>
                    </el-button>
                </template>
            </el-table-column> 
        </el-table>
        <!-- /表格区域 -->
        <!-- 模态框 -->
        <el-dialog title="添加商品信息" :visible.sync="dialogVisible" :rules="rules" width="40%" :before-close="handleClose">
            <el-form :label-position="labelPosition" label-width="80px" size="small" :model="productForm">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="productForm.name"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="productForm.price"></el-input>
                </el-form-item>
                <el-form-item label="品类" prop="categoryId">
                    <el-select v-model="productForm.categoryId" placeholder="请选择所属品类">
                        <el-option label="区域一" value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input type="textarea" v-model="productForm.description"></el-input>
                </el-form-item>
                <el-form-item label="宣传图">
                    <el-image style="width:100px;height:100px;" :src="productForm.photo"></el-image><p></p>
                    <el-button size="small" type="warning" plain>上传图片</el-button>      
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible  = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogVisible  = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- /模态框 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'right',
            dialogVisible: false,
            visible: false,
            multipleSelection: [],
            productForm: {
                name: '',
                price: '',
                categoryId: '',
                description: '',
                photo: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'

            },
            formInline: {
                user: '',
                region: ''
            },
            products: [{
                id: '1',
                name: '炒面',
                price: '12',
                categoryId: '午餐',
                description: '味美价廉'
            }],
            rules: {
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                price: [
                    { required: true, message: '请输入价格', trigger: 'blur' },
                ],
                categoryId: [
                    { required: true, message: '请选择所属品类', trigger: 'change' }
                ],
            }
        }
    },
    computed: {

    },
    created() {

    },
    methods: {
        // 查询
        onSubmit(){

        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        // 详情
        toDetailsHandler(){
            this.$router.push({path:'/product/details'})
        },
        // 删除
        toDeleteHandler(){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({ type: 'success', message: '删除成功!' });
                this.visible = false
            })
        },
        // 修改
        toEditHandler(){
            this.dialogVisible = true
        },
        // 批量删除
        batchDeleteHandler(){
            if(ids == ''){
                this.$message({
                message: '进行批量学费操作之前,请进行多选',
                type: 'warning'
                });
            
            }else{
                alert('批量删除')
            }
        },
        // 添加
        toAddHandler(){
            this.dialogVisible = true
        }
    }
}
</script>

<style scoped>
    
</style>
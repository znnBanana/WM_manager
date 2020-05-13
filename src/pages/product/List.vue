<template>
    <div class="product">
        <!-- 搜索区域 -->
        <!-- {{all_products}} -->
        <el-form :inline="true" :model="p" size="small" class="demo-form-inline">
            <el-form-item label="商品名称" >
                <el-select v-model="p.name" placeholder="请输入商品名称" clearable>
                    <el-option v-for="p in all_products" :key="p.id" :label="p.name" :value="p.name"></el-option>
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
        <!-- {{c_categories}} -->
        <!-- {{categories}} -->
        <!-- {{products.list}} -->
        <el-table :data="products.list" style="width: 100%" size="small" @selection-change="idsChangeHandler">
            <el-table-column prop="id" type="selection" width="100" align="center"></el-table-column>
            <el-table-column label="商品名称" width="150" class-name>
                <template slot-scope="scope" >
                    <img class="student_photo" :src="scope.row.photo" alt="">
                    <span class="student_name"> {{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="价格 (/元)" width="100" align="center"></el-table-column>
            <el-table-column prop="category.name" label="商家" width="150" align="center"></el-table-column>
            <el-table-column prop="description" label="商品描述" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="toEditHandler(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" size="mini" @click="toDeleteHandler(scope.row.id)">
                        <i class="el-icon-delete"></i>
                    </el-button>
                </template>
            </el-table-column> 
        </el-table>
        <!-- /表格区域 -->
        <!-- 分页 -->
        <el-pagination
            style="float:right;margin: .8em 0"
            :total="products.total"
            :page-size="products.pageSize"
            @current-change="pageChange"
            background
            layout="total, prev, pager, next">
        </el-pagination>
        <!-- /分页 -->
        <!-- 模态框 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" :rules="rules" width="40%" :before-close="handleClose">
            <el-form ref="c_form" :label-position="labelPosition" label-width="80px" size="small" :model="productForm">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="productForm.name"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <!-- <img style="width:120px;height:120px" :src="imgUrl" alt=""> -->
                    <el-upload
                        class="avatar-uploader"
                        action="http://134.175.100.63:5588/file/upload"
                        :show-file-list="false"
                        :on-success="showPic"
                        >
                        <img v-if="imgUrl" :src="imgUrl" class="avatar" style="width:100px;height:100px">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                   
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="productForm.price"></el-input>
                </el-form-item>
                <el-form-item label="所属商家" prop="categoryId">
                    <el-select v-model="productForm.categoryId" placeholder="请选择所属商家">
                        <!-- {{cc}} -->
                        <el-option v-for="cc in c_categories" :key="cc.id" :label="cc.name" :value="cc.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input type="textarea" v-model="productForm.description"></el-input>
                </el-form-item>
                <!-- <el-form-item label="宣传图">
                    <el-image style="width:100px;height:100px;" :src="productForm.photo"></el-image><p></p>
                    <el-button size="small" type="warning" plain>上传图片</el-button>      
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible  = false">取 消</el-button>
                <el-button size="small" type="primary" @click="submitHandler('c_form')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- /模态框 -->
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import _ from 'lodash'
export default {
    data() {
        return {
            imgUrl: '',
            ids: [],
            title: '',
            labelPosition: 'right',
            dialogVisible: false,
            visible: false,
            multipleSelection: [],
            productForm: {
                name: '',
                price: '',
                categoryId: '',
                description: '',
                photo: ''

            },
            p: {},
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
            },
            params: {
                page: 0,
                pageSize: 8
            }
        }
    },
    computed: {
        ...mapState('product',['products','all_products']),
        ...mapState('category',['categories','c_categories'])
    },
    created() {
        // 查询所有
        this.findAllProducts()
        // 分页查询
        this.queryProducts(this.params)
        // 查询树
        this.queryCategories()
    },
    methods: {
        ...mapActions('product',['findAllProducts','queryProducts','saveOrUpdate','deleteProduct','batchDeleteProducts']),
        ...mapActions('category',['queryCategories']),
        submitUpload() {
            this.$refs.upload.submit();
        },
        // 2、图片服务器返回一个处理过的地址
        showPic(res,file,fileList){
            this.imgUrl = 'http://134.175.100.63:8686/group1/' + res.data.id
        },
        // 页码改变
        pageChange(page){
            this.params.page = page - 1
            this.queryProducts(this.params)
        },
        queryProductsHandler(){
            this.queryProducts(this.params)
        },
        // 查询
        onSubmit(){
            this.params = {
                page: 0,
                pageSize: 8,
                name: this.p.name
            }
            console.log(this.params)
            this.queryProducts(this.params)
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
        toDeleteHandler(id){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteProduct({id:id})
                .then(()=>{
                    this.queryProducts(this.params)
                })
                this.$message({ type: 'success', message: '删除成功!' });
                this.visible = false
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 修改
        toEditHandler(row){
            this.dialogVisible = true
            this.title = '修改商品信息'
            this.productForm = row
            this.imgUrl = row.photo
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
                    this.batchDeleteProducts(this.ids)
                    .then(()=>{
                        this.queryProducts(this.params)
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
        // 添加
        submitHandler(productForm){
            this.$refs[productForm].validate((valid) => {
                this.queryCategories()
                if (valid) {
                    if(this.productForm.id){
                        this.productForm = {
                            id:this.productForm.id,
                            price: this.productForm.price,
                            categoryId: this.productForm.categoryId,
                            description: this.productForm.description,
                            photo: this.imgUrl,
                            name: this.productForm.name
                        }
                        this.saveOrUpdate(this.productForm)
                        .then(()=>{
                            this.queryProducts(this.params)
                            this.dialogVisible = false
                            this.$message({
                                showClose: true,
                                message: '更新成功',
                                type: 'success'
                            })
                        })
                    } else {
                        // 添加
                        this.productForm = {
                            price: this.productForm.price,
                            categoryId: this.productForm.categoryId,
                            description: this.productForm.description,
                            photo: this.imgUrl,
                            name: this.productForm.name
                        }
                        this.saveOrUpdate(this.productForm)
                        .then(()=>{
                            this.queryProducts(this.params)
                            this.dialogVisible = false
                            this.$message({
                                showClose: true,
                                message: '更新成功',
                                type: 'success'
                            })
                        })
                    }
                } else {
                return false
                }
            })
        },
        toAddHandler(){
            this.dialogVisible = true
            // this.saveOrUpdate()
            this.title = '添加商品信息'
            this.productForm = {}
        }
    }
}
</script>

<style scoped>
  .product >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .product >>> .el-upload:hover {
    border-color: #f6544a;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .student_photo {
  position: absolute;
  left: 0;
  top: 8px;
  display: inline-block;
  background-color: pink;
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
.student_name{
  position: absolute;
  left: 40px;
  top: 14px;
}
</style>
<template>
    <div class="category">
        <!-- 搜索区域 -->
        <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
            <!-- <el-form-item label="品类名称" >
                <el-select v-model="formInline.name" placeholder="请选择商家名称" clearable>
                    <el-option v-for="b in categories" :key="b.id" :label="b.name" :value="b.name"></el-option>
                </el-select>
                {{formInline}}
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="onSubmit">查询</el-button>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" plain @click="addProductHandler">商家添加</el-button>
                <el-button type="success" plain @click="addCategoryHandler">品类添加</el-button>
                <!-- <el-button type="danger" plain @click="batchDeleteHandler">批量删除</el-button> -->
            </el-form-item>
            <!-- {{categories}} -->
        </el-form>
        <!-- /搜索区域 -->
        <!-- 表格区域 -->
        <el-table :data="categories" size="small" style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-form v-for="(c,index) in scope.row.children" :key="c.id" label-position="left" inline class="demo-table-expand">
                    <el-form-item label="商家宣传图">
                        <img class="student_photo" :src="c.icon" alt="">
                    </el-form-item>
                    <el-form-item label="商家名称">
                        <span>{{ c.name }}</span>
                    </el-form-item>
                    <el-form-item label="所属品类">
                        <span>{{ c.parentId }}</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="text" size="mini" @click="toEditProductHandler(scope.row,index)">
                            <i class="el-icon-edit"></i>
                        </el-button>
                        <!-- <el-button type="text" size="mini" @click="toDeleteProductHandler(scope.row,index)">
                            <i class="el-icon-delete"></i>
                        </el-button> -->
                    </el-form-item>
                </el-form>
            </template>
            </el-table-column>
            <el-table-column width="100" align="center"></el-table-column>
            <el-table-column label="品类名称" class-name>
                <template slot-scope="scope" >
                    <img class="student_photo" :src="scope.row.icon" alt="">
                    <span class="student_name"> {{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="品类编号" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="toEditCategoryHandler(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" size="mini" @click="toDeleteCategoryHandler(scope.row.id)">
                        <i class="el-icon-delete"></i>
                    </el-button>
                </template>
            </el-table-column> 
        </el-table>
        <!-- /表格区域 -->
        <!-- 商品抽屉 -->
        <el-drawer :title="productTitle" :visible.sync="productDrawer" :direction="direction" custom-class="demo-drawer" ref="productDrawer" style="position:raletive">
            <div class="demo-drawer__content">
                <el-form ref="p_form" :model="productForm">
                    <!-- {{productForm}} -->
                    <el-form-item label="商家名称" :label-width="formLabelWidth">
                        <el-input v-model="productForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="所属品类" :label-width="formLabelWidth">
                        <el-select v-model="productForm.parentId" placeholder="请选择所属品类">
                            <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商家图片" :label-width="formLabelWidth">
                        <!-- <img style="width:120px;height:120px" :src="imgUrl1" alt=""> -->
                        <!-- <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="http://134.175.100.63:5588/file/upload"
                            :on-success="showPic1"
                            list-type="picture-card"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">请选取图片</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload1">上传到服务器</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png图片，且不超过500kb</div>
                        </el-upload> -->
                        <el-upload
                        class="avatar-uploader"
                            action="http://134.175.100.63:5588/file/upload"
                            :show-file-list="false"
                            :on-success="showPic1"
                            >
                            <img v-if="imgUrl1" :src="imgUrl1" class="avatar" style="width:100px;height:100px">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div style="position:absolute;right:1em">
                    <el-button @click="closeProductHandler('p_form')">取 消</el-button>
                    <el-button type="primary" @click="editProductHandler('p_form')">确定</el-button>
                </div>
            </div>
        </el-drawer>
        <!-- /商品抽屉 -->
        <!-- 品类抽屉 -->
        <el-drawer :title="categoryTitle" :visible.sync="categoryDrawer" :direction="direction" custom-class="demo-drawer" ref="categoryDrawer" style="position:raletive">
            <div class="demo-drawer__content">
                <!-- {{categoryForm}} -->
                <el-form ref="c_form" :model="categoryForm">
                    <el-form-item label="品类名称" :label-width="formLabelWidth">
                        <el-input v-model="categoryForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="品类图片" :label-width="formLabelWidth">
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
                </el-form>
                <div style="position:absolute;right:1em">
                    <el-button @click="closecategoryHandler">取 消</el-button>
                    <el-button type="primary" @click="editCategoryHandler('c_form')">确定</el-button>
                </div>
            </div>
        </el-drawer>
        <!-- /品类抽屉 -->
        
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    data() {
        return {
            // 品类头像
            imgUrl: '',
            imgUrl1: '',
            productTitle: '',
            categoryTitle: '',
            // 抽屉
            productDrawer: false,
            categoryDrawer: false,
            direction: 'rtl',
            formLabelWidth: '80px',
            labelPosition: 'right',
            categoryForm: {},
            productForm: {},
            dialogVisible: false,
            formInline: {},
            rules: {
                name:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ]
            },
        }
    },
    computed: {
        ...mapState('category',['categories'])
    },
    created() {
        // 查询品类
        this.queryCategories()
    },
    methods: {
        ...mapActions('category',['submitCategories','queryCategories','saveOrUpdateCategory','deleteCategory','deleteProduct']),
        submitUpload1() {
            this.$refs.upload.submit();
        },
        // 2、图片服务器返回一个处理过的地址
        showPic1(res,file,fileList){
            this.imgUrl1 = 'http://134.175.100.63:8686/group1/' + res.data.id
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        // 2、图片服务器返回一个处理过的地址
        showPic(res,file,fileList){
            this.imgUrl = 'http://134.175.100.63:8686/group1/' + res.data.id
        },
        // 修改商品
        toEditProductHandler(row,index){
            this.productDrawer = true
            this.productTitle = "修改商家信息"
            var obj = {
                name:row.children[index].name,
                parentId:row.id,
                id:row.children[index].id
            }
            this.productForm = obj
            this.imgUrl1 = row.children[index].icon
        }, 
        // 确认添加商品
        editProductHandler(productForm){
            this.$refs[productForm].validate((valid) => {
                if (valid) {
                    // 修改
                    if(this.productForm.id){
                        this.productForm = {
                            id: this.productForm.id,
                            icon: this.imgUrl1,
                            parentId: this.productForm.parentId,
                            name: this.productForm.name
                        }
                        this.saveOrUpdateCategory(this.productForm)
                        this.productDrawer = false
                        this.$message({
                            showClose: true,
                            message: '更新成功',
                            type: 'success'
                        })
                    } else {
                        // 添加
                        this.productForm = {
                            icon: this.imgUrl1,
                            parentId: this.productForm.parentId,
                            name: this.productForm.name
                        }
                        this.saveOrUpdateCategory(this.productForm)
                        this.productDrawer = false
                        this.$message({
                            showClose: true,
                            message: '更新成功',
                            type: 'success'
                        })
                    }
                } else {
                return false
                }
            })
        },
        // 添加商品
        addProductHandler(){
            this.productDrawer = true
            this.productTitle = "添加商家信息"
        },
        // 关闭商品模态框
        closeProductHandler(productForm){
            this.productDrawer = false
            this.$refs[productForm].resetFields()
        },
        // 修改品类
        toEditCategoryHandler(row){
            this.categoryDrawer = true
            this.categoryTitle = "修改品类信息"
            this.categoryForm = row
            this.imgUrl = row.icon
        },
        // 确认添加品类
        editCategoryHandler(categoryForm){
            this.$refs[categoryForm].validate((valid) => {
                if (valid) {
                    // 修改
                    if(this.categoryForm.id){
                        this.categoryForm = {
                            id:this.categoryForm.id,
                            icon: this.imgUrl,
                            name: this.categoryForm.name
                        }
                        // console.log(this.categoryForm)
                        this.saveOrUpdateCategory(this.categoryForm)
                        this.categoryDrawer = false
                        this.$message({
                            showClose: true,
                            message: '更新成功',
                            type: 'success'
                        })
                    } else {
                        this.categoryForm = {
                            icon: this.imgUrl,
                            name: this.categoryForm.name
                        }
                        // console.log(this.categoryForm)
                        this.saveOrUpdateCategory(this.categoryForm)
                        this.categoryDrawer = false
                        this.$message({
                            showClose: true,
                            message: '更新成功',
                            type: 'success'
                        })
                    }
                } else {
                return false
                }
            })
        },
        // 添加品类
        addCategoryHandler(){
            this.categoryForm = {}
            this.categoryDrawer = true
            this.categoryTitle = "添加品类信息"
        },
        // 关闭品类模态框
        closecategoryHandler(){
            this.categoryDrawer = false
        },
        // 查询
        onSubmit(){
            this.params = {
                page: 0,
                pageSize:200,
                name: this.formInline.name
            }
            this.submitCategories(this.params)
        },
        // 删除商品
        toDeleteProductHandler(row,index){
            // console.log(row.children[index].id)
            this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                this.deleteProduct({id:row.children[index].id})
                // console.log({id:row.children[index].id})
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 删除品类
        toDeleteCategoryHandler(id){
            this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                this.deleteCategory({id:id})
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 批量删除
        batchDeleteHandler(){
            if(ids == ''){
                this.$message({
                message: '进行批量操作之前,请进行多选',
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
.category >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .category >>> .el-upload:hover {
    border-color: #409EFF;
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
    width: 30%;
  }
  /* .demo-table-expand .el-form-item:nth-child(2) {
      width: 15%;
  } */
  .demo-table-expand .el-form-item:first-child {
      width: 15%;
  }
  .demo-table-expand .el-form-item:last-child {
      width: 8%;
  }
.student_name{
  position: absolute;
  left: 40px;
  top: 14px;
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
    
</style>
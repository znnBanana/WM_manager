<template>
    <div class="category">
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
        <el-table :data="categories" style="width: 100%" size="small">
            <el-table-column prop="id" type="selection" width="100" align="center"></el-table-column>
            <el-table-column label="品类名称" width="150" class-name>
                <template slot-scope="scope" >
                    <img class="student_photo" src="../../assets/images/header.png" alt="">
                    <span class="student_name"> {{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="序号" align="center"></el-table-column>
            <el-table-column prop="parentId" label="父栏目id" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="toEditHandler(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" size="mini" @click="toDeleteHandler(scope.row)">
                        <i class="el-icon-delete"></i>
                    </el-button>
                </template>
            </el-table-column> 
        </el-table>
        <!-- /表格区域 -->
        <!-- 模态框 -->
        <el-dialog title="添加品类信息" :visible.sync="dialogVisible" :rules="rules" ref="categoryForm" width="40%" :before-close="handleClose">
            <el-form :label-position="labelPosition" label-width="80px" size="small" :model="categoryForm">
                <el-form-item label="品类名称" prop="name">
                    <el-input v-model="categoryForm.name"></el-input>
                </el-form-item>
                <el-form-item label="父栏目Id" prop="parentId">
                    <el-select v-model="categoryForm.parentId" placeholder="请选择所属父栏目">
                        <el-option label="区域一" value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="宣传图">
                    <el-image style="width:100px;height:100px;" :src="categoryForm.icon"></el-image><p></p>
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
            categoryForm: {
                name: '',
                num: '',
                parentId: '',
                icon: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
            },
            dialogVisible: false,
            formInline: {
                user: '',
                region: ''
            },
            categories: [{
                name: '餐饮',
                num: '1',
                parentId: '12',
                icon: ''
            }],
            rules: {
                name:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ]
            }
        }
    },
    computed: {

    },
    created() {

    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        // 查询
        onSubmit(){

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
  background-color: blue;
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
    
</style>
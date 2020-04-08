<template>
    <div class="details">
        <!-- 按钮 -->
        <el-button size="small" type="primary" plain icon="el-icon-caret-left" @click="BackHandler">返回</el-button>
        <!-- /按钮 -->
        <!-- 基本信息 -->
        <el-card class="box-card">
            <div class="product_info">
                <div>
                    <img class="info_img" src="../../assets/images/header.png" alt="">
                </div>
                <el-button type="warning" size="small" plain>更改宣传图</el-button>
            </div>
            <div>商品名称：炒饭</div>
            <div>价格：12 元</div>
            <div>商品描述：味美价廉</div>
        </el-card>
        <!-- /基本信息 -->
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {

    },
    created() {

    },
    methods: {
        // 返回商品列表页面
        BackHandler(){
            this.$router.push({path:'/product/list'})
        }
    }
}
</script>

<style scoped>
    .box-card div {
        margin: 1em;
    }
    .box-card {
        margin: .5em;
        width: 480px;
    }
    .product_info {
        width: 400px;
        text-align: center;
    }
    .info_img{
        width: 150px;
        height: 150px;
        /* border-radius: 50%; */
        margin: 1em;
    }
</style>
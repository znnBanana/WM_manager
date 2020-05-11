import {get, post} from '../../../http/axios'
export default {
    namespaced: true,
    state: {
        products: [],
        all_products: []
    },
    mutations: {
        refreshProducts(state,products){
            state.products = products
        },
        refreshAllProducts(state,all_products){
            state.all_products = all_products
        }
    },
    actions: {
        // 查询所有产品
        async findAllProducts({commit}){
            let response = await get('/product/findAll')
            commit('refreshAllProducts',response.data)
        },
        // 批量删除产品信息
        async batchDeleteProducts({ dispatch }, ids) {
            const response = await post('/product/batchDelete?ids=' + ids)
            dispatch('queryProducts')
            return response
        },
        // 删除商品
        async deleteProduct({dispatch},id){
            let response = await get('/product/deleteById',id)
            dispatch('queryProducts')
            return response
        },
        // 添加与修改商品
        async saveOrUpdate({dispatch},form){
            let response = await post('/product/saveOrUpdate',form)
            dispatch('queryProducts')
            return response
        },
        // 分页查询产品
        async queryProducts({commit},params) {
            let response = await post('/product/queryProductCascadeCategory',params)
            commit('refreshProducts',response.data)
        }
    }
}
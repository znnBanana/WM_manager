import {get, post} from '../../../http/axios'
export default {
    namespaced: true,
    state: {
        categories: [],
        s_category: [],
        // 商家
        c_categories: []
    },
    mutations: {
        refreshSubmitCategories(state,s_category){
            state.s_category = s_category
        },
        refreshCategories(state,categories){
            state.categories = categories
        },
        refreshCategoriesChildren(state,c_categories){
            state.c_categories = c_categories
        }
    },
    actions: {
        //  删除商品信息
        async deleteProduct(context,id){
            let response = await get('/category/deleteById',id)
            context.dispatch('queryCategories')
            return response
        },
        // 删除品类信息
        async deleteCategory(context,id){
            let response = await get('/category/deleteById',id)
            context.dispatch('queryCategories')
            return response
        },
        // 添加商品信息
        async saveOrUpdateProduct(context,p_form){
            let response = await post('/category/saveOrUpdate',p_form)
            context.dispatch('queryCategories')
            return response
        },
        // 添加品类信息
        async saveOrUpdateCategory(context,c_form){
            let response = await post('/category/saveOrUpdate',c_form)
            context.dispatch('queryCategories')
            return response
        },
        // 查询树
        async queryCategories({commit}) {
            let response = await get('/category/findCategoryTree')
            commit('refreshCategories',response.data)
            var c_categories = [];
            response.data.forEach((item)=>{
                item.children.forEach((i)=>{
                    c_categories.push(i)
                })
            })
            commit('refreshCategoriesChildren',c_categories)
        },
        // 分页查询产品
        async submitCategories({commit},params) {
            let response = await post('/category/query',params)
            commit('refreshSubmitCategories',response.data)
        }
    }
}
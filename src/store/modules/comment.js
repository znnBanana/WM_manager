import {get, post} from '../../../http/axios'
export default {
    namespaced: true,
    state: {
        comments: []
    },
    mutations: {
        refreshComments(state,comments){
            state.comments = comments
        }
    },
    actions: {
        // 拒绝审核
        async refuseComment({dispatch},id){
            let response = await get('/comment/commentRefuseExamine?commentid=' + id)
            dispatch('queryComments')
            return response
        },
        // 通过审核
        async passComment({dispatch},id){
            let response = await get('/comment/commentExamine?commentid=' + id)
            dispatch('queryComments')
            return response
        },
        // 批量删除产品信息
        async batchDeleteComments({ dispatch }, ids) {
            const response = await post('/comment/batchDelete?ids=' + ids)
            dispatch('queryComments')
            return response
        },
        // 删除评论
        async deleteComment({dispatch},id){
            let response = await get('/comment/deleteById',id)
            dispatch('queryComments')
            return response
        },
        // 分页查询产品
        async queryComments({commit},params) {
            let response = await post('/comment/query',params)
            // 根据顾客id查询评论信息
            response.data.list.forEach((item)=>{
                // console.log(item)
                let customer_id = {
                    id: item.cusId
                }
                if(customer_id.id){
                    get('/customer/findCustomerById',customer_id)
                    .then((res)=>{
                        // console.log(res.data)
                        item.customername = res.data.username
                    })
                }
            })
            setTimeout(()=>{
                commit('refreshComments',response.data)
            },1000)
        }
    }
}
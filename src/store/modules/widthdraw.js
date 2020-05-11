import {get, post} from '../../../http/axios'
export default {
    namespaced: true,
    state: {
        withdraw: []
    },
    mutations: {
        refreshCategories(state,withdraw){
            state.withdraw = withdraw
        }
    },
    actions: {
        // 分页查询
        async queryCategories({commit},params) {
            let response = await post('/category/query',params)
            // 根据员工id查询员工信息
            response.data.list.forEach((item)=>{
                console.log(item)
            })
            setTimeout(()=>{
                commit('refreshCategories',response.data)
            },1000)
        }
    }
}
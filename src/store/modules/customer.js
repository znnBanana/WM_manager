import {get,post} from '../../../http/axios'
export default {
    namespaced: true,
    state: {
        customers: {},
        customer_ById: {}
    },
    mutations: {
        // 通过突变修改state中的值
        refreshCustomers(state,customers) {
            state.customers = customers
        },
        refreshCustomerById(state,customer_ById){
            state.customer_ById = customer_ById
        }
    },
    actions: {
        // 根据id查询
        // async findCustomerById({commit},id){
        //     let response = await get('/customer/findCustomerById',id)
        //     commit('refreshCustomerById',response.data)
        // },
        // 分页查询
        async queryCustomers({commit},params){
            let response = await post ('/customer/query',params)
            commit('refreshCustomers',response.data)
        },
        // async findAllCustomers({commit}){
        //     let response = await get ('/customer/findAll')
        //     commit('refreshCustomers',response.data)
        // }

    }
}
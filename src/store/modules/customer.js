import {get,post} from '../../../http/axios'
export default {
    namespaced: true,
    state: {
        customers: [],
        customer_ByStatus: []
    },
    mutations: {
        // 通过突变修改state中的值
        refreshCustomers(state,customers) {
            state.customers = customers
        },
        refreshCustomerByStatus(state,customer_ByStatus){
            state.customer_ByStatus = customer_ByStatus
        },
        
    },
    actions: {
        // 根据状态查询
        // async findCustomerByStatus({commit},params){
        //     let response = await post('/customer/query',params)
        //     commit('refreshCustomerByStatus',response.data)
        // },
        // 分页查询
        async queryCustomers({commit},params){
            let response = await post ('/customer/query',params)
            response.data.list.forEach((item)=>{
                let customer_id = {
                    id: item.id
                }
                get('/address/findByCustomerId',customer_id).then((res)=>{
                    item.addresses = res.data[0].province+""+res.data[0].city+""+res.data[0].area+""+res.data[0].address
                    console.log(item.addresses)
                })
            })
            setTimeout(()=>{
                commit('refreshCustomers',response.data)
            },1000)
        },
    }
}
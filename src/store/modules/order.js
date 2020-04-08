import {get,post} from '../../../http/axios'
export default {
    namespaced: true,
    state: {
        // 顾客
        orderc: [],
        ordercList:[],
        // 订单
        orders: [],
        ordersList: [],
        allOrders: []
    },
    getters: {
        // 顾客订单过滤器
        ordersFilter(state) {
            return function(status) {
              return state.ordercList.filter((response) => {
                return response.status === status
              })
            }
        },
        // 顶单过滤器
        ordersStatusFilter(state){
            return (status)=>{
              return state.allOrders.filter(order=>order.status === status)
            }
        }
    },
    mutations: {
        // 查询所有订单
        refreshAllOrders(state,allOrders){
            state.allOrders = allOrders
        },
        // 订单分页查询
        refreshOrders(state,orders){
            state.orders = orders
        },
        refreshOrdersList(state,ordersList){
            state.ordersList = ordersList
        },
        // 根据顾客id分页查询订单
        refreshOrdersBycus(state,orderc){
            state.orderc = orderc
        },
        refreshOrdersBycusList(state,ordercList){
            state.ordercList = ordercList
        }
    },
    actions: {
        // 查询所有订单
        async findAllOrders({commit}){
            let response = await get('/order/findAll')
            commit('refreshAllOrders',response.data)
        },
        // 分页查询
        async findOrdersQuery({commit},params){
            let response = await post('/order/queryPage',params)
            commit('refreshOrders',response.data)
            commit('refreshOrdersList',response.data.list)
        },
        // 分页查询根据顾客id
        async findOrdersBycus({commit},params){
            let response = await post('/order/queryPage',params)
            commit('refreshOrdersBycus',response.data)
            commit('refreshOrdersBycusList',response.data.list)
        },
        // 根据顾客id查询订单
        // async findOrdersBycus({commit},customerId){
        //     let response = await get('/order/query?customerId='+customerId)
        //     commit('refreshOrdersBycus',response.data)
        // }
    }
}
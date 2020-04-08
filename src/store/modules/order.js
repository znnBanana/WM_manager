import {get,post} from '../../../http/axios'
import Axios from 'axios'
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
            response.data.forEach((item)=>{
                // 根据顾客id查询顾客详情
                var customer_obj = {
                    id:item.customerId
                }
                get('/customer/findCustomerById',customer_obj).then((res)=>{
                    item.customer_realname = res.data.realname
                    item.customer_telephone = res.data.telephone
                })
                // 根据员工id查询员工详情
                if(item.waiterId){
                    var waiter_obj = {
                        id:item.waiterId
                    }
                    get('/waiter/findWaiterById',waiter_obj).then((res)=>{
                        item.waiter_realname = res.data.realname
                        item.waiter_telephone = res.data.telephone
                    })
                }
            })
            // 设置延时器，防止自定义数据没有封装完成
            setTimeout(() => {
                commit('refreshAllOrders',response.data)
            }, 1000);
        },
        // 分页查询
        async findOrdersQuery({commit},params){
            let response = await post('/order/queryPage',params)
            commit('refreshOrders',response.data)
            response.data.list.forEach((item)=>{
                var customer_obj = {
                    id:item.customerId
                }
                get('/customer/findCustomerById',customer_obj).then((res)=>{
                    item.customer_realname = res.data.realname
                    item.customer_telephone = res.data.telephone
                })
                // 加判断，waiterId存在的时候再调接口
                if(item.waiterId){
                    var waiter_obj = {
                        id:item.waiterId
                    }
                    get('/waiter/findWaiterById',waiter_obj).then((res)=>{
                        item.waiter_realname = res.data.realname
                        item.waiter_telephone = res.data.telephone
                    })
                }
            })
            setTimeout(() => {
                commit('refreshOrdersList',response.data.list)
            }, 1000);
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
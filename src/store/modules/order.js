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
        allOrders: [],
        // 员工
        orderw: [],
    },
    getters: {
        // 员工订单过滤器
        ordersFilterw(state) {
            return function(status) {
              return state.orderw.filter((response) => {
                return response.status === status
              })
            }
        },
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
        // 根据员工id查询订单
        refreshOrdersByWai(state,orderw){
            state.orderw = orderw
        },  
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
        // 派单
        async sendOrder({dispatch},params){
            let response = await get('/order/sendOrder',params)
            dispatch('findOrdersQuery')
            return response
        },
        // 分页查询员工订单，根据员工id
        async queryOrdersByWai({commit},param){
            let response = await get('/order/query',param)
            response.data.forEach((item)=>{
                let address = {
                    addressId: item.address.province+""+item.address.city+""+item.address.area+""+item.address.address
                }
                item.addressId = address.addressId
            })
            setTimeout(() => {
                commit('refreshOrdersByWai',response.data)
            },1000)
        },
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
            response.data.list.forEach((item)=>{
                console.log(item)
                let waiter_id = {
                    id: item.waiterId
                }
                // 根据员工id查询姓名
                get('/waiter/findWaiterById',waiter_id)
                .then((res)=>{
                    item.waitername = res.data.username
                })
            })
            setTimeout(()=>{
                commit('refreshOrdersBycusList',response.data.list)
            },1000)
        },
    }
}
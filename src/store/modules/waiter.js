import {get, post,post_json} from '../../../http/axios'
import widthdraw from './widthdraw'
export default {
    namespaced: true,
    state: {
        // 分页查询员工
        waiters: [],
        // 员工收益
        incomes: [],
        // 所有员工
        all_waiters: [],
        // 根据员工id
        waiter_id: []
    },
    mutations: {
        refreshWaiters(state,waiters){
            state.waiters = waiters
        },
        refreshWaiterIncome(state,incomes){
            state.incomes = incomes
        },
        refreshAllWaiters(state,all_waiters){
            state.all_waiters = all_waiters
        },
        refreshWaiterById(state,waiter_id){
            state.waiter_id = waiter_id
        }
    },
    actions: {
        // 上传凭证
        async uploadExamine({dispatch},param){
            let response = await post_json('/waiter/uploadExamine',param)
            dispatch('waiterIncome')
            return response
        },
        // 提现审核
        async WidthDraw({dispatch},param){
            let response = await post_json('/waiter/waiterexamine',param)
            dispatch('waiterIncome')
            return response
        },
        // 员工审核通过
        async passWaiter({dispatch},param){
            let response = await get('/waiter/auditing',param)
            dispatch('queryWaiters')
            return response
        },
        // 根据员工id查询员工信息
        async waiterById({commit},id){
            let response = await get('/waiter/findWaiterById',id)
            commit('refreshWaiterById',response.data)
        },
        // 员工收益信息
        async waiterIncome({commit},params){
            let response = await post('/waiter/queryShou',params)
            // 根据员工id查询员工姓名
            response.data.list.forEach((item)=>{
                console.log(item)
                var waiter_id = {
                    id:item.userId
                }
                get('/waiter/findWaiterById',waiter_id).then((res)=>{
                    item.waiter_username = res.data.username
                })
                // 根据顾客id查询顾客详情
                // var customer_obj = {
                //     id:item.customerId
                // }
                // get('/customer/findCustomerById',customer_obj).then((res)=>{
                //     item.customer_realname = res.data.realname
                //     // item.customer_telephone = res.data.telephone
                // })
            })
            setTimeout(() => {
                commit('refreshWaiterIncome',response.data)
            },1000)
        },
        // 查询所有员工
        async findAllWaiters({commit}){
            let response = await get('/waiter/findAll')
            commit('refreshAllWaiters',response.data)
        },
        // 分页查询
        async queryWaiters({commit},params) {
            console.log(params,'---')
            let response = await post('/waiter/query',params)
            commit('refreshWaiters',response.data)
        }
    }
}
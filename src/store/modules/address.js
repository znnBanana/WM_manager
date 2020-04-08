import {get} from '../../../http/axios'
export default {
    namespaced: true,
    state: {
        address_c: []
    },
    mutations: {
        refreshAddressByCus(state,address_c){
            state.address_c = address_c
        }
    },
    actions: {
        async findAddressesByCus({commit},id){
            let response = await get('/address/findByCustomerId?id='+id)
            commit('refreshAddressByCus',response.data)
        }
    }
}
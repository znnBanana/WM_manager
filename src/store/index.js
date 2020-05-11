import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import customer from './modules/customer'
import order from './modules/order'
import address from './modules/address'
import product from './modules/product'
import category from './modules/category'
import waiter from './modules/waiter'
import comment from './modules/comment'
import widthdraw from './modules/widthdraw'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    customer,
    order,
    address,
    product,
    category,
    waiter,
    comment,
    widthdraw
  },
  getters
})

export default store

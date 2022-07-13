import { createStore } from 'vuex'
import user from './user'
import admin from './admin'
import bank from './bank'


export default createStore({
  modules: {
    user,
    admin,
    bank

  }
})

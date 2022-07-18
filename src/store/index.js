import { createStore } from 'vuex'
import user from './user'
import admin from './admin'
import bank from './bank'
import menu from './menu'
// import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    user,
    admin,
    bank,
    menu,
    // plugins: [
    //   createPersistedState({
    //     paths: ['bank']
    //   })
    // ]
  }
})

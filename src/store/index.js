import { createStore } from 'vuex'
import user from './user'
import admin from './admin'
import bank from './bank'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    user,
    admin,
    bank,
    plugins: [
      createPersistedState({
        paths: ['bank']
      })
    ]

  }
})

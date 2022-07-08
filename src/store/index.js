import { createStore } from 'vuex'
import user from './user'
import bank from './bank'

export default createStore({
  modules: {
    user,
    bank
  }
})

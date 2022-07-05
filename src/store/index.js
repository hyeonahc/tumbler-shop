import { createStore } from 'vuex'
import user from './user'
import admin from './admin'

export default createStore({
  modules: {
    user,
    admin
  }
})

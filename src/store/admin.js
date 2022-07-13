import {request} from '../api/adminProductApi'


export default {
  namespaced : true,
  state: () => ({
    allProducts: [],
    salesDetails: [],
  }),

  getters: {
    
  },

  mutations : {
    assignState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    addState(state, payload) {
      state.allProducts.push(payload)
    },
    delete(state, payload) {
      const all = state.allProducts.findIndex(product => product.id === payload)
      state.allProducts.splice(all, 1)
    },
    updata(state, payload) {
      state.type = payload
    }
  },

  actions: {
    // 모든 제품 조회
    async allProductsLookup({ commit }) {
      const res = await request({
        method: 'GET',
      })
        commit('assignState',{allProducts: res})
        console.log('모든 제품 조회')
    },

    // 제품 추가
    async addProduct({ commit }, payload = {}) {
      const res = await request({
        method: 'POST',
        body: {
         ...payload
        }
      })
      commit('assignState', {allProducts: res})
      console.log('제품 추가')
    },

    // 제품 삭제
    async deleteProduct({ commit },id) {
      const res = await request({
        url:`${id.id}`,
        method: 'DELETE',
      })
        commit('delete', res)
        console.log('제품 삭제')
    },
  },
}


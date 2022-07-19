import { publicRequest } from '../api/publicRequest'

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
  },

  actions: {
    // 모든 제품 조회
    async allProductsLookup({ commit }) {
      const res = await publicRequest({
        url: 'products',
        method: 'GET',
      })
        commit('assignState',{allProducts: res})
        console.log('모든 제품 조회')
    },

    // 전체 판매 내역
    async salesProduct({ commit }) {
      const res = await publicRequest({
        url:'products/transactions/all',
        method: 'GET'
      })
        commit('assignState', {salesDetails: res})
    },
  },
}


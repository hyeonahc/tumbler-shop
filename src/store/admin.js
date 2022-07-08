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
        url: 'products',
        method: 'GET',
      })
        commit('assignState',{allProducts: res})
        console.log('모든 제품 조회')
    },

    // 제품 추가
    async addProduct({ commit }, payload = {}) {
      const res = await request({
        url: 'products',
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
      const res = await commonRequst({
        url:`${id.id}`,
        method: 'DELETE',
      })
        commit('delete', res)
        console.log('제품 삭제')
    },

    // 제품 수정
    async editProduct({ commit }, id) {
      const res = await commonRequst({
        url:`${id.id}`,
        method: 'PUT',
      })
        commit('updata', res)
        console.log(res)
    },

  },
}

async function request(options) {
  const {url = '', method, body } = options
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/${url}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'TEAM_1',
      masterKey: true,
    },
    body: JSON.stringify(body)
  })
    return await res.json()
}

// 공용 관리자

async function commonRequst(id) {
  const {url = '', method} = id
  await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${url}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'TEAM_1',
      masterKey: true,
    },
   })
}

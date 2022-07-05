export default {
  namespaced : true,
  state: () => ({
    allProducts: [],
  }),

  getters: {
    
  },

  mutations : {
    addState(state, payload) {
      state.allProducts.push(payload)
      console.log(state)
    }
  },

  actions: {
    
    // 모든 제품 조회

    async productsInquiry(products, payload = {}) {
      const { commit } = products
      const {id, title, price, description, tags, thumbnail, isSildOut} = payload

      const { allProducts } = await request({
        url: 'products',
        method: 'GET',
        body: {
          id,
          title,
          price,
          description,
          tags,
          thumbnail,
          isSildOut
        }
      })
        commit('addState', allProducts)
        console.log('모든 제품 조회')
    },

    // 제품 추가
    async addProduct({ commit }, payload = {}) {
      
      const res = await request({
        url: 'products',
        method: 'POST',
        data: {
         ...payload
        }
      })
      commit('addState', res)
      console.log(res)
    
    },
  },

}


async function request(options) {
  // const accessToken = window.localStorage.getItem('token')
  const {url = '', method, data } = options
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/${url}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'TEAM_1',
      'masterKey': true,
    },
    data: JSON.stringify(data)
  })
  return res.json()
}

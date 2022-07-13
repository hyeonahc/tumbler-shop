export default {
  namespaced: true,
  state: () => ({
    banklist: '',
    account: {},
    userAccountInfo: ''
  }),
  getters: {

  },
  mutations: {
    updateAccount(state, payload) {
      state.account = payload
    }
  },
  actions: {

    // 계좌 목록 조회
    async accountList({state}) {
      const res = await request({
        url: 'account/banks',
        method: 'GET',
      })
      state.banklist = res
      console.log('계좌목록조회')
      // 목록조회 확인
      // console.log(res)
      // console.log(state.banklist)
    },


    // 계좌 연결
    async accountConnect({ commit }, payload) {
      const { bankCode, accountNumber, phoneNumber, signature } = payload
      await request({
        url: 'account',
        method: 'POST',
        body: {
          bankCode,
          accountNumber,
          phoneNumber,
          signature
        }
      })
      commit ('updateAccount', payload)
      console.log('계좌연결')
      console.log(bankCode)
      console.log(accountNumber)
      console.log(phoneNumber)
      console.log(signature)
  },

    // 계좌 목록 및 잔액
  async accountBalance({ state }) {
    const res = await request({
      url: 'account',
      method: 'GET'
    })
    state.userAccountInfo = res
    console.log('계좌목록및잔액조회')
    // 잔액조회 확인
    console.log(state.userAccountInfo)
    console.log(res)
  },

    // 계좌 해지
  async accountDisConnect({ commit }, payload) {
    const {accountId, signature} = payload
    await request({
      url: 'account',
      method: 'DELETE',
      body: {
        accountId,
        signature
      }
    })
    commit ('updateAccount', payload)
    console.log('계좌해지')
    console.log(this.updateAccount)
  }

  }
}

async function request(options) {
  const accessToken = window.localStorage.getItem('token')
  const {url = '', method, body } = options
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/${url}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'TEAM_1',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  })
  return res.json()
}











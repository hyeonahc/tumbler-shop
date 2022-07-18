import { publicRequest } from '../api/publicRequest'

export default {
  namespaced: true,
  state: () => ({
    banklist: {},
    account: {},
    userAccountInfo: '',
  }),
  mutations: {
    updateAccount(state, payload) {
      state.account = payload
    },
    test(state, images) {
      state.banklist.push(images)
    }
  },
  actions: {
    // 은행 계좌 목록 조회
    async accountList({ state }) {
      const res = await publicRequest({
        url: 'account/banks',
        method: 'GET',
      })
      state.banklist = res
      state.banklist[0].image= require('../assets/logo.png')
      state.banklist[1].image= require('../assets/logo.png')
      state.banklist[2].image= require('../assets/logo.png')
      state.banklist[3].image= require('../assets/logo.png')
      state.banklist[4].image= require('../assets/logo.png')
      state.banklist[5].image= require('../assets/logo.png')
      state.banklist[6].image= require('../assets/logo.png')
      console.log('res', state.banklist)
    },
    // 계좌 연결
    async accountConnect({ commit }, payload) {
      const { bankCode, accountNumber, phoneNumber, signature } = payload
      await publicRequest({
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
    },
    // 계좌 목록 및 잔액
    async accountBalance({ state }) {
      const res = await publicRequest({
        url: 'account',
        method: 'GET'
      })
      state.userAccountInfo = res
    },
    // 계좌 해지
    async accountDisConnect({ commit }, payload) {
      const { accountId, signature } = payload
      await publicRequest({
        url: 'account',
        method: 'DELETE',
        body: {
          accountId,
          signature
        }
      })
      commit ('updateAccount', payload)
    },

    
  }
}











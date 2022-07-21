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
  },
  actions: {
    async accountList({ state }) {
      const res = await publicRequest({
        url: 'account/banks',
        method: 'GET',
      })
      state.banklist = res
      state.banklist[0].image = require('../assets/bank_kb.png')
      state.banklist[1].image = require('../assets/bank_shinhan.png')
      state.banklist[2].image = require('../assets/bank_woori.png')
      state.banklist[3].image = require('../assets/bank_hana.png')
      state.banklist[4].image = require('../assets/bank_kbank.png')
      state.banklist[5].image = require('../assets/bank_kakao.png')
      state.banklist[6].image = require('../assets/bank_nh.png')
      console.log('res', state.banklist)
    },
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
    async accountBalance({ state }) {
      const res = await publicRequest({
        url: 'account',
        method: 'GET'
      })
      state.userAccountInfo = res
    },
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
    }
  }
}











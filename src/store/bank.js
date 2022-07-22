import { publicRequest } from '~/api/publicRequest'

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
      state.userAccountInfo.accounts.forEach(account => {
        const { bankCode } = account
        switch (bankCode) {
          case '004':
            account.logo = require('../assets/KB국민은행.png')
            break
          case '088':
            account.logo = require('../assets/신한은행.png')
            break
          case '020':
            account.logo = require('../assets/우리은행.png')
            break
          case '081':
            account.logo = require('../assets/하나은행.png')
            break
          case '089':
            account.logo = require('../assets/케이뱅크.png')
            break
          case '090':
            account.logo = require('../assets/카카오뱅크.png')
            break
          case '011':
            account.logo = require('../assets/NH농협은행.png')
            break
          default:
            return null
        }
      })
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











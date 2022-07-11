import { publicRequest } from '../api/publicRequest'

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
      const res = await publicRequest({
        url: 'account/banks',
        method: 'GET',
      })
      state.banklist = res
      // 목록조회 확인
      // console.log('계좌목록조회')
      // console.log(res)
      // console.log(state.banklist)
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
      // 계좌 연결 확인 및 정보 전달
      // console.log('계좌연결')
      // console.log('bankCode',bankCode)
      // console.log('accountNumber',accountNumber)
      // console.log('phoneNumber',phoneNumber)
      // console.log('signature',signature)
  },

    // 계좌 목록 및 잔액
  async accountBalance({ state }) {
    const res = await publicRequest({
      url: 'account',
      method: 'GET'
    })
    state.userAccountInfo = res
    // 잔액조회 확인
    // console.log('계좌목록및잔액조회')
    console.log(state.userAccountInfo)
  },

    // 계좌 해지
  async accountDisConnect({ commit }, payload) {
    const {accountId, signature} = payload
    await publicRequest({
      url: 'account',
      method: 'DELETE',
      body: {
        accountId,
        signature
      }
    })
    commit ('updateAccount', payload)
    // 계좌 해지 확인
    // console.log('계좌해지')
    // console.log(this.updateAccount)
  }

  }
}











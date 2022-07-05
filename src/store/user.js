import { publicRequest } from '~/api/publicRequest'

export default {
  namespaced: true,
  state: () => ({
    user: {},
    isLogIn: false // 해당 값으로, 현재 유저가 로그인 한 상태인지 확인
  }),
  mutations: {
    // 상태 업데이트
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    // 회원 가입
    async signUp({ commit }, payload = {}) { // 매개변수를 객체형태로 받아온다, 아무런 데이터가 없다면 오류가 생기기 때문에 기본값 `{}` 명시
      try {
        const { user, accessToken } = await publicRequest({
          url: 'auth/signup',
          method: 'POST',
          body: {
            ...payload
          }
        })
        if (user) {
          window.localStorage.setItem('token', accessToken)
          commit('updateState', {
            user
          })
        } else {
          alert('이미 존재하는 사용자 정보입니다')
        }
      } catch (err) {
        alert(err)
      }
    },
    // 로그인
    async signIn({ commit }, payload = {}) {
      try {
        const { user, accessToken } = await publicRequest({
          url: 'auth/login',
          method: 'POST',
          body: {
            ...payload
          }
        })
        if (user && accessToken) {
          window.localStorage.setItem('token', accessToken) // accessToKen을 localStorage에 저장
          commit('updateState', { // user 정보를 store에 저장, isLogIn: true로 저장
            user,
            isLogIn: true
          })
        } else {
          alert('잘못된 사용자 정보입니다')
        }
      } catch (err) {
        alert(err)
      }
    },
    // 로그아웃
    async signOut({ commit }) {
      await publicRequest({
        url: 'auth/logout',
        method: 'POST'
      })
      commit('updateState', {
        user: {},
        isLogIn: false
      })
    },
    // 상태 업데이트 요청
    requestUpdateState({ commit }, payload = {}) {
      commit('updateState', payload)
    }
  }
}

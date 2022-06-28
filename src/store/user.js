export default {
  namespaced: true,
  state: () => ({
    user: {}
  }),
  getters: {

  },
  mutations: {
    //유저 정보 업데이트
    updateUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    // 회원 가입
    async signUp(context, payload = {}) { // 매개변수를 객체형태로 받아온다, 아무런 데이터가 없다면 오류가 생기기 때문에 기본값 `{}` 명시
      const { commit } = context
      const { email, password, displayName } = payload

      const { user, accessToken } = await request({
        url: 'auth/signup',
        method: 'POST',
        body: {
          email,
          password,
          displayName
        }
      })
      window.localStorage.setItem('token', accessToken)
      commit('updateUser', user)
      console.log('회원가입')
    },

    // 로그인
    async signIn(context, payload = {}) {
      const { commit } = context
      const { email, password } = payload

      const { user, accessToken } = await request({
        url: 'auth/login',
        method: 'POST',
        body: {
          email,
          password
        }
      })
      window.localStorage.setItem('token', accessToken) // accessToKen을 localStorage에 저장
      commit('updateUser', user) // user 정보를 store에 저장
      console.log('로그인')
    },

    // 로그아웃
    async signOut() {
      await request({
        url: 'auth/logout',
        method: 'POST'
      })
      console.log('로그아웃')
    },

    // 유저정보 업데이트 요청
    updateUser(context, payload = {}) {
      const { commit } = context
      commit('updateUser', payload)
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

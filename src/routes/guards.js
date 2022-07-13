import router from './index'
import userStore from '~/store'
import { validateTokenUser } from '~/core'

router.beforeEach(async to => { // to - 어디로 갈 건지 설정
  const user = await validateTokenUser()
  if (to.meta.auth || to.meta.autologin) { // autologin이 true인 값을 추가로 넣어 준 것은 자동으로 로그인이 작동하도록 하기 위함
    if (user && user.email) {
      if (user.email === 'team1_manager@gmail.com' && user.displayName === 'team1_manager') {
        userStore.dispatch('user/requestUpdateState', {
          user,
          isLogIn: true,
          isAdmin: true
        })
      } else {
        userStore.dispatch('user/requestUpdateState', {
          user,
          isLogIn: true
        })
      }
      return true
    }
    if (to.meta.autologin) {
      return true
    }
    return '/signin'
  }
  return true
})

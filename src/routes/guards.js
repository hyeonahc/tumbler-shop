import router from './index'
import userStore from '~/store'
import { validataTokenUser } from '~/core'

router.beforeEach(async to => { // to - 어디로 갈 건지 설정
  if (to.meta.auth) {
    const user = await validataTokenUser()
    if (user.email === 'team1_manager@gmail.com' && user.displayName === 'team1_manager') {
      return '/admin'
    }
    if (user && user.email) {
      userStore.commit('user/updateState', {
        user
      })
      window.sessionStorage.setItem('user', JSON.stringify(user)) // 임시방편으로 세션에 유저정보 저장
      return true
    }
    return '/signin'
  }
  return true
})

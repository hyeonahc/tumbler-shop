<template>
  <h1>MainPage..</h1>
  <h1>{{ user.email }}</h1>
  <h1>{{ isLogIn }}</h1>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { validataTokenUser } from '~/core' 

export default {
  computed: {
    ...mapState('user', [
      'user',
      'isLogIn'
    ])
  },
  async created() { // 처음 Mainpage에 접근하였을 때, Token이 유효하면 자동 로그인 되도록 설정
    const user = await validataTokenUser()
    if (user && user.email) {
      this.requestUpdateState({
        user,
        isLogIn: true
      })
    }
  },
  methods: {
    ...mapActions('user', [
      'requestUpdateState'
    ])
  }
}
</script>

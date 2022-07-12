<template>
  <TheHeader />
  <div class="container">
    <h1>MainPage..</h1>
    <h1>{{ user.email }}</h1>
    <h1>{{ isLogIn }}</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { validateTokenUser } from '~/core' 
import TheHeader from '~/components/TheHeader'

export default {
  components: {
    TheHeader
  },
  computed: {
    ...mapState('user', [
      'user',
      'isLogIn'
    ])
  },
  created() { 
    this.autologin() // 처음 Mainpage에 접근하였을 때, Token이 유효하면 자동 로그인 되도록 설정
  },
  methods: {
    ...mapActions('user', [
      'requestUpdateState'
    ]),
    async autologin() {
      const user = await validateTokenUser()
      if (user && user.email) {
        this.requestUpdateState({
          user,
          isLogIn: true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 12rem;
}
</style>

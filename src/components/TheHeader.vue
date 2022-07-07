<template>
  <header>
    <RouterLink :to="{name: 'mainpage'}">
      MainPage
    </RouterLink>
    <span v-if="!isLogIn">
      <RouterLink to="/signup">
        SignUp
      </RouterLink>
      <RouterLink to="/signin">
        SignIn
      </RouterLink>
    </span>
    <span v-else>
      <RouterLink to="/mypage">
        Mypage
      </RouterLink>
      <RouterLink
        to="/"
        @click="signOut">
        SignOut
      </RouterLink>
    </span>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('user', [
      'isLogIn'
    ])
  },
  methods: {
    ...mapActions('user', {
      useSignOut: 'signOut'
    }),
    signOut() {
      this.useSignOut()
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  padding: 20px 20px;
  border-bottom: 1px solid $color-primary;
  a {
    margin-right: 10px;
    line-height: 1;
  }
}
</style>

<template>
  <header>
    <RouterLink to="/">
      Home
    </RouterLink>
    <RouterLink to="/signup">
      SignUp
    </RouterLink>
    <RouterLink to="/signin">
      SignIn
    </RouterLink>
    <RouterLink to="/mypage">
      Mypage
    </RouterLink>
    <RouterLink
      to="/"
      @click="signOut">
      SignOut
    </RouterLink>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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

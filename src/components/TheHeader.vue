<template>
  <header>
    <div class="inner">
      <img
        class="logo"
        src="../assets/logo.png"
        alt="starbucks"
        @click="$router.push({ name: 'mainpage'})" />
      <div class="flex-space"></div>
      <div class="link-container">
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
      </div>
    </div>
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
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: $color-header;
  border-bottom: 0.1rem solid $color-header-border;
  .inner {
    display: flex;
    height: 12rem;
    max-width: 110rem;
    margin: 0 auto;
    padding-top: 2.25rem;
    .logo {
      height: 7.5rem;
      &:hover {
        cursor: pointer;
      }
    }
    .link-container {
      padding-top: 3rem;
    }
  }
  a {
    margin-right: 2rem;
    color: $color-font;
  }
}
</style>

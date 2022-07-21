<template>
  <header
    id="header"
    class="flex-center-vertically">
    <div class="container">
      <div class="flex-center-vertically product-detail">
        <img
          class="logo"
          src="../assets/logo.png"
          alt="logo"
          @click="$router.push({ name: 'mainpage'})" />
        <div class="link-container">
          <template v-if="!isLogIn">
            <RouterLink to="/signup">
              회원가입
            </RouterLink>
            <span class="menu-divider"> | </span>
            <RouterLink to="/signin">
              로그인
            </RouterLink>
          </template>
          <template v-else>
            <template v-if="isAdmin">
              <RouterLink to="/admin">
                관리자 페이지
              </RouterLink>
              <span class="menu-divider"> | </span>
            </template>
            <template v-else>
              <RouterLink to="/mypage">
                마이 페이지
              </RouterLink>
              <span class="menu-divider"> | </span>
            </template>
            <RouterLink
              :to="{name: 'mainpage'}"
              @click="signOut">
              로그아웃
            </RouterLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('user', [
      'isLogIn',
      'isAdmin'
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
  width: 100vw;
  height: 10vh;
  background-color: $color-header;
  border: 0.1rem solid $color-header-border;
  padding: 0.75em 0;
  margin-bottom: 3em;
  &.flex-center-vertically {
    justify-content: space-between;
  }
  &.sticky {
    position: fixed;
    top: 0;
  }
  .flex-center-vertically {
    justify-content: space-between;
  }
  a, .menu-divider {
    margin-right: 2rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

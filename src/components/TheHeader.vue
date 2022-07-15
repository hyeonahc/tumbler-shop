<template>
  <header id="header">
    <div class="inner">
      <img
        class="logo"
        src="../assets/logo.png"
        alt="starbucks"
        @click="$router.push({ name: 'mainpage'})" />
      <div class="flex-space"></div>
      <div class="link-container">
        <span v-if="!isLogIn">
          <RouterLink to="/signup">
            회원가입
          </RouterLink>
          <RouterLink to="/signin">
            로그인
          </RouterLink>
        </span>
        <span v-else>
          <span v-if="isAdmin">
            <RouterLink to="/admin">
              관리자 페이지
            </RouterLink>
          </span>
          <span v-else>
            <RouterLink to="/mypage">
              마이 페이지
            </RouterLink>
          </span>
          <RouterLink
            :to="{name: 'mainpage'}"
            @click="signOut">
            로그아웃
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
      'isLogIn',
      'isAdmin'
    ])
  },
  mounted() {
    this.fixHeaderOnScroll()
  },
  methods: {
    ...mapActions('user', {
      useSignOut: 'signOut'
    }),
    signOut() {
      this.useSignOut()
    },
    fixHeaderOnScroll() {
      window.onscroll = () => updateClassName()
      const header = document.getElementById('header')
      const sticky = header.offsetTop
      function updateClassName() {
        if (window.pageYOffset > sticky) {
          header.classList.add('sticky')
        } else {
          header.classList.remove('sticky')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100vw;
  background-color: $color-header;
  border-bottom: 0.1rem solid $color-header-border;
  &.sticky {
  position: fixed;
  top: 0;
}
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

<template>
  <TheHeader />
  <div class="auth-form-container flex-center-center">
    <div class="inner">
      <h1 class="text-center">
        로그인
      </h1>
      <div class="inner__card">
        <h2 class="text-center">
          <strong>Welcome!</strong> 텀블러샵에 오신 것을 환영합니다.
        </h2>
        <div class="form">
          <input
            v-model="email"
            placeholder="이메일을 입력해주세요"
            type="text"
            autofocus />
          <input
            v-model="password"
            placeholder="비밀번호를 입력해주세요"
            type="password" 
            @keydown.enter="useSignIn" />
          <input
            type="submit"
            value="로그인"
            @click="useSignIn" />
          <p>
            아직 계정이 없으신가요? 
            <RouterLink to="/signup">
              가입하기
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TheHeader from '~/components/TheHeader'

export default {
  components: {
    TheHeader
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState('user', [
      'user',
      'isLogIn'
    ])
  },
  methods: {
    ...mapActions('user', [
      'signIn'
    ]),
    async useSignIn() {
      if (!this.email.trim()) {
        alert('이메일을 입력해주세요')
        return
      } else if (!this.password.trim()) {
        alert('비밀번호를 입력해주세요')
        return
      }
      await this.signIn({
        email: this.email,
        password: this.password
      })
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-form-container {
  background: url("../assets/login_bg.jpg") no-repeat center center fixed;
  background-size: cover;
  height: 90vh;
  position: absolute;
  top: 10vh;
  width: 100%;
  .inner {
    h1 {
      color: $color-white;
    }
    &__card {
      width: 50rem;
      margin: 0 auto;
      border-radius: 0.6rem;
      background-color: $color-white;
      box-shadow: 0.2rem 0.2rem 2rem rgba(0, 0, 0, .3);
      color: $color-font;
      h2 {
        padding: 3rem;
        border-bottom: 0.1rem solid $color-header-border;
        strong {
          font-weight: $font-medium;
          color: $color-primary;
        }
      }
      .form {
        padding: 3rem 2.2rem;
        [type="submit"] {
          background-color: $color-primary;
          border: none;
          color: $color-white;
          font-size: 2rem;
          cursor: pointer;
        }
        p {
          font-size: 1.2rem;
          text-align: center;
          a {
            color: $color-primary;
            font-weight: bold;
            text-decoration: underline;
          }
        }
        input {
          width: 100%;
          margin-bottom: 1.2rem;
          padding: 1.5rem;
          border: 0.1rem solid $color-header-border;
          border-radius: 0.4rem;
          outline: none;
          font-size: 1.4rem;
          &:not(:last-of-type) {
            &:focus {
              border-color: $color-primary;
              background-color: rgba($color-primary, .03);
            }
          }
        }
      }
    }
  }
}
</style>

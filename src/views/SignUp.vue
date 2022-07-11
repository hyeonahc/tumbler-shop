<template>
  <TheHeader />
  <div class="auth-form-container">
    <div class="inner">
      <h1>회원가입</h1>
      <div class="inner__card">
        <h2>
          회원정보를 입력해주세요
        </h2>
        <div class="form">
          <input
            :value="displayName"
            placeholder="이름을 입력해주세요"
            type="text" 
            autofocus 
            @input="displayName = $event.target.value" />
          <input
            v-model="email"
            placeholder="이메일을 입력해주세요"
            type="text" />
          <input
            v-model="password"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            @keydown.enter="signUp" />
          <input
            type="submit"
            value="회원가입"
            @click="signUp" />
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
      displayName: '',
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState('user', [
      'user'
    ])
  },
  methods: { // 스토어의 `actions`와 `methods`의 이름이 겹쳐서, `useSignUp`이라는 이름으로 action을 가져옴
    ...mapActions('user', {
      useSignUp: 'signUp'
    }),
    async signUp() {
      if (!this.displayName.trim()) {
        return alert('이름을 입력해주세요')
      } else if (!this.email.trim()) {
        return alert('이메일을 입력해주세요')
      } else if (!this.password.trim()) {
        return alert('비밀번호를 입력해주세요')
      } else if (!this.email.includes('@') && !this.email.includes('.com')) {
        return alert('올바른 이메일 형식이 아닙니다')
      } else if (this.password.trim().length <= 7) {
        return alert('비밀번호는 8자리 이상으로 설정해주세요')
      }
      this.useSignUp({
        displayName: this.displayName,
        email: this.email,
        password: this.password
      })
      this.displayName = ''
      this.email = ''
      this.password = ''
    }
  }
}

</script>

<style lang="scss" scoped>
.auth-form-container {
  margin-top: 12rem;
  background-image: url("../assets/login_bg.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  .inner {
    max-width: 110rem;
    margin: 0 auto;
    padding: 10rem 0 15rem;
    h1 {
      color: $color-white;
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 2.4rem;
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
        font-size: 1.8rem;
        text-align: center;
        border-bottom: 0.1rem solid $color-header-border;
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

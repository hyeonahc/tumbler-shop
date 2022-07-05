<template>
  <div>
    <input
      v-model="email"
      placeholder="이메일을 입력해주세요"
      type="text" />
  </div>
  <div>
    <input
      v-model="password"
      placeholder="비밀번호를 입력해주세요"
      type="password" 
      @keydown.enter="signIn" />
  </div>
  <button
    @click="signIn">
    로그인
  </button>
  <button>
    <RouterLink to="/signup">
      회원가입 페이지
    </RouterLink>
  </button>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
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
  methods: { // 스토어의 `actions`와 `methods`의 이름이 겹쳐서, `useSignIn`이라는 이름으로 action을 가져옴
    ...mapActions('user', {
      useSignIn: 'signIn'
    }),
    async signIn() {
      if (!this.email.trim()) {
        alert('이메일을 입력해주세요')
        return
      } else if (!this.password.trim()) {
        alert('비밀번호를 입력해주세요')
        return
      }
      await this.useSignIn({
        email: this.email,
        password: this.password
      })
      this.email = ''
      this.password = ''
      if (this.isLogIn) { // 만약 로그인을 성공한 상태라면~
        this.$router.push({
          name: 'mainpage' 
        })
      }
    }
  }
}
</script>

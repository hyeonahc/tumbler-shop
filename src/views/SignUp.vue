<template>
  <div>
    <input
      :value="displayName"
      placeholder="이름을 입력해주세요"
      type="text" 
      @input="displayName = $event.target.value"
      @keydown.enter="signUp" />
  </div>
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
      type="password" />
  </div>
  <button
    @click="signUp">
    회원가입!
  </button>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
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
        alert('이름을 입력해주세요')
        return
      } else if (!this.email.trim()) {
        alert('이메일을 입력해주세요')
        return
      } else if (!this.password.trim()) {
        alert('비밀번호를 입력해주세요')
        return
      } else if (!this.email.includes('@') && !this.email.includes('.com')) {
        alert('올바른 이메일 형식이 아닙니다')
      } else if (this.password.trim().length <= 7) {
        alert('비밀번호는 8자리 이상으로 설정해주세요')
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

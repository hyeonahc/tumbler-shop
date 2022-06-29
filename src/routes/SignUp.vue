<template>
  <div>
    <input
      v-model="email"
      type="text" />
  </div>
  <div>
    <input
      v-model="password"
      type="text" />
  </div>
  <div>
    <input
      v-model="displayName"
      type="text" 
      @keydown.enter="signUp" />
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
      email: '',
      password: '',
      displayName: ''
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
      console.log('회원 가입')
      this.useSignUp({
        email: this.email,
        password: this.password,
        displayName: this.displayName
      })
    }
  }
}

</script>

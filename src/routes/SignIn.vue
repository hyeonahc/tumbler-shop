<template>
  <div>
    <input
      v-model="email"
      type="text" />
  </div>
  <div>
    <input
      v-model="password"
      type="text" 
      @keydown.enter="signIn" />
  </div>
  <button
    @click="signIn">
    로그인
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
      'user'
    ])
  },
  methods: { // 스토어의 `actions`와 `methods`의 이름이 겹쳐서, `useSignIn`이라는 이름으로 action을 가져옴
    ...mapActions('user', {
      useSignIn: 'signIn'
    }),
    async signIn() {
      this.useSignIn({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

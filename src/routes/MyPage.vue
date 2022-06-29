<template>
  <h1>사용자 전용 페이지입니다</h1>
  <h1>{{ user.email }}</h1>
  <h1>{{ user.displayName }}</h1>
  <button @click="emailTest">
    user test
  </button>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('user', [
      'user'
    ])
  },
  created() {
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    this.updateUser(user)
    window.sessionStorage.removeItem('user') // user 정보 업데이트 후 바로 삭제
  },
  methods: {
    emailTest() {
      console.log(this.user.email)
    },
    ...mapActions('user', [
      'updateUser' 
    ])
  }
}
</script>

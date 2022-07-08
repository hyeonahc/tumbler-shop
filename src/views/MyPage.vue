<template>
  <h1>사용자 전용 페이지입니다</h1>
  <h1>{{ user.email }}</h1>
  <h1>{{ isLogIn }}</h1>

  <RouterLink :to="{name: 'myAccount'}">
    <h3>내 계좌</h3>
  </RouterLink>

  <RouterView />
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('user', [
      'user',
      'isLogIn'
    ])
  },
  created() {
    this.requestUpdateState({ 
      isLogIn: true
    })
  },
  methods: {
    ...mapActions('user', [
      'requestUpdateState' 
    ])
  }
}
</script>

<template>
  <TheHeader />
  <div>
    <h1>MainPage</h1>
    <h1>User Email: {{ user.email }}</h1>
    <h1>LogIn: {{ isLogIn }}</h1>
    <h1>Admin: {{ isAdmin }}</h1>
  </div>
  <DisplayProducts />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TheHeader from '~/components/TheHeader'
import DisplayProducts from '~/components/DisplayProducts'

export default {
  components: {
    TheHeader,
    DisplayProducts
  },
  computed: {
    ...mapState('user', [
      'user',
      'isLogIn',
      'isAdmin'
    ])
  },
  methods: {
    ...mapActions('user', [
      'requestUpdateState'
    ])
  }
}
</script>

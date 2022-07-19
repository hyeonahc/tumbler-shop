<template>
  <TheHeader />
  <div class="inner">
    <DisplayProducts />
  </div>
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

<template>
  <div
    v-if="loading"
    class="skeleton__container">
    <div class="skeleton__inner">
      <div class="skeleton__header"></div>
      <div class="skeleton__body"></div>
      <div class="skeleton__body__second"></div>
      <div class="skeleton__body"></div>
      <div class="skeleton__body__second"></div>
      <div class="skeleton__body"></div>
      <div class="skeleton__body__second"></div>
      <div class="skeleton__body"></div>
      <div class="skeleton__body__second"></div>
      <div class="skeleton__body"></div>
      <div class="skeleton__body__second"></div>
      <div class="skeleton__body"></div>
      <div class="skeleton__body__second"></div>
      <div class="skeleton__body"></div>
      <div class="skeleton__body__second"></div>
      <div class="skeleton__body"></div>
      <div class="skeleton__body__second"></div>
      <div class="skeleton__body"></div>
      <div class="skeleton__body__second"></div>
    </div>
    <Loader class="loader" />
  </div>
</template>

<script>
import Loader from '~/components/Loader.vue'

export default {
  components: {
    Loader
  },
  computed: {
    loading() {
      return this.$store.state.menu.loading
    }
  }
}
</script>

<style lang="scss" scoped>
.skeleton {
  &__container {
    position: fixed;
  }
  &__inner {
    border: 1px red;
  }
  &__header {
    width: 100rem;
    height: 3.5rem;
    background-color: $color-primary;
  }
  &__body {
    width: 100rem;
    height: 3.5rem;
    background-color: $color-tr-even;
    &__second {
      width: 100rem;
      height: 3.5rem;
      background-color: $color-white;
    }
  }
}
.loader {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

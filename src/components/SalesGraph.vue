<template>
  <h1>매출 그래프</h1>
  <button @click="salesProduct">
    조회
  </button>
  <ul
    v-for="saleItem in salesDetails"
    :key="saleItem.detaildId">
    {{ saleItem.timePaid }}
    {{ saleItem.product.price }}
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('admin', [
      'salesDetails'
    ])
  },
  methods: {
    ...mapActions('admin', [
      'salesProduct'
    ])
  },
  
}
</script>

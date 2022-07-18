<template>
  <h1>매출 그래프</h1>
  <button @click="useInqureyProducts">
    조회
  </button>
  <ul
    v-for="saleItem in salesGraph"
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
      'salesGraph'
    ])
  },
  methods: {
    ...mapActions('admin', [
      'inqureyProducts'
    ]),
    useInqureyProducts() {
      this.inqureyProducts()
    }
  },
  
}
</script>

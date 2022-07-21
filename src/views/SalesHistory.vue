<template>
  <button @click="salesProduct">
    전체 판매 내역
  </button>
  <table>
    <tr>
      <td>No</td>
      <td>구매자</td>
      <td>상품명</td>
      <td>상품가격</td>
      <td>주문일</td>
      <td>구매상태</td>
    </tr>
    <salesList
      v-for="(prodect,index) in salesDetails"
      :key="prodect"
      :index="index"
      :sales="prodect" />
  </table>
</template>

<script>
import salesList from '~/components/SalesList.vue'
export default {
  components: {
    salesList
  },
  computed: {
    salesDetails() {
      return this.$store.state.admin.salesDetails
    }
  },
  mounted() {
    this.salesProduct
  },
  methods: {
    async salesProduct() {
      await this.$store.dispatch('admin/salesProduct')
    }
  }
}
</script>

<style>

</style>

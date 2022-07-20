<template>
  <h1>판매 내역 페이지</h1>
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
      v-for="a in salseDetails"
      :key="a"
      :sales="a" />
  </table>
</template>

<script>
import salesList from '~/components/SalesList.vue'
export default {
  components: {
    salesList
  },
  computed: {
    salseDetails() {
      return this.$store.state.admin.salesDetails
    }
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

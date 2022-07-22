<template>
  <h1>판매 내역</h1>
  <div class="sales-history">
    <button @click="salesProduct">
      전체 판매 내역
    </button>
  </div>
  <div class="table-page">
    <div class="table-wrapper">
      <table>
        <TableSkeletonUI />
        <tr>
          <th>번호</th>
          <th>구매자</th>
          <th>상품명</th>
          <th>상품가격</th>
          <th>주문일</th>
          <th>구매상태</th>
        </tr>
        <salesList
          v-for="(prodect,index) in salesDetails"
          :key="prodect"
          :index="index"
          :sales="prodect" />
      </table>
    </div>
  </div>
</template>

<script>
import salesList from '~/components/SalesList.vue'
import TableSkeletonUI from '~/components/TableSkeletonUI.vue'

export default {
  components: {
    salesList,
    TableSkeletonUI
  },
  computed: {
    salesDetails() {
      return this.$store.state.admin.salesDetails
    },
  },
  created() {
    this.salesProduct()
  },
  methods: {
    async salesProduct() {
      this.$store.dispatch('menu/isShowLoading', true)
      try {
        await this.$store.dispatch('admin/salesProduct')
      } catch (err) {
        alert(err)
      } finally {
        this.$store.dispatch('menu/isShowLoading', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    margin-top: 0;
  }
</style>

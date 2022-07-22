<template>
  <h1>판매 내역</h1>
  <div class="sales-history">
    <button @click="salesProduct">
      전체 판매 내역
    </button>
    <!-- <input
      class="search"
      type="text"
      placeholder="상품을 검색하세요"
      @input="search = $event.target.value" /> -->
  </div>
  <div class="table-page">
    <div class="table-wrapper">
      <table>
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
import { mapState } from 'vuex'
import salesList from '~/components/SalesList.vue'
export default {
  components: {
    salesList
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState('admin', [
      'allProducts'
    ]),
    salesDetails() {
      return this.$store.state.admin.salesDetails
    },
    // salesProducts() {
    //   return this.allProducts.filter(product => {
    //     return product.title.match(this.search)
    //     })
    //   }
  },
  methods: {
    async salesProduct() {
      await this.$store.dispatch('admin/salesProduct')
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    margin-top: 0;
  }
</style>

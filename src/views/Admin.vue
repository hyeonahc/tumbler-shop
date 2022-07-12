<template>
  <h1>제품 조회</h1>
  <RouterLink :to="{ name: 'AddProduct' }">
    제품 추가
  </RouterLink>

  <router-view />
  

  <div>
    <button @click="allProductsLookup">
      전체 제품 보기
    </button>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Product Name</th>
          <th>Product ID</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <AllProductList 
          v-for="product in allProducts"
          :key="product.id"
          :product="product"
          :products="products" />
      </tbody>
    </table>
  </div>
</template>

<script>

import AllProductList from '~/components/AllProductList.vue'
export default {
  components: {
    AllProductList
  },
  computed: {
    allProducts() {
      return this.$store.state.admin.allProducts
    }
  },
  created() {
    this.$store.dispatch('admin/allProductsLookup')
  },
  methods: {
    async allProductsLookup() {
      await this.$store.dispatch('admin/allProductsLookup')
    },
  }
}
</script>

<style>

</style>

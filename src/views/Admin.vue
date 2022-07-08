<template>
  <h1>제품 조회</h1>
  <router-link
    to="/AddProduct">
    제품 추가
  </router-link>

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
        <AllproductList 
          v-for="product in allProducts"
          :key="product.id"
          :product="product"
          :products="products" />
      </tbody>
    </table>
  </div>
</template>

<script>

import AllproductList from '../components/AllproductList.vue'
export default {
  components: {
    AllproductList
  },

  data() {
    return {
     id: ''
    }
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

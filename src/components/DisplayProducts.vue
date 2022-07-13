<template>
  <div class="product-container">
    <div class="product-header">
      <h2>상품</h2>
      <div>
        <input
          type="text"
          placeholder="상품을 검색하세요"
          @input="search = $event.target.value" />
      </div>
    </div>
    <div class="product-content">
      <SingleProduct 
        v-for="product in searchedProducts"
        :key="product.id"
        :product="product" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SingleProduct from './SingleProduct.vue'

export default {
	components: { 
		SingleProduct
	},
	data() {
		return {
			search: '',
		}
	},
	computed: {
		...mapState('admin', [
			'allProducts'
		]),
		searchedProducts: function() {
			return this.allProducts.filter(product => {
				return product.title.match(this.search)
			})
		}
	},
	created() {
		this.allProductsLookup(),
		// 값을 가져올 수 없는 이유는?
		console.log('allProducts', this.allProducts)
	},
	mounted() {
		console.log('searchedProducts', this.searchedProducts)
	},
	methods: {
		...mapActions('admin', [
			'allProductsLookup'
		]),
	},
}
</script>

<style lang="scss" scoped>
.product-container {
	padding: 1.5em;
}
.product-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5em;
}
.product-content {
	display: flex;
	justify-content: space-between;
}
</style>

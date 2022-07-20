<template>
  <div class="product-header">
    <h1>상품</h1>
    <div>
      <input
        type="text"
        placeholder="상품을 검색하세요"
        class="search"
        @input="search = $event.target.value" />
    </div>
  </div>
  <div class="product-content">
    <SingleProduct 
      v-for="product in searchedProducts"
      :key="product.id"
      :product="product" />
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
		searchedProducts() {
			return this.allProducts.filter(product => {
				return product.title.match(this.search)
			})
		}
	},
	created() {
		this.allProductsLookup()
	},
	methods: {
		...mapActions('admin', [
			'allProductsLookup'
		]),
	},
}
</script>

<style lang="scss" scoped>
.product-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5em;
}
.product-content {
	display: flex;
	flex-wrap: wrap;
}
</style>

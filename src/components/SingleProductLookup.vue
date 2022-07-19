<template>
  <div>
    <img
      :src="product.thumbnail"
      :alt="product.title" />
    <div>
      {{ product.title }}
    </div>
    <div>
      {{ product.price }}원
    </div>
    <div> 
      {{ product.description }}
    </div>
    <router-link 
      :to="{ name: 'EditProduct', params: { id: product.id }, query: {title: product.title, price: product.price, thumbnail: product.thumbnail}}">
      상품 수정
    </router-link>
    <button @click="deleteProduct(product.id)">
      제품 삭제
    </button>
  </div>
</template>

<script>
import { publicRequest } from '../api/publicRequest'
export default {
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },

  mounted() {
    this.singleProduct()
  },
  methods: {
    async singleProduct() {
      const res = await publicRequest({
        url: `products/${this.product.id}`,
        method: 'GET'
      })
      console.log(res)
      this.product
    },
      async deleteProduct() {
        const res = await publicRequest({
          url: `products/${this.product.id}`,
        method: 'DELETE'
      })
      console.log(res)
    },
  },
}
</script>

  
<style>

</style>

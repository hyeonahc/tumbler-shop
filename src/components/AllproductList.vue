<template>
  <tr>
    <td>
      <div>
        <img
          :src="
            product.thumbnail
              ? product.thumbnail
              : 'https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif'
          "
          class="img-test"
          alt="" />
        {{ product.title }}
      </div>
    </td>
    <td>
      <div>
        {{ product.id }}
      </div>
    </td>
    <td>
      <div>
        <div>{{ product.price.toLocaleString('ko-KR') }} 원</div>
      </div>
    </td>
    <button @click="deleteProduct(product.id)">
      제품 삭제
    </button>
    <td>
      <router-link 
        :to="{ name: 'EditProduct', params: { id: product.id }, query: {title: product.title, price: product.price, thumbnail: product.thumbnail}}">
        상품 수정
      </router-link>
    </td>
  </tr>
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
  methods: {
    async deleteProduct() {
      const res = await publicRequest({
        url: `products/${this.product.id}`,
        method: 'DELETE'
      })
      console.log(res)
      this.product
    },
        async singleProduct() {
      const res = await publicRequest({
        url: `products/${this.product.id}`,
        method: 'GET'
      })
      console.log(res)
      this.product
    }
  }
}


</script>

<style>
  .img-test {
    width: 100px;
  }
</style>

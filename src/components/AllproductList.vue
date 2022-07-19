<template>
  <tr @click="click">
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
    <td>
      <div>
        {{ product.isSildOut ? '재고 없음' : '재고 있음' }}
      </div>
    </td>
    <div     
      v-if="modal"
      class="black-bg">
      <div class="white-bg">
        <singelProduct
          :product="product" />
      </div>
    </div>
  </tr>
</template>

<script>
import { publicRequest } from '../api/publicRequest'
import singelProduct from './SingleProductLookup.vue'
export default { 
  components: {
     singelProduct
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      modal: false,
    }
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

    click() {
      this.modal = true
    }
  }
}


</script>

<style>
  .img-test {
    width: 100px;
  }

  .black-bg {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    padding: 20px;
    top: 0;
    left: 0;
  }
  .white-bg {
    width: 100%; 
    background: white;
    border-radius: 8px;
    padding: 20px;
  }
</style>

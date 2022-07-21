<template>
  <tr @click="click">
    <td>
      {{ index + 1 }}
    </td>
    <td>
      <div class="productList__img flex-center-vertically">
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
        <span 
          v-if="product.isSoldOut"
          class="status-badge confirm-badge">재고 없음</span>
        <span
          v-else
          class="status-badge cancel-badge">재고 있음</span>
      </div>
    </td>
  </tr>
  <div
    v-if="modal"
    class="black-bg">
    <div class="white-bg flex-center-center">
      <SingleProductLookup
        :product="product" />
    </div>
  </div>
</template>

<script>
import { publicRequest } from '../api/publicRequest'
import SingleProductLookup from './SingleProductLookup.vue'
export default { 
  components: {
     SingleProductLookup
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
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
    },
  }
}


</script>

<style lang="scss">
  .productList__img {
    img {
      width: 2vw;
      margin-right: 1vw;
    }
  }
  .black-bg {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    padding: 20px;
    top: 0;
    left: 0;
      .white-bg {
      width: 50vw;
      height: 60vh; 
      background-color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 5px;
      padding: 2em;
      }
  }
</style>

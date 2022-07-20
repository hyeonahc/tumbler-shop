<template>
  <div>
    <div>
      <i
        class="fa-solid fa-xmark"
        @click="a"></i>
    </div>
    <div>
      <img
        :src="product.thumbnail"
        :alt="product.title" />
      <div>
        {{ product.title }}
      </div>
      <div>
        {{ product.price.toLocaleString('ko-KR') }}원
      </div>
      <div>
        {{ product.description }}
      </div>
    </div>
    <button
      @click="test">
      제품 수정
    </button>
    <div
      v-if="modal"
      class="black">
      <div class="white">
        <EditProduct
          :product="product" />
      </div>
    </div>
    <div>
      <button @click="deleteProduct(product.id)">
        제품 삭제
      </button>
    </div>
  </div>
</template>

<script>
import { publicRequest } from '../api/publicRequest'
import EditProduct from '../components/EditProduct.vue'
export default {
  components: {
    EditProduct,
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      modal: false
    }
  },
  mounted() {
    this.singleProduct()
  },
  methods: {
    // 
    async singleProduct() {
      const res = await publicRequest({
        url: `products/${this.product.id}`,
        method: 'GET'
      })
      console.log(res)
      this.product
    },
    // 제품 삭제
    async deleteProduct() {
      const res = await publicRequest({
        url: `products/${this.product.id}`,
      method: 'DELETE'
    })
      console.log(res)
      alert('제품 삭제')
      this.$router.go(0)
    },
    test() {
      this.modal = true
    },
    a() {
      this.$router.go(0)
    }
  },
}
</script>

  
<style lang="scss" scoped>
  .fa-solid {
    font-size: 20px;
  }
  .white {
    width: 60vw;
    height: 70vh;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 5px;
    padding: 2em;
  }
</style>

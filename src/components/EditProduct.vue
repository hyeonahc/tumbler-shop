<template>
  <h1>상품 수정!!!</h1>

  <form>
    <div>
      <label for="title">상품 이름</label>
      <input
        id="title"
        v-model="title"
        type="text" />
    </div>
    <div>
      <label for="price">상품 가격</label>
      <input
        id="price"
        v-model="price"
        type="text" />
    </div>
    <div>
      <label for="description">상품 설명</label>
      <input
        id="description"
        v-model="description"
        type="text" />
    </div>
    <div>
      <button @click.prevent="editProduct">
        수정하기
      </button>
    </div>
  </form>
</template>

<script>
import { request, commonRequst } from '../api/adminProductApi'
export default {
  data() {
    return{
      title: '',
      price: '',
      description: '',
      tags:'',
      thumbnailBase64: '',
      isSoldOut: ''
    }
  },

  mounted() {
    this.productLookup()
  },
  methods: {

    // 수정할 제품 정보
    async productLookup() {
      const payload = await request(this.$route.params.id)
        this.title = payload.title,
        this.price = payload.price,
        this.description = payload.description,
        this.tags = payload.tags
    },
    // 수정사항
    async editProduct() {
      await commonRequst(this.$route.params.id,{      
        title: this.title,
        price: this.price,
        description: this.description,
        tags: this.tags,
      })
      this.productLookup()
    },
  }
}
</script>

<style>

</style>

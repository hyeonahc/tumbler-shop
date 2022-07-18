<template>
  <h1>상품 수정!!!</h1>

  <form>
    <div>
      <label for="title">상품 제목</label>
      <input
        id="title"
        v-model="title"
        type="text"
        name="title" />
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
      <label for="tags">상품 태그</label>
      <input
        id="tags"
        v-model="tags" 
        type="text" />
    </div>
    <div>
      <label for="thumbnail">상품 썸네일</label>
      <input
        id="thumbnail"
        src="thumbnail"
        type="file"
        @change="selectFile" />
    </div>
  </form>
  <div>
    <button @click.prevent="editProduct">
      수정하기
    </button>
    <button @click.prevent="backWards">
      뒤로가기
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
  data() {
    return{
      productId: this.$route.params.id,
      title: '',
      price: '',
      description: '',
      tags:'',
      thumbnailBase64: null,
      isSoldOut: false
    }
  },

  mounted() {
      this.productLookup()
    },

  methods: {
    // 수정할 제품 정보
    async productLookup() {
      const res = await publicRequest({
        url:`products/${this.productId}`,
        method: 'GET',
      })
      this.title = res.title
      this.price = res.price
      this.description = res.description
      this.tags = res.tags
      this.thumbnailBase64 = res.thumbnailBase64
    },

    // 수정 사항
    async editProduct() {
      const obj = await publicRequest ({
        url:`products/${this.productId}`,
        method: 'PUT',
        body: {
          title: this.title,
          price: this.price,
          description: this.description,
          tags: this.tags,
          thumbnailBase64: this.thumbnailBase64,
        }
      })
      this.productLookup()
      console.log(obj)
    },

    backWards() {
      this.$router.go(-1)
    },
    selectFile(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          if (event.target.id === 'thumbnail') {
            this.thumbnailBase64 = reader.result
          } 
        })
      }
    },

  }
}
</script>

<style>

</style>

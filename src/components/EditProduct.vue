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
      <label for="isSoldOut">재고 현황</label>
      <select
        id="isSoldOut"
        v-model="isSoldOut"
        name="isSoldOut">
        <option :value="true">
          재고 있음
        </option>
        <option :value="false">
          재고 없음
        </option>
      </select>
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
import { mapState } from 'vuex'
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
      title: '',
      price: '',
      description: '',
      thumbnailBase64: null,
      isSoldOut: false
    }
  },

    computed: {
      ...mapState('admin', [
        'allProducts'
      ])
    },
  mounted() {
      this.productLookup()
    },

  methods: {
    // 수정할 제품 정보
    async productLookup() {
      const res = await publicRequest({
        url:`products/${this.product.id}`,
        method: 'GET',
      })
      this.title = res.title
      this.price = res.price
      this.description = res.description
      this.thumbnailBase64 = res.thumbnailBase64
      this.isSoldOut = res.isSoldOut
      console.log(res)
    },

    // 수정 사항
    async editProduct() {
      const obj = await publicRequest ({
        url:`products/${this.product.id}`,
        method: 'PUT',
        body: {
          title: this.title,
          price: this.price,
          description: this.description,
          thumbnailBase64: this.thumbnailBase64,
          isSoldOut: Boolean(this.isSoldOut)
        }
      })
      console.log(obj)
      alert('수정 완료')
      this.$router.go(0)
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

<template>
  <div class="input-product__wrap">
    <form
      class="input-product__form"
      name="input"
      @submit.prevent="addProduct">
      <div class="input-product__img">
        <label
          for="thumbnail">
          썸네일</label>
        <input
          id="thumbnail"
          type="file"
          @change="selectFile" />
      </div>
      <div class="input-product__input">
        <label for="title">제목</label>
        <input
          id="title"
          v-model="title"
          type="text"
          placeholder="제목" />
        
        <label for="price">가격</label>
        <input
          id="price"
          v-model="price"
          type="text"
          placeholder="가격" />
        <label for="description">제품 설명</label>
        <input
          id="description"
          v-model="description"
          type="text"
          placeholder="상품 상세 설명" />
        <div>
          <button
            type="submit">
            업데이트
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { publicRequest } from '../api/publicRequest' 

export default {
  data() {
    return {
      title: '',
      price: '',
      description: '',
      thumbnailBase64: '',
    }
  },

  computed: {
    ...mapState('admin', [
      'allProducts'
    ])
  },

  methods: {
    ...mapMutations([
      'assignState'
    ]),
    async addProduct() {
      const res = await publicRequest ({
        url: 'products',
        method: 'POST',
        body: {
          title: this.title,
          price: Number(this.price),
          description: this.description,
          thumbnailBase64: this.thumbnailBase64,
        }
      })
      alert('제품 추가')
      this.$router.go(0)
      console.log(res)
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

<style lang="scss" scoped>

  .input-product {
    &__wrap {
      display: flex;
      justify-content: center;
      align-content: center;
      width: 100%;
      height: 100%;

    }
    &__form {
      display: flex;
      justify-content: center;
      align-content: center;
    }
    &__img {

    }
    &__input {

    }

  }

</style>



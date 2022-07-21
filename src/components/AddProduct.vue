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
        <i class="fa-solid fa-images"></i>
        <span>이미지 업로드하기</span>
      </div>
      <div class="input-product__input">
        <div class="input-product__input--title">
          <label for="title"></label>
          <input
            id="title"
            v-model="title"
            type="text"
            placeholder="제목을 입력해주세요" />
        </div>
        
        <div class="input-product__input--price">
          <label for="price"></label>
          <input
            id="price"
            v-model="price"
            type="text"
            placeholder="가격을 입력해주세요" />
        </div>

        <div class="input-product__input--description"> 
          <label for="description"></label>
          <textarea
            id="description"
            v-model="description"
            type="text"
            placeholder="상품 상세 설명을 입력해주세요">
          </textarea>
        </div>
        <div class="input-product__input--button">
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

  @mixin flexColumn {
    display: flex;
    flex-direction: column;
  }
  @mixin inputSize {
    width: 40vw;
    margin: 6px 0;
  }
  .input-product {
    &__wrap { 
      width: 100%;
      height: 100%;
    }
    &__form {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 100%;
    }
    &__img {
      position: relative;
      label {
        display: none;
      }
      input {
        text-indent: -9999px;
        height: 320px;
        width: 15vw;
        border: 2px dashed $color-success;
      }
      .fa-solid {
        color: $color-success;
        position: absolute;
        top: 46%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 80px;
        z-index: -999;
      }
      span {
        color: $color-success;
        font-weight: $font-medium;
        position: absolute;
        top: 70%;
        left: 20%;
        transform: translate(0%, -50%);
      }
    }
    &__input {
      height: 45vh;
      &--title {
        @include flexColumn;
        label {

        }
        input {
          @include inputSize;
        }
      }

      &--price {
        @include flexColumn;
        label {

        }
        input {
          @include inputSize;
        }
      }

      &--description {
        @include flexColumn;
        label {
          margin-bottom: 8px;
        }
        textarea {
          width: 40vw;
          height: 20vh;
        }
        ::placeholder {
          color: $color-input;
          font-size: $font-paragraph;
          font-weight: $font-normal;
        }
      }

      &--button {

      }

    }

  }

</style>



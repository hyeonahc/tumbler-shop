<template>
  <div class="add-product__wrap flex-center-center">
    <form
      class="add-product__form"
      name="input"
      @submit.prevent="addProduct">
      <div 
        class="layer"
        @click="$emit('layer-popup')">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div class="add-product__img">
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
      <div class="add-product__input">
        <div class="add-product__input--title">
          <label for="title"></label>
          <input
            id="title"
            v-model="title"
            type="text"
            placeholder="제목을 입력해주세요" />
        </div>
        
        <div class="add-product__input--price">
          <label for="price"></label>
          <input
            id="price"
            v-model="price"
            type="text"
            placeholder="가격을 입력해주세요" />
        </div>

        <div class="add-product__input--description"> 
          <label for="description"></label>
          <textarea
            id="description"
            v-model="description"
            type="text"
            placeholder="상품 상세 설명을 입력해주세요">
          </textarea>
        </div>
        <div class="add-product__input--button">
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
  emits: ['layer-popup'],
  data() {
    return {
      modal: false,
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
    width: 100%;
  }
  .add-product {
    &__wrap { 
      width: 100%;
      height: 100%;
    }
    &__form {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 80%;
      width: 100%;
      .layer {
        position: absolute;
        right: 3rem;
        top: 2vh;
        &:hover {
          cursor: pointer;
        }
        .fa-solid {
          font-size: 3rem;
        }
      }
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
        border: 2px dashed $color-primary;
      }
      .fa-images {
        color: $color-primary;
        position: absolute;
        top: 46%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 80px;
        z-index: -999;
      }
      span {
        color: $color-primary;
        font-weight: $font-medium;
        position: absolute;
        top: 70%;
        left: 20%;
        transform: translate(0%, -50%);
      }
    }
    &__input {
      height: 44vh;
      width: 66%;
      textarea:focus-visible,
      input:focus-visible {
        border: 1px solid $color-primary;
        outline: none
      }
      &--title {
        @include flexColumn;
        input {
          @include inputSize;
          margin-bottom: 8px;
        }
      }
      &--price {
        @include flexColumn;
        input {
          @include inputSize;
          margin: 20px 0
        }
      }
      &--description {
        @include flexColumn;
        label {
          margin-bottom: 8px;
        }
        textarea {
          @include inputSize;
          height: 20vh;
          line-height: 1.7;
          font-size: $font-paragraph;
        }
        ::placeholder {
          color: $color-input;
          font-size: $font-paragraph;
          font-weight: $font-normal;
        }
      }
    }
  }
</style>



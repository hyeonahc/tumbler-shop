<template>
  <div class="edit-product__wrap">
    <div 
      class="layer"
      @click="$emit('layer-popup')">
      <i class="fa-solid fa-xmark"></i>
    </div>
    <form class="edit-product__form">
      <div class="edit-product__img">
        <label for="thumbnail">상품 썸네일</label>
        <input
          id="thumbnail"
          src="thumbnail"
          type="file"
          @change="selectFile" />
        <i class="fa-solid fa-images"></i>
        <span>이미지 변경하기</span>
      </div>
      <div class="edit-product__input">
        <div class="edit-product__input--title">
          <label for="title">상품 이름</label>
          <input
            id="title"
            v-model="title"
            type="text"
            name="title"
            placeholder="제목을 입력해주세요" />
        </div>
        <div class="edit-product__input--price">
          <label for="price">가격</label>
          <input
            id="price"
            v-model="price"
            type="text"
            placeholder="가격을 입력해주세요" />
        </div>
        <div class="edit-product__input--issoldout">
          <label for="isSoldOut">재고 현황</label>
          <select
            id="isSoldOut"
            v-model="isSoldOut"
            name="isSoldOut">
            <option
              :value="false">
              재고 있음
            </option>
            <option :value="true">
              재고 없음
            </option>
          </select>
        </div>
        <div class="edit-product__input--description">
          <label for="description">상품 상세 설명</label>
          <textarea
            id="description"
            v-model="description"
            type="text"
            placeholder="상품 상세 설명을 입력해주세요">
          </textarea>
        </div>
        <div>
          <button @click.prevent="editProduct">
            수정하기
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { publicRequest } from '~/api/publicRequest'

export default {
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['layer-popup'],
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
    }
  }
}
</script>

<style lang="scss" scoped>
 @mixin flexColumn {
    display: flex;
    flex-direction: column;
  }
  @mixin inputSize {
    width: 30vw;
  }
  .edit-product {
   &__wrap { 
      width: 100%;
      height: 100%;
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
        height: 300px;
        width: 15vw;
        border: 2px dashed $color-primary;
      }
      .fa-solid {
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
        transform: translate(16%, -50%);
      }
    }
    &__input {
      margin-left: 2vw;
      height: 45vh;
      textarea:focus-visible,
      input:focus-visible {
        border: 1px solid $color-primary;
        outline: none
      }
      label {
        margin-bottom: 10px;
      }

      &--title,
      &--price,
      &--issoldout,
      &--description {
        margin-bottom: 8px
      }
      &--title {
        @include flexColumn;
        input {
          @include inputSize;
        }
      }

      &--price {
        @include flexColumn;
        input {
          @include inputSize;
        }
      }
      &--issoldout {
        @include flexColumn;
        select {
          border: 1px solid #C5C5C5;
          border-radius: 5px;
          padding: 0.4em 0.5em;
        }
      }
      &--description {
        @include flexColumn;
        textarea {
          width: 30vw;
          height: 12vh;
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

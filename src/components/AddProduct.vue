<template>
  <div>
    <form @submit.prevent="addProduct">
      <input
        v-model="title"
        type="text"
        placeholder="제목" />
      <input
        v-model="price"
        type="text"
        placeholder="가격" />
      <input
        v-model="description" 
        type="text"
        placeholder="상품 상세 설명" />
      <!-- <input
        v-model="tags" 
        type="text"
        placeholder="태그" /> -->
      <!-- <input type="file" /> -->
      <div>
        <button
          type="submit">
          업데이트
        </button>
        <button @click="backWards">
          뒤로가기
        </button>
      </div>
    </form>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      title: '',
      price: '',
      description: '',
      // tags:'',
      // thumbnailBase64: '',
    }
  },

  methods: {
   async addProduct() {
      const obj = {
        title: 'test',
        price: 4334,
        description: 'test',
        // tags: this.tags.split(','),
        // thumbnailBase64: this.thumbnailBase64,
      }
      this.$store.dispatch('admin/addProduct', obj)
      console.log(obj)
    },
    backWards() {
      this.$router.go(-1)
    },
  }
}
</script>

<style>

</style>



<template>
  <div>
    <form
      name="input"
      @submit.prevent="addProduct">
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
      <input
        v-model="tags" 
        type="text"
        placeholder="태그" />
      <input
        id="thumbnail"
        type="file"
        @change="selectFile" />
      <div>
        <button
          type="submit">
          업데이트
        </button>
      </div>
    </form>
    <button @click="backWards">
      뒤로가기
    </button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '',
      price: '',
      description: '',
      tags:'',
      thumbnailBase64: '',
      photoBase64: '',
    }
  },

  methods: {
   async addProduct() {
      const payload = {
        title: this.title,
        price: this.price,
        description: this.description,
        tags: this.tags.split(','),
        thumbnailBase64: this.thumbnailBase64,
        photoBase64: this.photoBase64,
      }
      this.$store.dispatch('admin/addProduct', payload)
    },
    backWards() {
      this.$router.go(-1)
    },
    selectFile(event) {
      const reader = new FileReader()
      for (const file of event.target.files) {
        console.log(file)
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          console.log(e.target.result)
        })
      }
    },
  }
}
</script>

<style>

</style>



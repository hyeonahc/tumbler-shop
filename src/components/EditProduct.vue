<template>
  <h1>상품 수정!!!</h1>

  <form>
    <div>
      <input
        v-model="title"
        type="text" />
    </div>
    <div>
      <input
        v-model="price"
        type="text" />
    </div>
    <div>
      <input
        v-model="description"
        type="text" />
    </div>
    <div>
      <button>
        수정하기
      </button>
    </div>
  </form>
</template>

<script>
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

  // mounted() {
  //   this.productLookup()
  // },
  methods: {
    // 수정할 제품 정보
    // async productLookup(id) {
    //   const  { payload }  = await this.$store.dispatch('admin/allProductsLookup', {
    //     id: id
    //   })
    //     this.title = payload.title,
    //     this.price = payload.price,
    //     this.description = payload.description,
    //     this.tags = payload.tags
    //     console.log(payload)
    // },
    // 수정사항
    async geteditProduct() {
      this.$store.dispatch('admin/editProduct',{      
        title: this.title,
        price: this.price,
        description: this.description,
        tags: this.tags,
      })
    },
  }
}
</script>

<style>

</style>

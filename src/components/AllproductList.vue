<template>
  <tr>
    <td>
      <div>{{ product.title }}</div>
    </td>
    <td>
      <div>
        {{ product.id }}
      </div>
    </td>
    <td>
      <div>
        <div>{{ product.tags }}</div>
      </div>
    </td>
    <td>
      <div>
        <div>{{ product.price }} 원</div>
        <div>{{ product.description }}</div>
      </div>
    </td>
    <button @click="deleteProduct(product.id)">
      제품 삭제
    </button>
    <td>
      <router-link 
        :to="{ name: 'EditProduct', params: { id: product.id }}">
        상품 수정
      </router-link>
    </td>
  </tr>
</template>

<script>

export default { 
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    async deleteProduct(id) {
      await this.$store.dispatch('admin/deleteProduct', {
        id : id
      })
    },
  }
}


</script>

<style>

</style>

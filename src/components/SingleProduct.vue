<template>
  <div class="product-wrapper">
    <RouterLink
      :to="{
        name: 'productdetail',
        params: { id: product.id },
      }"
      class="thumbnail">
      <span>
        thumbnail
      </span>
    </RouterLink>
    <p class="product-title">
      {{ product.title }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.product-wrapper {
  display: flex;
  flex-direction: column;
  width: 200px;
}
.thumbnail {
  background-color: #dddee5;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.75em;
}
.product-title {
  text-align: center;
}
</style>

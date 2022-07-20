<template>
  <div class="product-wrapper">
    <RouterLink
      :to="{
        name: 'productdetail',
        params: { id: product.id },
      }"
      class="thumbnail-parent">
      <div
        class="thumbnail-child"
        :style="{ backgroundImage: `url(${ product.thumbnail })` }"></div>
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
}
.thumbnail-parent {
  margin-bottom: 0.75em;
  width: 300px; 
  height: 300px;
  &:hover .thumbnail-child,
  &:focus .thumbnail-child {
      transform: scale(1.2);
  }
  .thumbnail-child {
    width: 100%;
    height: 100%;
    background-color: black;
    background-position: center;
    background-size: cover;
    transition: all .5s;
  }
}
.product-title {
  text-align: center;
}
</style>

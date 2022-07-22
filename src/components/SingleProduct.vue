<template>
  <div class="product-wrapper flex-center-vertically">
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
    <p class="product-title text-center">
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
.product-wrapper.flex-center-vertically {
  display: flex;
  flex-direction: column;
}
.thumbnail-parent {
  width: 13em; 
  height: 13em;
  margin-bottom: 3em;
  &:hover .thumbnail-child,
  &:focus .thumbnail-child {
    transform: scale(1.1);
  }
  .thumbnail-child {
    width: 100%;
    height: 100%;
    background-color: $color-white;
    background-position: center;
    background-size: cover;
    transition: all .5s;
  }
}

@media only screen and (min-width: 1540px) {
  .thumbnail-parent {
    width: 230px; 
    height: 230px;
  }
}
</style>

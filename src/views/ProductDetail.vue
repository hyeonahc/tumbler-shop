<template>
  <TheHeader />
  <div class="product-wrapper">
    <div
      class="thumbnail">
      <img
        :src="product.thumbnail"
        :alt="product.title" />
    </div>
    <div class="content">
      <h2>제목: {{ product.title }}</h2>
      <hr />
      <p>가격: {{ product.price }}</p>
      <p>설명: {{ product.description }}</p>
      <button
        @click="purchase">
        구매하기
      </button>
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'
import { publicRequest } from '../api/publicRequest'
import { mapState } from 'vuex'

export default {
	components: {
		TheHeader
	},
	data() {
		return {
			product: {}
		}
	},
	computed: {
    ...mapState('user', [
      'isLogIn',
    ]),
  },
	created() {
		this.getProductDetail()
	},
	methods: {
		async getProductDetail() {
			const res = await publicRequest({
				url: `products/${this.$route.params.id}`,
				method: 'GET',
			})
			this.product = res
		},
		purchase() {
			if(!this.isLogIn) {
				console.log('로그인 필요')
				alert('로그인 필요')
				this.$router.push('/signin')
				return
			}
			this.$router.push({ name: 'requestpurchase', params: { id: this.product.id }, query: {title: this.product.title, price: this.product.price, thumbnail: this.product.thumbnail} })
		}
	}
}
</script>

<style lang="scss" scoped>
.product-wrapper {
  display: flex;
	align-items: center;
	justify-content: center;
}
.thumbnail {
	width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.75em;
}
</style>

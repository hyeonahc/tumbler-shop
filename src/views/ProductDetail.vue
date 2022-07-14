<template>
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
import { mapState } from 'vuex'

export default {
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
		this.commonRequst()
		console.log('this.$route.params.id: ', this.$route.params.id)
		console.log('isLogin: ', this.isLogIn)
	},
	methods: {
		async commonRequst() {
			let res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${this.$route.params.id}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					'apikey': 'FcKdtJs202204',
					'username': 'TEAM_1',
					masterKey: true,
				},
			})
			res = await res.json()
			this.product = res
			console.log('product: ', this.product)
		},
		purchase() {
			console.log('구매하기')
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

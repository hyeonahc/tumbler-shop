<template>
  <div>
    <h1>구매내역</h1>
    <div>
      <input
        type="text"
        placeholder="상품을 검색하세요"
        @input="search = $event.target.value" />
    </div>
    <PurchaseHistoryTable :searched-products="searchedProducts" />
  </div>
</template>

<script>
import PurchaseHistoryTable from './PurchaseHistoryTable.vue'
import { publicRequest } from '../api/publicRequest'

export default {
	components: {
		PurchaseHistoryTable
	},
	data() {
		return {
			search: '',
			purchasedProducts: [],
		}
	},
	computed: {
		searchedProducts() {
			return this.purchasedProducts.filter(product => {
				return product.title.match(this.search)
			})
		}
	},
	created() {
		this.getPurchaseHistory()
	},
	methods: {
		async getPurchaseHistory() {
			const res = await publicRequest({
				url: 'products/transactions/details',
				method: 'GET',
			})
			this.createPurchasedProducts(res)
		},
		createPurchasedProducts(res) {
			const purchaseHistoryLists = res.sort((a, b) => new Date(a.timePaid) - new Date(b.timePaid))
			purchaseHistoryLists.forEach(purchaseHistoryList => {
				let { product: {title, price}, timePaid, done, isCanceled, detailId } = purchaseHistoryList
				price = price.toLocaleString('ko-KR')
				timePaid = this.$dayjs(timePaid).format('YYYY년 MM월 DD일 HH시 mm분')
				let status
				if(done === false) {
					status = '구매신청'
					if(isCanceled === true) {
						status = '구매취소'
					}
				} else if(done === true) {
					status = '구매확정'
				}
				const info =  {
					title: title,
					price: price,
					time: timePaid,
					status: status,
					id: detailId
				}
				this.purchasedProducts.push(info)
			})
		},
	}
}
</script>

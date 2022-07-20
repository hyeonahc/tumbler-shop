<template>
  <div class="table-page">
    <h1>구매내역</h1>
    <div>
      <input
        class="search"
        type="text"
        placeholder="상품을 검색하세요" />
    </div>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>번호</th>
          <th>상품명</th>
          <th>상품가격</th>
          <th>주문일</th>
          <th>구매확정</th>
          <th>구매취소</th>
          <th>구매상태</th>
        </tr>
        <tr
          v-for="purchasedProduct in purchasedProducts"
          :key="purchasedProduct.id">
          <td>{{ purchasedProducts.indexOf(purchasedProduct) + 1 }}</td>
          <td>{{ purchasedProduct.title }}</td>
          <td>{{ purchasedProduct.price }} 원</td>
          <td>{{ purchasedProduct.time }}</td>
          <td>
            <span
              v-show="purchasedProduct.status === '구매신청'"
              class="action-btn confirm-btn"
              @click="confirmPurchase(purchasedProduct)">구매확정</span>
          </td>
          <td>
            <span
              v-show="purchasedProduct.status === '구매신청'"
              class="action-btn cancel-btn"
              @click="cancelPurchase(purchasedProduct)">구매취소</span>
          </td>
          <td>
            <span
              v-if="purchasedProduct.status === '구매신청'"
              class="status-badge request-badge">{{ purchasedProduct.status }}</span>
            <span
              v-else-if="purchasedProduct.status === '구매확정'"
              class="status-badge confirm-badge">{{ purchasedProduct.status }}</span>
            <span
              v-else
              class="status-badge cancel-badge">{{ purchasedProduct.status }}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { publicRequest } from '~/api/publicRequest'

export default {
	data() {
		return {
			purchasedProducts: [],
		}
	},
	watch: {
		purchasedProducts(value) {
			console.log(value)
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
			// console.log('res: ', res)
			this.createPurchasedProducts(res)
		},
		createPurchasedProducts(purchaseHistoryLists) {
			// console.log('purchaseHistoryLists: ', purchaseHistoryLists)
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
				// console.log(info)
				this.purchasedProducts.push(info)
				// console.log(this.purchasedProducts)
			})
		},
		async confirmPurchase(purchasedProduct) {
			const body = {
				detailId: purchasedProduct.id
			}
			const res = await publicRequest({
				url: 'products/ok',
				method: 'POST',
				body: body
			})
			console.log(res)
			if(res === true) {
				alert('구매가 확정되었습니다.')
				this.$router.go()
			} else {
				alert(res.error)
			}
		},
		async cancelPurchase(purchasedProduct) {
			const body = {
				detailId: purchasedProduct.id
			}
			const res = await publicRequest({
				url: 'products/cancel',
				method: 'POST',
				body: body
			})
			console.log(res)
			if(res === true) {
				alert('구매가 취소되었습니다.')
				this.$router.go()
			} else {
				alert(res.error)
			}
		}
	}
}
</script>

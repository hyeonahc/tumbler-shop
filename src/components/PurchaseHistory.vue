<template>
  <div>
    <h1>구매내역</h1>
    <div>
      <input
        type="text"
        placeholder="상품을 검색하세요"
        @input="search = $event.target.value" />
    </div>
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
        v-for="product in searchedProducts"
        :key="product.id">
        <td>{{ searchedProducts.indexOf(product) + 1 }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.price }} 원</td>
        <td>{{ product.time }}</td>
        <td>
          <span
            v-show="product.status === '구매신청'"
            class="confirm-btn"
            @click="confirmPurchase(product)">구매확정</span>
        </td>
        <td>
          <span
            v-show="product.status === '구매신청'"
            class="cancel-btn"
            @click="cancelPurchase(product)">구매취소</span>
        </td>
        <td>
          <span
            v-if="product.status === '구매신청'"
            class="status-badge request-badge">{{ product.status }}</span>
          <span
            v-else-if="product.status === '구매확정'"
            class="status-badge confirm-badge">{{ product.status }}</span>
          <span
            v-else
            class="status-badge cancel-badge">{{ product.status }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { publicRequest } from '../api/publicRequest'

export default {
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
		async confirmPurchase(purchasedProduct) {
			const body = {
				detailId: purchasedProduct.id
			}
			const res = await publicRequest({
				url: 'products/ok',
				method: 'POST',
				body: body
			})
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

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 900px;
	font-size: 16px;

	tr {
		&:nth-child(even){
			background-color: #f2f2f2;
		}
		&:hover {
			background-color: #ddd;
		}
	}

	th {
		padding-top: 12px;
		padding-bottom: 12px;
		text-align: left;
		background-color: #2C6634;
		color: white;
	}

	th, td {
		border: 1px solid #ddd;
    padding: 10px;
	}

	.confirm-btn, .cancel-btn {
		text-decoration: underline;
		cursor: pointer
	}

	.confirm-btn {
		color: #2C6634
	}

	.cancel-btn {
		color: #FF6347
	}

	.status-badge {
		padding: 5px 10px;
		border-radius: 25px;
		&.request-badge {
			background-color: #FEF7E6;
			color: #FAAE00;
		}

		&.confirm-badge {
			background-color: #F4F9F3;
			color: #2C6634;
		}
		&.cancel-badge {
			background-color: #FFEFEC;
			color: #FF6347;
		}
	}
}
</style>

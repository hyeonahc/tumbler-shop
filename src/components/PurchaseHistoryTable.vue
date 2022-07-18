<template>
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
</template>

<script>
import { publicRequest } from '../api/publicRequest'

export default {
	props: {
    searchedProducts: {
      type: Array,
      required: true
    },
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

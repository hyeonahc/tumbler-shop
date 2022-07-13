<template>
  <div class="product-wrapper">
    <div
      class="thumbnail">
      <span>
        thumbnail
      </span>
    </div>
    <div class="content">
      <p>제목: {{ $route.query.title }}</p>
      <p>가격: {{ $route.query.price }} 원</p>
    </div>
  </div>
  <div v-if="!accountsLength">
    <p>제품을 구매하기 전 계좌를 등록하세요</p>
    <button @click="addAccount">
      계좌등록하기
    </button>
  </div>
  <div v-else>
    <p>계좌를 선택하세요</p>
    <div
      v-for="account in accounts"
      :key="account.id"
      :account="account">
      <input
        :id="account.id"
        name="account"
        :value="account.id"
        type="radio"
        @click="setSelectedAccount" />
      <label :for="account.id">(( {{ account.bankName }} ))</label>
      <span> 계좌번호 : {{ account.accountNumber }} / </span>
      <span> 잔액 : {{ account.balance.toLocaleString('ko-KR') }} 원 </span>
    </div>
    <button @click="requestPurchase">
      해당 계좌로 결제하기
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import { commonRequst } from '~/store/admin'

export default {
  data() {
    return {
      accounts: [],
      selectedAccount: '',
    }
  },
  computed: {
    ...mapState('bank', [
      'userAccountInfo',
    ]),
    ...mapState('user', [
      'isLogIn',
    ]),
    accountsLength() {
      return this.accounts.length
    }
  },
  created() {
    // this.accountBalance()
    this.getAccountInfo()
  },
	methods: {
    ...mapActions('bank', [
      'accountBalance' 
    ]),
    async purchaseProduct(body) {
      const accessToken = window.localStorage.getItem('token')
			const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/buy', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					'apikey': 'FcKdtJs202204',
					'username': 'TEAM_1',
          authorization: `Bearer ${accessToken}`
				},
        body: JSON.stringify(body)
			})
      return await res.json()
		},
    async getAccountInfo() {
      await this.accountBalance()
      // console.log('userAccountInfo: ', this.userAccountInfo)
      this.accounts = this.userAccountInfo.accounts
      console.log('accounts: ', this.accounts)
      console.log('accountsLength: ', this.accountsLength)
    },
    addAccount() {
      console.log('계좌 등록하기')
      this.$router.push({name: 'myAccount'})
		},
    // selectedAccount 변수에 선택한 계좌의 id 넣기
    setSelectedAccount(e) { 
      this.selectedAccount = e.target.value
      console.log('selectedAccount: ', this.selectedAccount)
    },
    async requestPurchase() {
      console.log('해당 계좌로 결제하기')
      console.log('accounts: ', this.accounts)
      const obj = {
        productId : this.$route.params.id,
        accountId : this.selectedAccount
      }
      console.log('obj: ', obj)
      try {
        const res = await this.purchaseProduct(obj)
        console.log('res: ', res)
        // 잔액이 충분할때와 그렇지 않을때
        if(res === true) {
          alert('결제가 성공했습니다. my page에서 구매확정버튼을 눌러주세요')
          this.$router.push('/mypage')
        } else {
          alert('잔액이 부족합니다. 다른 계좌를 이용해주세요.')
        }
      } catch(error){
        console.log('error: ', error)
      }  
    }
  }
}
</script>

<style lang="scss" scoped>
.product-wrapper {
  display: flex;
  margin-bottom: 1em;
}
.thumbnail {
  background-color: #dddee5;
  height: 250px;
	width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.75em;
}
</style>
<template>
  <TheHeader />
  <div class="container">
    <h1>상품결제</h1>
    <table>
      <tr>
        <th>제품사진</th>
        <th>제품명</th>
        <th>가격</th>
      </tr>
      <tr>
        <td>
          <img
            :src="$route.query.thumbnail"
            :alt="$route.query.title" />
        </td>
        <td>{{ $route.query.title }}</td>
        <td>{{ $route.query.price.toLocaleString('ko-KR') }} 원</td>
      </tr>
    </table>
    <div class="account-list">
      <div
        v-if="!accountsLength"
        class="account-empty flex-center-vertically">
        <p>등록된 계좌가 없습니다. 마이페이지 > 내 계좌에서 계좌 등록을 해주세요.</p>
        <button @click="addAccount">
          계좌등록
        </button>
      </div>
      <div
        v-else
        class="account-registered flex-center-vertically">
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
          <label :for="account.id">(( {{ account.bankName }} )) 계좌번호 : {{ account.accountNumber }} 잔액 : {{ account.balance.toLocaleString('ko-KR') }} 원</label>
        </div>
        <button @click="requestPurchase">
          해당 계좌로 결제하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'
import { publicRequest } from '~/api/publicRequest'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
		TheHeader
	},
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
    this.getAccountInfo()
  },
	methods: {
    ...mapActions('bank', [
      'accountBalance' 
    ]),
    async getAccountInfo() {
      await this.accountBalance()
      this.accounts = this.userAccountInfo.accounts
      console.log('accounts: ', this.accounts)
      console.log('accountsLength: ', this.accountsLength)
    },
    addAccount() {
      console.log('계좌 등록하기')
      this.$router.push('/mypage')
		},
    // selectedAccount 변수에 선택한 계좌의 id 넣기
    setSelectedAccount(e) { 
      this.selectedAccount = e.target.value
      console.log('selectedAccount: ', this.selectedAccount)
    },
    async requestPurchase() {
      console.log('해당 계좌로 결제하기')
      console.log('accounts: ', this.accounts)
      const info = {
        productId : this.$route.params.id,
        accountId : this.selectedAccount
      }
      console.log('info: ', info)
      try {
        const res = await publicRequest({
          url: 'products/buy',
          method: 'POST',
          body: info
        })
        console.log('res: ', res)
        // 잔액이 충분할때와 그렇지 않을때
        if(res === true) {
          alert('결제가 성공했습니다. 마이페이지에서 구매확정버튼을 눌러주세요')
          this.$router.push('/mypage')
        } else if(res === '매진된 제품입니다.') {
          alert('죄송합니다. 매진된 제품입니다.')
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
table {
  width: 100%;
  margin-bottom: 2em;
  tr {
    text-align: center;
    th {
      text-align: center;
    }
    td {
      background-color: $color-white;
      vertical-align: middle;
      img {
        width: 5em;
      }
    }
  }
}
.account-list {
  background-color: $color-primary-light;
  padding: 5em;
  .flex-center-vertically {
    flex-direction: column;
  }
  input {
    width: 1em;
  }
}
</style>

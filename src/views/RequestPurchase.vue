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
        <td>{{ parseInt($route.query.price).toLocaleString('ko-KR') }} 원</td>
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
        <div class="flex-center-vertically">
          <div
            v-for="(account, index) in accounts"
            :key="account.id"
            :account="account">
            <div
              :id="selectBankName(account.bankCode)"
              ref="bankcards"
              class="bank-card"
              @click="setSelectedAccount(account.id, index)">
              <div class="flex-wrapper">
                <img
                  :src="account.logo"
                  :alt="account.logo" />
                <div class="bank-number">
                  {{ account.accountNumber }}
                </div>
              </div>
              <div class="bank-balance">
                {{ account.balance.toLocaleString('ko-KR') }} 원
              </div>
            </div>
          </div>
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
      'accountBalance',
    ]),
    async getAccountInfo() {
      await this.accountBalance()
      this.accounts = this.userAccountInfo.accounts
    },
    addAccount() {
      this.$router.push('/mypage')
      window.sessionStorage.setItem('menu', '내 계좌')
		},
    selectBankName(bankCode) {
      switch (bankCode) {
        case '004':
          return 'bank-kb'
        case '088':
          return 'bank-shinhan'
        case '020':
          return 'bank-woori'
        case '081':
          return 'bank-hana'
        case '089':
          return 'bank-k'
        case '090':
          return 'bank-kakao'
        case '011':
          return 'bank-nh'
        default:
          return null
      }
    },
    setSelectedAccount(bankId, index) { 
      this.selectedAccount = bankId
      this.$refs.bankcards.forEach(bankcard => {
        bankcard.classList.remove('bank-card-selected')
      })
      this.$refs.bankcards[index].classList.add('bank-card-selected')
    },
    async requestPurchase() {
      if(!this.isLogIn) {
        alert('로그아웃되었습니다. 다시 로그인해주세요')
        this.$router.push('/signin')
        return
      }
      const info = {
        productId : this.$route.params.id,
        accountId : this.selectedAccount
      }
      try {
        const res = await publicRequest({
          url: 'products/buy',
          method: 'POST',
          body: info
        })
        if(res === true) {
          alert('결제가 성공했습니다. 구매내역 페이지에서 구매확정 버튼을 눌러주세요')
          this.$router.push('/mypage')
        } else if(res === '매진된 제품입니다.') {
          alert('죄송합니다. 매진된 제품입니다.')
        } else if(res === '유효한 정보를 제공하세요.') {
          alert('계좌를 선택해주세요')
        } else {
          alert('잔액이 부족합니다. 다른 계좌를 이용해주세요.')
        }
      } catch(error){
        alert(error)
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
  input {
    width: 1em;
  }
}
@media only screen and (min-width: 1540px) {
  .account-list {
    padding: 5em 10em;
  }
}

/* 계좌가 없을때 */
.account-empty {
  &.flex-center-vertically {
    flex-direction: column;
  }
}

/* 계좌가 있을때 */
.account-registered {
  &.flex-center-vertically {
    flex-direction: column;
  }
  .flex-center-vertically {
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2.5em;
  }
}

/* 은행계좌 디자인 */
.bank-card {
  width: 18em;
  height: 10em;
  padding: 1.25em 0;
  border-radius: $border-radius;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
  &.bank-card-selected {
    opacity: 0.6;
  }
  img {
    width: 40%;
    padding-left: 1em;
    margin-bottom: 0.5em;
  }
  .bank-number {
    font-size: $font-small;
    padding-left: 1em;
  }
  .bank-balance {
    text-align: right;
    font-size: $font-h3;
    padding: 0.4em 1em;
  }
  /* 우리은행 */
  &#bank-woori {
    background-color: #52ADF5;
    .bank-number, .bank-balance {
      color: $color-white;
    }
    .bank-balance {
      background-color: #0067AC;
    }
  }
  /* 신한은행 */
  &#bank-shinhan {
    background-color: #1E7DCC;
    .bank-number, .bank-balance {
      color: $color-white;
    }
    .bank-balance {
      background-color: #D3A245;
    }
  }
  /* 카카오뱅크 */
  &#bank-kakao {
    background-color: #FCDE22;
    .bank-number, .bank-balance {
      color: $color-black;
    }
    .bank-balance {
      background-color: #FCCA22;
    }
  }
  /* 농협은행 */
  &#bank-nh {
    background-color: #27A84D;
    .bank-number, .bank-balance {
      color: $color-white;
    }
    .bank-balance {
      background-color: #FABE10;
    }
  }
  /* 하나은행 */
  &#bank-hana{
    background-color: #69E6DD;
    .bank-number, .bank-balance {
      color: $color-black;
    }
    .bank-balance {
      background-color: #36C3B8;
    }
  }
  /* 케이뱅크 */
  &#bank-k{
    background-color: #34279F;
    img {
      width: 30%;
    }
    .bank-number, .bank-balance {
      color: $color-white;
    }
    .bank-balance {
      background-color: #10065F;
    }
  }
  /* 국민은행 */
  &#bank-kb{
    background-color: #7C7366;
    .bank-number, .bank-balance {
      color: $color-white;
    }
    .bank-balance {
      background-color: #F8B510;
    }
  }
}
</style>

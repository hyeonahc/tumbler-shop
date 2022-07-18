<template>
  <div class="account-list-container">
    <div v-if="isOn">
      <h3>결제 계좌 등록</h3>   
      <ul>
        <li
          v-for="bank in banklist"
          :key="bank.code"
          class="banklist">
          <div v-show="!bank.disabled">
            <img
              :key="bank.image"
              :src="bank.image"
              alt="image"
              @click="addAccount(bank)" />
            {{ bank.name }}
          </div>
        </li>
      </ul> 
      <button @click="addAccountNext">
        확인
      </button>
    </div>
    <div
      v-else
      class="register">
      <h3>{{ selectedBank.name }} 계좌 등록</h3>
      <div>
        <label for="account-number">계좌번호</label><br />
        <input
          id="account-number"
          v-model="accountNumber"
          :placeholder="`계좌번호 ${selectedBankDigitsLength}자리를 - 없이 입력하세요`"
          :maxlength="selectedBankDigitsLength"
          type="text" />
        <h6
          v-if="accountNumber.length === selectedBankDigitsLength "
          class="success">
          {{ accountNumber.length }} 자리 입력 완료
        </h6>
        <h6
          v-else
          class="red">
          {{ selectedBankDigitsLength }} 자리를 입력해주세요
        </h6>
      </div>
      <div>
        <label for="phone-number">핸드폰 번호</label><br />
        <input
          id="phone-number"
          v-model="phoneNumber"
          :placeholder="`핸드폰 번호 11자리를 - 없이 입력하세요`"
          :maxlength="11"
          type="text" />
        <h6
          v-if="phoneNumber.length === 11"
          class="success">
          {{ phoneNumber.length }} 자리 입력 완료
        </h6>
        <h6
          v-else
          class="red">
          11 자리를 입력해주세요
        </h6>
      </div>
      <div>
        <input
          id="signature"
          v-model="signature"
          type="checkbox" />
        <label for="signature">
          계좌연결동의
        </label>
      </div>
      <button @click="connectAccount()">
        계좌등록
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      isOn: true,
      selectedBank: {},
      selectedBankDigitsLength: '',
      accountNumber: '',
      phoneNumber: '',
      signature: false,
      
    }
  },
  computed: {
  ...mapState('bank', [
      'banklist',
      'userAccountInfo',
    ]),
  },
  created() {
    this.accountList()
    this.accountBalance()
  },
  methods: {
    ...mapActions('bank', [
      'accountList',
      'accountBalance',
      'accountConnect'
    ]),
    addAccount(bank) {
      console.log(bank)
      this.selectedBank = bank
      // console.log(this.selectedBank)
      // this.isOn = false
      // this.createDigitsLength()
    },
    addAccountNext() {
      this.isOn = false
      this.createDigitsLength()
    },
    createDigitsLength() {
      console.log(this.selectedBank.digits)
      this.selectedBankDigitsLength = this.selectedBank.digits.reduce((p, c) => p + c)
      console.log(this.selectedBankDigitsLength)
    },
    connectAccount() {
      if (this.accountNumber.length === this.selectedBankDigitsLength && 
        this.phoneNumber.length === 11 && 
        this.signature) {
        this.accountConnect({
          bankCode: this.selectedBank.code,
          accountNumber: this.accountNumber,
          phoneNumber: this.phoneNumber,
          signature: this.signature
        })
        console.log('계좌연동이 완료되었습니다')
        console.log('userAccountInfo: ',this.userAccountInfo)
        alert('계좌연동이 완료되었습니다')
        this.isOn = true
        this.$router.go()
      } else {
        return alert('유효한 값을 입력해주세요')
      }
    },

  },
}
</script>

<style lang="scss" scoped>
div {
  // align-items: center;
}
label {
  // border: 1px solid black;
  // padding: 5px;
}
input {

  margin-top: 5px;
}
  #account-number, #phone-number {
    width: 100%;
  }

input:focus {
  outline-color: $color-primary;
}
h6 {
  margin: 7px;
  
}
button {
  margin-top: 30px;
  background-color: $color-primary;
  color: $color-white;
  border: none;
  border-radius: 3px;
  padding: 5px;
  display: block;
  
  
}
.account-list-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  padding: 5em;
  width: 40%;
  height: 50%;
  h3 {
      color: $color-font;
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
    }
  ul {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid $color-font;
    li {
      margin: 5px;
      padding: 5px;
      
      // .banklist {
      //   color: $color-font;
      //   font-size: 2rem;
      //   font-weight: 700;
      //   text-align: center;
      // }
    }
  }
  
  .success {
    color: $color-primary;
  }
  .red {
    color: $color-warning;
  }
}
</style>

<template>
  <div class="account-list-container">
    <div v-if="isOn">
      <h4>계좌목록</h4>   
      <div
        v-for="bank in banklist"
        :key="bank.code"
        class="banklist">
        <div v-show="!bank.disabled">
          <button @click="addAccount(bank)">
            {{ bank.name }}
          </button> 
        </div>
      </div>
    </div>
    <div v-else>
      <h1>{{ selectedBank.name }} 계좌 등록</h1>
      <div>
        <label for="account-number">계좌번호</label>
        <input
          id="account-number"
          v-model="accountNumber"
          :placeholder="`계좌번호 ${selectedBankDigitsLength}자리를 - 없이 입력하세요`"
          :maxlength="selectedBankDigitsLength"
          type="text" />
      </div>
      <div>
        <label for="phone-number">핸드폰 번호</label>
        <input
          id="phone-number"
          v-model="phoneNumber"
          :placeholder="`핸드폰 번호 11자리를 - 없이 입력하세요`"
          :maxlength="11"
          type="text" />
      </div>
      <div>
        <label for="signature">
          계좌연결동의
        </label>
        <input
          id="signature"
          v-model="signature"
          type="checkbox" />
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
      signature: false
    }
  },
  computed: {
  ...mapState('bank', [
      'banklist',
      'userAccountInfo'
    ]),
  },
  created() {
    this.accountList()
    this.accountBalance()
    console.log('this.banklist', this.banklist)
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
      console.log(this.selectedBank)
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
.account-list-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  padding: 5em;
  .banklist {
    color: $color-font;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }
  .success {
    color: $color-primary;
  }
}
</style>

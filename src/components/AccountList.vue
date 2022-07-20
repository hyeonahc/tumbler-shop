<template>
  <div class="account-list-container">
    <div
      v-if="isOn"
      class="account-list">
      <div
        class="btn-close"
        @click="$router.go(0)">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <h2>결제 계좌 등록</h2>   
      <ul>
        <li
          v-for="bank in banklist"
          :key="bank.code"
          class="banklist">
          <div
            v-show="!bank.disabled"
            class="image-box"
            :class="[isShow? '' : 'gray']"
            @click="addAccount(bank)">
            <img
              :key="bank.image"
              :src="bank.image"
              alt="bankimages" />
            <h5> {{ bank.name }} </h5>
          </div>
        </li>
      </ul> 
      <button
        class="btn-confirm"
        @click="addAccountNext()">
        확인
      </button>
    </div>
    <div
      v-else
      class="register">
      <div
        class="btn-close"
        @click="$router.go(0)">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <h2>{{ selectedBank.name }} 계좌 등록</h2>
      <div class="account">
        <label for="account-number">계좌번호</label><br />
        <input
          id="account-number"
          v-model="accountNumber"
          oninput="this.value = this.value.replace(/[^0-9]/g, '')"
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
          class="danger">
          {{ selectedBankDigitsLength }} 자리를 입력해주세요
        </h6>
      </div>
      <div class="phone">
        <label for="phone-number">핸드폰 번호</label><br />
        <input
          id="phone-number"
          v-model="phoneNumber"
          oninput="this.value = this.value.replace(/[^0-9]/g, '')"
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
          class="danger">
          11 자리를 입력해주세요
        </h6>
      </div>
      <div class="connect">
        <input
          id="signature"
          v-model="signature"
          type="checkbox" />
        <label for="signature">
          계좌연결동의
        </label>
      </div>
      <button
        class="btn-confirm"
        @click="connectAccount()">
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
      isShow: true
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
      this.selectedBank = bank
      console.log('addAccount', bank)
      this.isShow = !this.isShow

      
    },
    addAccountNext() {
      if(this.selectedBank.name === undefined) {
        return alert('등록할 계좌를 선택해 주세요')
      } 
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
    // coverColor() {
    //   this.isShow = !this.isShow
    // }
  },
}
</script>

<style lang="scss" scoped>
.gray {
  background-color: $color-input;
}
.btn-confirm {
  background-color: $color-primary;
  color: $color-white;
  width: 30%;
  padding: 1.2rem;
  border: none;
  border-radius: 3px;
  }
  .btn-close {
    font-size: 20px;
    margin-left: auto;
    color: $color-font;
  }
  h2 {
    width: 100%;
    color: $color-font;
    font-size: 2.4rem;
    font-weight: 700;
    text-align: center;
    padding: 10px;
  }
  h6 {
    margin: 7px;
    font-size: 1.4rem;
  }
.account-list-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  padding: 2em;
  width: 45rem;
  height: 47rem;
  .account-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  ul {
    width: 100%;
    // height: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    li {
      .image-box {
        border: 1px solid $color-input;
        align-items: center;
        text-align: center;
        width: 100px;
        margin: 10px;
        padding: 10px;
      }
      img{
        width: 33px;
        height: 30px;
        margin: auto;
      }
      h5 {
        padding-top: 10px;
      }
    }
  }
  
}
  
}
.register {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .account, .phone, .connect {
    width: 90%;
    
  }
  .account, .phone {
    color: $color-primary;
    padding: 10px 0px;
  }
  .connect {
    padding: 13px 0px;
  }
  #account-number, #phone-number {
    width: 100%;
  }
  label {
    font-size: 1.6rem;
  }
  input {
    font-size: 1.6rem;
    padding: 10px;
    margin-top: 10px;
  }
  input:focus {
    outline-color: $color-primary;
  }
  .danger {
    color: $color-warning;
    font-size: 1.4rem;
  }

}
</style>

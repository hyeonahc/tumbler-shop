<template>
  <div class="account-list-container">
    <div
      v-if="isOn"
      class="account-list flex-center-horizontally">
      <h1>결제 계좌 등록</h1>   
      <ul class="flex-center-center">
        <li
          v-for="bank in banklist"
          :key="bank.code">
          <div
            v-show="!bank.disabled"
            class="image-box"
            @click="addAccount(bank), test($event)">
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
        @click="addAccountNext">
        확인
      </button>
    </div>
    <div
      v-else
      class="register flex-center-horizontally">
      <h1>{{ selectedBank.name }} 계좌 등록</h1>
      <div class="account">
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
        @click="connectAccount">
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
    },
    addAccountNext() {
      if(this.selectedBank.name === undefined) {
        return alert('등록할 계좌를 선택해 주세요')
      } 
      this.isOn = false
      this.createDigitsLength()
    },
    createDigitsLength() {
      this.selectedBankDigitsLength = this.selectedBank.digits.reduce((p, c) => p + c)
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
        alert('계좌연동이 완료되었습니다')
        this.isOn = true
        this.$router.go()
      } else {
        return alert('유효한 값을 입력해주세요')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h5 {
  padding-top: .8rem;
}
h6 {
  margin: 1rem;
  font-size: 1.4rem;
}
.account-list-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $color-primary-light;
  border-radius: .5rem;
  padding: 2em;
  width: 45rem;
  height: 50rem;
  .account-list {
    flex-wrap: wrap;
    width: 100%;
    ul {
      width: 38.6rem;
      height: 33rem;
      flex-wrap: wrap;
      padding: 1rem;
      li {
        :hover {
          background-color: $color-tr-hover;
          cursor: pointer;
        }
        .image-box {
          border: 1px solid $color-input;
          text-align: center;
          width: 11rem;
          height: 9rem;
          margin: 0.6rem;
          padding: 1rem;
          img {
            width: 4rem;
            height: 4rem;
          }
        }
      }
    }
    .btn-confirm {
      width: 30%;
      margin-top: 1rem;
      padding: 1.2rem;
    } 
  }
  .register {
    flex-wrap: wrap;
    .account, .phone, .connect {
      width: 90%;
    }
    .account, .phone {
      color: $color-primary;
      padding: 1.5rem 0rem;
    }
    .connect {
      padding: 2.5rem 0rem;
    }
    #account-number, #phone-number {
      width: 100%;
    }
    #signature {
      width: 5%;
      cursor: pointer;
    }
    label {
      font-size: 1.6rem;
      vertical-align: text-top;
    }
    input {
      padding: 1rem;
      margin-top: 1rem;
    }
    .danger {
      color: $color-danger;
    }
  }
}
</style>

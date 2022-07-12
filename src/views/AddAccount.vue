<template>
  <h2>$route.query.bankname: {{ $route.query.bankname }} 계좌연결</h2>
  <h2>$route.query.bankcode: {{ $route.query.bankcode }} </h2>
  <h2>$route.query.bankdigits: {{ $route.query.bankdigits }} </h2>
  <br />
  <br />
  
  <div class="add-account">
    <div class="accountnumber">
      <div>현재{{ accountNumber.length }}자리 입력</div>
      계좌번호: <input
        v-model="accountNumber"
        type="text"
        :placeholder="`계좌번호 ${addDigits()} '-' 없이입력`"
        :maxlength="addDigits()"
        oninput="this.value = this.value.replace(/[^0-9]/g, '')" />
      <span>
        <span v-if="accountNumber.length === addDigits()">작성 완료</span>
        <span v-else> {{ addDigits() }}자리 입력해주세요</span>
      </span>
    </div>

    <div class="phone-number">
      핸드폰번호: <input
        v-model="phoneNumber"
        type="text"
        placeholder="핸드폰번호 '-' 없이입력" 
        maxlength="11"
        oninput="this.value = this.value.replace(/^(\d{3})(\d{4})(\d{4})/g, '$1-$2-$3')" />
      <span>
        <span v-if="phoneNumber.length === 11">작성 완료</span>
        <span v-else> 전화번호 입력해주세요 </span>
      </span>
    </div>

    <div class="signature">
      계좌연결동의: <input
        v-model="signature"
        type="checkbox" />
    </div>

    <div class="button">
      <button @click="$router.go(-1)">
        뒤로가기
      </button> 
      <button @click="addBank()">
        계좌등록
      </button>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex'

export default {

  data() {
    return {
      signature: '',
      accountNumber: '',
      phoneNumber: '',
    }
  },
  mounted() {
    //params확인
    console.log('route',this.$route)
  },
  methods: {
    ...mapActions('bank', [
      'accountConnect',
    ]),
    //배열더하기
    addDigits() {
      const bankdigits = this.$route.query.bankdigits
      const digits = bankdigits.map((i) => Number(i))
      const sum = digits.reduce((x,y) => (x+y))
      return sum
    },
    //계좌연결
    addBank() {
      if(
        this.accountNumber.length === this.addDigits() && 
        this.phoneNumber.length === 11 && 
        this.signature === true ) {
        alert('계좌연동완료')
        this.$router.go(-2)
      }else{
        return alert('유효한 값을 입력해주세요')
      }
      this.accountConnect({
        bankCode: this.$route.query.bankcode,
        accountNumber: this.accountNumber,
        phoneNumber: this.phoneNumber,
        signature: this.signature
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  color: $color-font;
  font-size: 2rem;
  font-weight: 700;
}
.add-account {
  color: $color-font;
  font-size: 2rem;
  font-weight: 700;
}
  
</style>

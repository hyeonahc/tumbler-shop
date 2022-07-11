<template>
  <h2>{{ $route.params.bankname }} 계좌연결</h2>
  <h2>{{ $route.params.bankcode }} </h2>
  <h2>{{ $route.params.bankdigits }} </h2>

  <div>
    계좌번호: <input
      v-model="accountNumber"
      type="text"
      :placeholder="`계좌번호 ${addDigits()}자리 작성`" />
    <br />
    핸드폰번호: <input
      v-model.trim="phoneNumber"
      type="text"
      maxlength="11"
      placeholder="핸드폰번호 '-' 없이입력" /><br />
    계좌연결동의: <input
      v-model="signature"
      type="checkbox" /><br />
    <button @click="$router.go(-1)">
      뒤로가기
    </button> 
    <button @click="addBank()">
      계좌등록
    </button>
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
    console.log(this.$route.params)
  },
  methods: {
    ...mapActions('bank', [
      'accountConnect',
    ]),
    //배열더하기
    addDigits() {
      const bankdigits = this.$route.params.bankdigits
      const digits = bankdigits.map((i) => Number(i))
      const sum = digits.reduce((x,y) => (x+y))
      return sum
    },
    //계좌연결
    addBank() {
      this.accountConnect({
        bankCode: this.$route.params.bankcode,
        accountNumber: this.accountNumber,
        phoneNumber: this.phoneNumber,
        signature: this.signature
      })
      console.log('checkbox',this.signature)
      console.log('bankCode',this.$route.params.bankcode)
      alert('계좌연동완료')
      this.$router.go(-2)
    }, 

    
  }
}
</script>

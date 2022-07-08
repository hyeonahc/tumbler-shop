<template>
  <h2>{{ $route.params.bankname }} 계좌연결</h2>
  <h2>{{ $route.params.bankcode }} </h2>
  <h2>{{ $route.params.bankdigits }} </h2>
  <!-- :placeholder="`계좌번호 ${addDigits()}자리 작성`" -->
  <div>
    계좌번호: <input
      v-model="accountNumber"
      type="text" />
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
  이름:{{ hi }} 코드:{{ te }} 디짓트:{{ st }}
  <button @click="ohoh">
    aas
  </button> 
  <!-- {{ ohoh() }} -->
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
  //testcode
  computed: {
    hi() {
      return 'getItem',window.localStorage.getItem('saveBankInfo')
    },
    te() {
      return 'getItem',window.localStorage.getItem('test1')
    },
    st() {
      return 'getItem',window.localStorage.getItem('test2')
    }

  },
  //testcode
  created() {
    this.test()
    
  },

  mounted() {
    //params확인
    console.log(this.$route.params)
    this.ohoh()
  },
  methods: {
    ...mapActions('bank', [
      'accountConnect',
    ]),
    // ohoh() {
    //   const a = this.st
    //   const b = a.map((i) => Number(i))
    //   const c = b.reduce((x,y) => (x+y))
    //   return c
      
      
    // },
    //배열더하기
    // addDigits() {
    //   const bankdigits = this.$route.params.bankdigits
    //   const digits = bankdigits.map((i) => Number(i))
    //   const sum = digits.reduce((x,y) => (x+y))
    //   return sum
    // },
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
    
    //testcode
    test() {
      const savename = this.$route.params.bankname
      const savecode = this.$route.params.bankcode
      const savedigits = this.$route.params.bankdigits
      window.localStorage.setItem('saveBankInfo', savename)
      window.localStorage.setItem('test1', savecode)
      window.localStorage.setItem('test2', savedigits)

      console.log('kikiki',savename, savecode, savedigits)

      
    }
    
    
  }
}
</script>

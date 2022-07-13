<template>
  <h1>내계좌목록</h1>
  <RouterLink :to="{ name: 'AccountList' }">
    <button>계좌추가</button> 
  </RouterLink>
  <h3> 내계좌 총금액: {{ userAccountInfo.totalBalance }}원 </h3>
  <UserAccountInfo 
    v-for="userInfo in userAccountInfo.accounts"
    :key="userInfo.id"
    :user-info="userInfo" />
</template>


<script>
import { mapActions, mapState } from 'vuex'
import UserAccountInfo from '../components/UserAccountInfo.vue'
export default {
components: {
    UserAccountInfo
  },

computed: {
  //사용자 아이디 추출은 여기서 props로 땡기기
  ...mapState('bank', [
    'userAccountInfo'
  ])
},
created() {
  this.accountBalance()
},
methods: {
  ...mapActions('bank', [
      'accountBalance'
    ]),
  }
}
</script>

<style lang="scss" scoped>
  td {
    border: 1px solid black;
    padding: 20px;
  }
</style>

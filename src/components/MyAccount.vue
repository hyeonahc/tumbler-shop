<template>
  <div class="inner">
    <div class="my-account">
      <h1>내 계좌 목록</h1>
      <RouterLink :to="{ name: 'AccountList' }">
        <button class="add-account">
          계좌추가
        </button>
      </RouterLink>
      <h2>계좌 / 계좌목록 / 현재금액 </h2> 
      <UserAccountInfo
        v-for="userInfo in userAccountInfo.accounts"
        :key="userInfo.id"
        :user-info="userInfo"
        @user="user" />
    </div>
  </div>
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
  ]),
},
created() {
  this.accountBalance()
},
methods:{
  ...mapActions('bank', [
      'accountBalance'
    ]),
    //emit
    user(userInfo) {
      const index = this.userAccountInfo.accounts.findIndex(accounts => accounts.id === userInfo.id)
      this.userAccountInfo.accounts.splice(index, 1)
  },
},
}
</script>

<style lang="scss" scoped>
.inner {
  max-width: 110rem;
  height: 110rem;
  position: relative;
  .my-account {
  border: 1px solid black;   
  width: 50rem;
  height: 50rem;
    h1 {
      color: $color-font;
      font-size: 3rem;
      font-weight: 700;
    }
    h2 {
      color: $color-font;
      font-size: 2rem;
      font-weight: 600;
    }
    h3 {
      color: $color-font;
      font-size: 1.3rem;
      font-weight: 500;
      text-align: right;
    }
    .add-account {
      background-color: $color-primary;
      color: $color-white;
      
      
    }
  }
}
  
  
</style>

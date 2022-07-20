<template>
  <div class="container">
    <div class="my-account">
      <h1>내 계좌</h1>
      
      <button
        class="btn-confirm"
        @click="addAccount">
        <i class="fa-solid fa-plus"></i>
        계좌추가 
      </button>
      
      <table>
        <tr>
          <th>No</th>
          <th>은행명</th>
          <th>계좌번호</th>
          <th>현재 금액</th>
          <th>계좌해지</th>
        </tr>

        <UserAccountInfo
          v-for="(userInfo, index) in userAccountInfo.accounts"
          :key="userInfo.id"
          :user-info="userInfo"
          :index="index"
          @user="user" />
      </table>
    </div>
    <div
      ref="darkBg"
      @click="RemoveDarkBg"></div>
    <AccountList
      v-if="isOn" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UserAccountInfo from '../components/UserAccountInfo.vue'
import AccountList from '../components/AccountList.vue'

export default {
  components: {
    UserAccountInfo,
    AccountList
  },
  data() {
    return {
      isOn: false
    }
  },  
  computed: {
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
    user(userInfo) {
      const index = this.userAccountInfo.accounts.findIndex(accounts => accounts.id === userInfo.id)
      this.userAccountInfo.accounts.splice(index, 1)
    },
    addAccount() {
      if(this.userAccountInfo.accounts.length === 7) {
        alert('더이상 추가할 수 있는 계좌가 없습니다')
        return
      }
      console.log(this.$refs.darkBg)
      this.$refs.darkBg.classList.add('dark-bg')
      this.isOn = true

    },
    RemoveDarkBg() {
      this.$refs.darkBg.classList.remove('dark-bg')
      this.isOn = false
    }
  },
}
</script>

<style lang="scss" scoped>
  .my-account {
  padding: 30px 50px;
  display: flex;
  flex-wrap: wrap;
  h1 {
    color: $color-font;
    font-weight: 700;
    width: 100%;
  }
  .btn-confirm {
    background-color: $color-primary;
    color: $color-white;
    width: 10%;
    height: 30px;
    margin-left: auto;
    border: none;
    border-radius: 3px;
  }
  table {
    width: 100%;
    border-collapse : collapse;
    border : 1px solid $color-input;
    text-align: center;
    th {
      padding: 10px;
      background-color: $color-primary;
      color: $color-white;
    }
    
  }
  

  
}


.dark-bg {
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
}   
</style>

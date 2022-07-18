<template>
  <div class="container">
    <div class="my-account">
      <h1>내 계좌</h1>
      
      <button
        class="add-account"
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
.container {
  // position: relative;
  .my-account {
  padding: 30px 50px;
  
  table {
    width: 100%;
    border-collapse : collapse;
    border : 1px solid black;
    text-align: center;
    th {
      padding: 10px;
      background-color: $color-primary;
      color: $color-white;
    }
    
  }
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
    border-radius: 3px;
    border: none;
    width: 100px;
    height: 25px;
    display: block;
    margin-left: 88%;
    margin-bottom: 20px;
    // float: right;
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

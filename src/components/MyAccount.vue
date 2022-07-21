<template>
  <div class="table-page">
    <h1>내 계좌</h1>
    <div class="table-wrapper">
      <div class="account-btn">  
        <button
          @click="addAccount">
          <i class="fa-solid fa-plus"></i>
          계좌추가 
        </button>
      </div>
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
import UserAccountInfo from '~/components/UserAccountInfo.vue'
import AccountList from '~/components/AccountList.vue'

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
  }
}
</script>

<style lang="scss" scoped>
.account-btn {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 2rem;
  button {
    margin-top: 0.1em;
  }
}
.dark-bg {
  background: $color-bg-filter;
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
}   
</style>

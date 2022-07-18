<template>
  <div>
    <div class="my-account">
      <h1>내 계좌 목록</h1>
      <button
        class="add-account"
        @click="addAccount">
        계좌추가
      </button>
      <h2>계좌 / 계좌목록 / 현재금액 </h2> 
      <UserAccountInfo
        v-for="userInfo in userAccountInfo.accounts"
        :key="userInfo.id"
        :user-info="userInfo"
        @user="user" />
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
.dark-bg {
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
}   
</style>

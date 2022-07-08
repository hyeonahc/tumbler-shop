<template>
  <div class="myaccount">
    <!-- {{ userInfo }} -->
    {{ userInfo.bankName }} / {{ userInfo.accountNumber }} / {{ userInfo.balance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+" 원" }}
    <button @click="isShow = true">
      계좌해지
    </button>
  </div>
  <div
    v-if="isShow == true"
    class="modal">
    <div
      class="modal_content">
      <h1>정말로 해지?</h1> 
      <button @click="deleteBank(), $router.go(0)">
        YES
      </button>
      <button @click="isShow = false">
        NO
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  // myAccount에서 userAccountInfo props
  props: {
      userInfo: {
        type: Object,
        required: true
      }
    },
  data() {
    return {
      isShow: false,
    }
  },
    methods: {
  ...mapActions('bank', [
      'accountDisConnect'
    ]),
    deleteBank() {
      this.accountDisConnect({
        accountId: this.userInfo.id,
        signature: true
      })
      alert('해지가 완료되었습니다')
    },
  }
  

}
</script>

<style lang="scss" scoped>
  div {
    box-sizing: border-box;
  }
  
  .modal {
    top: 30%;
    position: fixed;
    width: 100%;
    height: 50%;
    background: rgba(0,0,0,0.8);
    .modal_content {
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 50%;
      height: 50%;
      background: white;
      border-radius: 8px;
      padding: 20px;
    }
  }

  
</style>

<template>
  <!-- {{ userInfo }} -->
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ userInfo.bankName }}</td>
    <td>{{ userInfo.accountNumber }}</td>
    <td>{{ userInfo.balance.toLocaleString('ko-KR') }} 원</td>
    <td
      class="remove-account"
      @click="isShow = true">
      계좌해지
    </td>
  </tr>
  
  
  
  <div
    v-if="isShow == true"
    class="modal">
    <div
      class="modal_content">
      <h1>{{ userInfo.bankName }}</h1> 
      <h2>{{ userInfo.accountNumber }}</h2> 
      <h3>{{ userInfo.balance.toLocaleString('ko-KR') }} 원</h3> 
      <h4>해당계좌를 정말로 해지하시겠습니까? <br />해지시 되돌릴 수 없습니다</h4>
      <button
        class="agree"
        @click="deleteBank(), deleteUesrInFo()">
        네
      </button>
      <button
        class="disagree"
        @click="isShow = false">
        아니요
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
      },
      index: {
        type: Number,
        required: true
      }
    },
  emits: ['user'],
  data() {
    return {
      isShow: false
    }
  },
    methods: {
  ...mapActions('bank', [
      'accountDisConnect',
    ]),
    deleteBank() {
      this.accountDisConnect({
        accountId: this.userInfo.id,
        signature: true
      })
      alert('해지가 완료되었습니다')
      this.isShow = false
    },
    deleteUesrInFo() {
      this.$emit('user', this.userInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
h1,h2,h3 {
  padding: 15px;
}
h4 {
  color: $color-warning;
  padding-top: 20px;
  padding-bottom: 20px;
  line-height: 30px;
}
td {
  padding: 20px;
  
}
.remove-account {
    color: $color-warning;
    cursor: pointer;
    text-decoration: underline;
}
div {
  box-sizing: border-box;
}
.myaccount {
  border-bottom: 1px dotted black
}
.modal {
  // top: 30%;
  // position: fixed;
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
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
    button {
      cursor: pointer;
      background-color: $color-primary;
      color: $color-white;
      border: none;
      border-radius: 5px;
      padding: 7px;
      width: 60px;
      margin: 5px;
    }
  }
    
}

  
</style>

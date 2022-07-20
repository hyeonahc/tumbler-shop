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
      <div class="btn">
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
  color: $color-font;
  font-weight: 700;
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
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.5);
  .modal_content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 5px;
    padding: 2em;
    width: 30%;
    height: 50%;
    .btn {
      display: flex;
      justify-content: space-evenly;
      button {
        cursor: pointer;
        background-color: $color-primary;
        color: $color-white;
        width: 20%;
        padding: 1.2rem;
        border: none;
        border-radius: 3px;
        }
    }
  }
    
}

  
</style>

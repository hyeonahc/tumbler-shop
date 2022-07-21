<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ userInfo.bankName }}</td>
    <td>{{ userInfo.accountNumber }}</td>
    <td>{{ userInfo.balance.toLocaleString('ko-KR') }} 원</td>
    <td
      class="action-btn cancel-btn"
      @click="isShow = true">
      계좌해지
    </td>
  </tr>
  <div
    v-if="isShow == true"
    class="modal">
    <div
      class="modal_content flex-center-center">
      <h1>{{ userInfo.bankName }}</h1> 
      <h2>{{ userInfo.accountNumber }}</h2> 
      <h3>{{ userInfo.balance.toLocaleString('ko-KR') }} 원</h3> 
      <h4>해당계좌를 정말로 해지하시겠습니까? </h4>
      <h4>해지시 되돌릴 수 없습니다</h4>
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
.modal {
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  background: $color-bg-filter;
  .modal_content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $color-white;
    border-radius: .5rem;
    padding: 2em;
    width: 45rem;
    height: 50rem;
    flex-wrap: wrap;
    text-align: center;
    h1, h2, h3, h4 {
      width: 100%;
    }
    h4 {
      color: $color-danger;
    }
    .btn {
      width: 20rem;
      display: flex;
      justify-content: space-between;
    }
  }   
}
</style>

<template>
  <div class="inner">
    <h1>내 정보 수정</h1>
    <div class="inner__card">
      <div class="form">
        <input
          :value="displayName"
          placeholder="새로운 이름을 입력해주세요"
          type="text" 
          autofocus 
          @input="displayName = $event.target.value" />
        <input
          v-model="oldPassword"
          placeholder="기존 비밀번호를 입력해주세요"
          type="password" />
        <input
          v-model="newPassword"
          placeholder="새로운 비밀번호를 입력해주세요"
          type="password"
          @keydown.enter="useEditUserInfo" />
        <input
          type="submit"
          value="내 정보 수정"
          @click="useEditUserInfo" />
      </div>
    </div>
  </div>  
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      displayName: '',
      oldPassword: '',
      newPassword: ''
    }
  },
  methods: {
    ...mapActions('user', [ 
      'editUserInfo' 
    ]),
    async useEditUserInfo() {
      if (!this.displayName.trim()) {
        return alert('변경할 이름을 입력해주세요')
      } else if (!this.oldPassword.trim()) {
        return alert('기존 비밀번호를 입력해주세요')
      } else if (!this.newPassword.trim()) {
        return alert('새로운 비밀번호를 입력해주세요')
      } else if (this.newPassword.trim().length <= 7) {
        return alert('비밀번호는 8자리 이상으로 설정해주세요')
      }
      this.editUserInfo({
        displayName: this.displayName,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      })
      this.displayName = ''
      this.oldPassword = ''
      this.newPassword = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.inner {
    max-width: 110rem;
    margin: 0 auto;
    h1 {
      color: $color-font;
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 2.4rem;
    }
    &__card {
      width: 50rem;
      margin: 0 auto;
      border-radius: 0.6rem;
      background-color: $color-white;
      border: 0.1rem solid $color-header-border;
      color: $color-font;
      h2 {
        padding: 3rem;
        font-size: 1.8rem;
        text-align: center;
        border-bottom: 0.1rem solid $color-header-border;
        strong {
          font-weight: 700;
          color: $color-primary;
        }
      }
      .form {
        padding: 3rem 2.2rem;
        [type="submit"] {
          background-color: $color-primary;
          border: none;
          color: $color-white;
          font-size: 2rem;
          cursor: pointer;
        }
        p {
          font-size: 1.2rem;
          text-align: center;
          a {
            color: $color-primary;
            font-weight: bold;
            text-decoration: underline;
          }
        }
        input {
          width: 100%;
          margin-bottom: 1.2rem;
          padding: 1.5rem;
          border: 0.1rem solid $color-header-border;
          border-radius: 0.4rem;
          outline: none;
          font-size: 1.4rem;
          &:not(:last-of-type) {
            &:focus {
              border-color: $color-primary;
              background-color: rgba($color-primary, .03);
            }
          }
        }
      }
    }
  }
</style>

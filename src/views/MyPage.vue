<template>
  <section class="mypage">
    <nav>
      <div class="header">
        <img
          class="logo"
          src="../assets/logo.png"
          alt="logo"
          @click="$router.push({ name: 'mainpage'})" />
      </div>
      <div class="user">
        <div class="user__image">
        </div>
        <div class="user__info">
          <h4>
            반갑습니다! {{ user.displayName }} 고객님
          </h4> 
          <br />
          <h4>
            {{ user.email }}
          </h4>
        </div>
      </div>
      <div class="menulist">
        <ul
          v-for="menu in myPageMenuList"
          :key="menu.name"
          class="menu"
          :class="{ 'show' : menu.isShow }"
          @click="isShowMenu(menu.name)">
          {{ menu.name }}
        </ul>
      </div>
      <div class="actions">
        <div
          class="action"
          @click="$router.push({ name: 'mainpage'})">
          <i class="fa-solid fa-house"></i>
          홈페이지
        </div>
      </div>
    </nav>
    <section class="content">
      <section class="main">
        <PurchaseHistory
          v-show="myPageMenuList[0].isShow" />
        <MyAccount
          v-show="myPageMenuList[1].isShow" />      
        <ModifyUserInfo
          v-show="myPageMenuList[2].isShow"
          class="my-account-info" />      
      </section>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PurchaseHistory from '~/components/PurchaseHistory.vue'
import MyAccount from '~/components/MyAccount.vue'
import ModifyUserInfo from '~/components/ModifyUserInfo.vue'

export default {
  components: {
    PurchaseHistory,
    MyAccount,
    ModifyUserInfo,
  },
  computed: {
    ...mapState('user', [
      'user'
    ]),
    ...mapState('menu', [
      'myPageMenuList'
    ])
  },
  created() {
    this.setMenu()
  },
  unmounted() {
    this.isShowMenu('구매내역') // 해당 페이지를 벗어날 때, 값 되돌리기
  },
  methods: {
    ...mapActions('menu', [
      'isShowMenu',
    ]),
    setMenu() {
      const menuHistory = window.sessionStorage.getItem('menu')
      this.isShowMenu(menuHistory)
    }
  }
}
</script>

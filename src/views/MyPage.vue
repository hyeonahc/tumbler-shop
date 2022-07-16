<template>
  <section class="mypage">
    <nav>
      <div class="header">
        <img
          class="logo"
          src="../assets/logo.png"
          alt="starbucks"
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
          v-for="menu in menuList"
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
      <section>
        <PurchaseHistory
          v-show="menuList[0].isShow" />
      </section>
      <section>
        <MyAccount
          v-show="menuList[1].isShow" />      
      </section>
      <section class="main">
        <MyAccountInfo
          v-show="menuList[2].isShow"
          class="my-account-info" />      
      </section>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PurchaseHistory from '~/components/PurchaseHistory.vue'
import MyAccount from '~/components/MyAccount.vue'
import MyAccountInfo from '~/components/MyAccountInfo.vue'

export default {
  components: {
    PurchaseHistory,
    MyAccount,
    MyAccountInfo,
  },
  computed: {
    ...mapState('user', [
      'user',
      'isLogIn',
    ]),
    ...mapState('menu', [
      'menuList'
    ])
  },
  methods: {
    ...mapActions('menu', [
      'isShowMenu',
    ]),
  }
}
</script>

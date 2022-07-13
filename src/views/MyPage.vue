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
          MAINPAGE
        </div>
      </div>
    </nav>

    <section class="main">
      <MyAccountInfo
        v-show="menuList[2].isShow"
        class="my-account-info" />      
    </section>
  </section>

  <!-- <RouterLink :to="{name: 'myAccount'}">
    <h3>내 계좌</h3>
  </RouterLink>

  <RouterView /> -->
</template>

<script>
import { mapState } from 'vuex'
import MyAccountInfo from '~/components/MyAccountInfo.vue'

export default {
  components: {
    MyAccountInfo 
  },
  data() {
    return {
      menuList: [
        { name: '구매내역', isShow: true }, // 처음에 보여줄 기본 정보를 구매내역으로 설정
        { name: '내 계좌', isShow: false},
        { name: '내 정보 수정', isShow: false}
      ]
    }
  },
  computed: {
    ...mapState('user', [
      'user'
    ])
  },
  methods: {
    isShowMenu(menuName) { 
      this.menuList.forEach(menu => {
        menu.isShow = false // 모든 menu의 isShow를 false로 바꾸어 안보이게 하기
        if (menu.name === menuName) { // 클릭한 menu의 isShow 값 true로 바꾸어 보이게 하기
          menu.isShow = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>

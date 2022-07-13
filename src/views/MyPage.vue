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
          <h2>
            반갑습니다! {{ user.displayName }} 고객님
          </h2>
          <h2>
            고객님의 이메일: {{ user.email }}
          </h2>
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
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MyAccountInfo from '~/components/MyAccountInfo.vue'
import MyAccount from '~/components/MyAccount.vue'

export default {
  components: {
    MyAccountInfo,
    MyAccount 
  },
  data() {
    return {
      // menuList: [
      //   { name: '구매내역', isShow: true }, // 처음에 보여줄 기본 정보를 구매내역으로 설정
      //   { name: '내 계좌', isShow: false},
      //   { name: '내 정보 수정', isShow: false}
      // ]
    }
  },
  computed: {
    ...mapState('user', [
      'user',
      'isLogIn',
    ]),
    ...mapState('bank', [
      'menuList'
    ])
  },
  methods: {
    ...mapActions('user', [
      'requestUpdateState' 
    ]),
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
.mypage {
  display: flex;
  height: 100%;
}
nav {
  max-width: 25rem;
  min-width: 16rem;
  background-color: $color-header;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.4rem;
    font-weight: 700;
    .logo {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .user {
    flex-shrink: 0;
    padding: 1.4rem;
    color: $color-font;
    border-top: 0.1rem solid $color-header-border;
    &__info {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.2rem;
    }
    // &__image {
    //   width: 2rem;
    //   height: 2rem;
    //   border-radius: 0.4rem;
    //   margin-right: 1rem;
    //   background-image: url("https://heropy.blog/css/images/logo.png");
    //   background-size: cover;
    // }
  }
  .menulist {
    flex-grow: 1;
    height: 100%;
    color: $color-font;
    padding: 1.4rem;
    border-top: 0.1rem solid $color-header-border;
    .menu {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 4rem;
      margin-bottom: 1rem;
      padding: 0 1.2rem;
      border-radius: 1rem;
      font-size: 1.4rem;
      cursor: pointer;
      &.show {
        color: $color-primary;
        font-weight: 700;
        background-color: $color-header-border;
      }
      &.disabled {
        cursor: default;
        opacity: .3;
      }
      &:hover {
        background-color: $color-header-border;
      }
    }
  }
  .actions {
    padding: 1.4rem;
    border-top: 0.1rem solid $color-header-border;
    color: $color-font;
    .action {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 4rem;
      padding: 0 1.2rem;
      border-radius: 1rem;
      background-color: $color-header;
      font-size: 1.4rem;
      cursor: pointer;
      &.disabled {
        cursor: default;
        opacity: .3;
      }
      &:hover {
        background-color: $color-header-border;
      }
      i {
        font-size: 1.8rem;
        margin-right: 0.6rem;
      }
    }
  }
}

.main {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>

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
            반갑습니다! 
          </h4>
          <br />
          <h4>
            {{ user.displayName }} 관리자님
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
      <div
        v-show="menuList[0].isShow"
        class="inquireProducts">
        <h1>제품 조회</h1>
        <router-link
          to="/AddProduct">
          제품 추가
        </router-link>
    
        <div>
          <button @click="allProductsLookup">
            전체 제품 보기
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Product ID</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <AllproductList 
                v-for="product in allProducts"
                :key="product.id"
                :product="product"
                :products="products" />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AllproductList from '~/components/AllproductList.vue'

export default {
  components: {
    AllproductList
  },
  data() {
    return {
      id: '',
      menuList: [
        { name: '제품 조회', isShow: true },
        { name: '판매 내역', isShow: false } 
      ]
    }
  },
  computed: {
    ...mapState('user', [
      'user'
    ]),
    allProducts() {
      return this.$store.state.admin.allProducts
    }
  },
  created() {
    this.$store.dispatch('admin/allProductsLookup')
  },
  methods: {
    ...mapActions('user', [
      'requestUpdateState'
    ]),
    async allProductsLookup() {
      await this.$store.dispatch('admin/allProductsLookup')
    },
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

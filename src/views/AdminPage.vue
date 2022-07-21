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
          v-for="menu in adminPageMenuList"
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

    <div class="test">
      <section class="main">
        <div
          v-show="adminPageMenuList[0].isShow"
          class="inquireProducts">
          <h1>제품 조회</h1>
          <button
            @click="modal = true">
            제품 추가
          </button>
          <div
            v-if="modal"
            class="black-bg">
            <div class="white-bg">
              <AddProduct
                v-if="modal" />
            </div>
          </div>
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
                <AllProducts
                  v-for="product in allProducts"
                  :key="product.id"
                  :product="product" />
              </tbody>
            </table>
          </div>
        </div>
        <div v-show="adminPageMenuList[1].isShow">
          <SalesHistory />
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AllProducts from '~/components/AllProducts.vue'
import SalesHistory from '~/views/SalesHistory.vue'
import AddProduct from '~/components/AddProduct.vue'

export default {
  components: {
    AllProducts,
    SalesHistory,
    AddProduct,  
  },
  data() {
    return {
      modal: false,
    }
  },
  computed: {
    ...mapState('user', [
      'user'
    ]),
    ...mapState('menu', [
      'adminPageMenuList'
    ]),
    allProducts() {
      return this.$store.state.admin.allProducts
    }
  },
  created() {
    this.$store.dispatch('admin/allProductsLookup')
    this.setMenu()
  },
  unmounted() {
    this.isShowMenu('제품 조회') // 해당 페이지를 벗어날 때, 값 되돌리기
  },
  methods: {
    ...mapActions('menu', [
      'isShowMenu'
    ]),
    async allProductsLookup() {
      await this.$store.dispatch('admin/allProductsLookup')
    },
    setMenu() {
      const menuHistory = window.sessionStorage.getItem('menu')
      this.isShowMenu(menuHistory)
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
width: 80vw;
}
.black-bg {
width: 100vw;
height: 100vh;
background: rgba(0, 0, 0, 0.5);
position: absolute;
padding: 20px;
top: 0;
left: 0;
}
.white-bg {
width: 60vw;
height: 70vh; 
background: white;
border-radius: 8px;
padding: 20px;
}
</style>

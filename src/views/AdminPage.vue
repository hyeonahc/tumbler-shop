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
          홈페이지
        </div>
      </div>
    </nav>

    <section class="main">
      <div
        v-show="adminPageMenuList[0].isShow"
        class="table-page__admin table-page">
        <h1>제품 조회</h1>
        <div class="admin-product">
          <div>
            <button @click="allProductsLookup">
              전체 제품 보기
            </button>
          </div>
          <button @click="modal = true">
            <i class="fa-solid fa-plus"></i>
            제품 추가
          </button>
          <div
            v-if="modal"
            class="black-bg">
            <div class="white-bg">
              <AddProduct
                v-if="modal"
                @layer-popup="modal = false" />
            </div>
          </div>
        </div>
        <div class="table-page">
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>상품명</th>
                  <th>상품 아이디</th>
                  <th>가격</th>
                  <th>재고</th>
                </tr>
              </thead>
              <tbody>
                <AllProducts
                  v-for="(product,index) in allProducts"
                  :key="product.id"
                  :product="product"
                  :index="index" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <section class="main">
        <div
          v-show="adminPageMenuList[1].isShow"
          class="table-page__admin table-page">
          <salesHistory />
        </div>
      </section>
    </section>
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
    .main {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .table-page__admin {
      margin: 6vh 0 0 4vw;
      button {
        margin-top: 0;  
      }
      .admin-product {
        display: flex;
        justify-content: space-between;
        .black-bg {
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          position: absolute;
          padding: 20px;
          top: 0;
          left: 0;
          .white-bg {
            width: 54vw;
            height: 68vh; 
            background: white;
            border-radius: 8px;
            padding: 20px;
          }
        }
      }
    }
  }
</style>

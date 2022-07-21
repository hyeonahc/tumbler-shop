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

    <div class="table-page">
      <section class="main">
        <div
          v-show="menuList[0].isShow"
          class="inquireProducts">
          <h1>제품 조회</h1>
          <div class="admin-product">
            <div>
              <button @click="allProductsLookup">
                전체 제품 보기
              </button>
            </div>
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
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>상품명</th>
                  <th>상품 아이디</th>
                  <th>가격</th>
                  <th>재고</th>
                </tr>
              </thead>
              <tbody>
                <AllProductList
                  v-for="(product,index) in allProducts"
                  :key="product.id"
                  :product="product"
                  :index="index" />
              </tbody>
            </table>
          </div>
        </div>
        <section class="main">
          <div
            v-show="menuList[1].isShow"
            class="inquireProducts">
            <salesHistory />
          </div>
        </section>
      </section>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AllProductList from '~/components/AllProductList.vue'
import salesHistory from '~/views/salesHistory.vue'
import AddProduct from '../components/AddProduct.vue'

export default {
  components: {
    AllProductList,
    salesHistory,
    AddProduct,
  },
  data() {
    return {
      modal: false,
      menuList: [
        { name: '제품 조회', isShow: true },
        { name: '판매 내역', isShow: false } 
      ],
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
    },
  }
}
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    align-items: center;
    width: 100%;
    .inquireProducts {
      margin: 6vh 0 0 5vw;
      .admin-product {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1vw;
        .black-bg {
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          position: absolute;
          padding: 20px;
          top: 0;
          left: 0;
          .white-bg {
            width: 60vw;
            height: 70vh; 
            background: white;
            border-radius: 8px;
            padding: 20px;
          }
        }
      }
    }
  }
</style>

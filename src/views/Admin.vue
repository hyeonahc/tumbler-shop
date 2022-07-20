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

    <section class="main">
      <div
        v-show="adminPageMenuList[0].isShow">
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
                :product="product" />
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="adminPageMenuList[1].isShow">
        <SalesHistory />
      </div>
      <div v-show="adminPageMenuList[2].isShow">
        <SalesGraph />
      </div>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AllproductList from '~/components/AllproductList.vue'
import SalesHistory from '~/views/SalesHistory.vue'
import SalesGraph from '~/components/SalesGraph.vue'


export default {
  components: {
    AllproductList,
    SalesHistory,
    SalesGraph
  },
  data() {
    return {
      id: ''
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
    }
  }
}

</script>

<style lang="scss" scoped>
// .main {
//   display: flex;
//   align-items: center;
//   width: 100%;
// }

</style>

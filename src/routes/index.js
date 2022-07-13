import { createRouter, createWebHistory } from 'vue-router'

import AddProduct from '~/components/AddProduct.vue'
import EditProduct from '~/components/EditProduct.vue'
import MainPage from '../views/MainPage.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import MyPage from '../views/MyPage.vue'
import Admin from '../views/Admin.vue'
import myAccount from '../views/myAccount.vue'
import AddAccount from '../views/AddAccount.vue'
import AccountList from '../views/AccountList.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'mainpage', // name을 지정한 이유는, $router.push를 통해 페이지를 이동시킬 때, { name: 'MainPage' } 와 같이 조금 더 명시적으로 작성하기 위함
      component: MainPage
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/signin',
      component: SignIn
    },
    {
      path: '/mypage',
      component: MyPage,
      meta: { 
        auth: true // 로그인을 해야만 접근 할 수 있는 페이지로 설정
      },
      children: [
        { 
          name: 'myAccount',
          path: 'myaccount',
          component: myAccount,
        },
        {
          name: 'AccountList',              
          path: 'accountlist',
          component: AccountList
        },
        {          
          name: 'AddAccount',       
          path: 'addaccount',       
          component: AddAccount
        }
      ]
    },
    // 관리자 페이지
    {
      path: '/admin',
      component: Admin,
    },
        {
          name:'AddProduct',
          path: '/addproduct',
          component: AddProduct,
        },
        {
          name: 'EditProduct',
          path: '/editProduct/:id',
          component: EditProduct,
        }
  ]
})

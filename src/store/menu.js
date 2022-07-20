export default {
  namespaced: true,
  state: () => ({
    myPageMenuList: [
      { name: '구매내역', isShow: true },
      { name: '내 계좌', isShow: false},
      { name: '내 정보 수정', isShow: false}
    ],
    adminPageMenuList: [
      { name: '제품 조회', isShow: true },
      { name: '판매 내역', isShow: false },
      { name: '판매 현황', isShow: false } 
    ]
  }),
  mutations: {
    updateMenu(state, menuName) {
      const whatMenu = 
      state.myPageMenuList.some(menu => menu.name === menuName)
      ? state.myPageMenuList 
      : state.adminPageMenuList
      
      whatMenu.forEach(menu => {
        menu.isShow = false
        if (menu.name === menuName) {
          menu.isShow = true
        }
      })
    }
  },
  actions: {
		isShowMenu({ commit }, menuName) {
      window.sessionStorage.setItem('menu', menuName)
			commit('updateMenu', menuName)
    }
  }
}













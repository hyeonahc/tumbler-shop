export default {
  namespaced: true,
  state: () => ({
    myPageMenuList: [
      { name: '구매내역', isShow: true },
      { name: '내 계좌', isShow: false},
      { name: '내 정보 수정', isShow: false}
    ]
  }),
  mutations: {
    updateMenu(state, menuName) {
      state.myPageMenuList.forEach(menu => {
        menu.isShow = false
        if (menu.name === menuName) {
          menu.isShow = true
        }
      })
    },
  },
  actions: {
		isShowMenu({ commit }, menuName) {
      window.sessionStorage.setItem('menu', menuName)
			commit('updateMenu', menuName)
    }
  }
}













export default {
  namespaced: true,
  state: () => ({
    menuList: [
      { name: '구매내역', isShow: true },
      { name: '내 계좌', isShow: false},
      { name: '내 정보 수정', isShow: false}
    ]
  }),
  mutations: {
    updateMenu(state, menuName) {
      state.menuList.forEach(menu => {
        menu.isShow = false
        if (menu.name === menuName) {
          menu.isShow = true
        }
      })
    },
  },
  actions: {
		isShowMenu({ commit }, menuName) {
			commit('updateMenu', menuName)
    }
  }
}













const state = {
  newArtileData: [],
  linksData: [],
  tagData: [],
  tuijianData: [],
  dianjiData: [],
  informData: {}
}
const mutations = {
  setNewArtileData(state, data) {
    state.newArtileData = data;
  },
  setTuijianData(state, data) {
    state.tuijianData = data;
  },
  setTagData(state, data) {
    state.tagData = data;
  },
  setLinksData(state, data) {
    state.linksData = data;
  },
  setDianjiData(state, data) {
    state.dianjiData = data;
  },
  setInformData(state, data) {
    state.informData = data;
  }
}
const getters = {
  //分页列表
  // getCommentPage(state) {
  //   return function (pageNo, pageSize, type) {
  //     if (state.articleAll.length !== 0) {
  //       let start = pageNo, end = pageSize;
  //       if (pageNo > 0) {
  //         start = (pageNo - 1) * pageSize;
  //         end = start + pageSize;
  //       };
  //       let list = state.articleAll;
  //       if (state.type) {
  //         list = state.articleAll.filter(element => {
  //           return element.typeName === state.type;
  //         });
  //       };
  //       return {
  //         list: list.slice(start, end),
  //         total: list.length
  //       };
  //     }
  //   };
  // },

}
export default {
  state,
  mutations,
  getters
}

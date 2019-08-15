const state = {
  commentAll: []
}
const mutations = {
  setCommentAll(state, data) {
    state.commentAll = data;
  }
}
const getters = {
  //分页列表
  getCommentPage(state) {
    return function (pageNo, pageSize, type) {
      if (state.articleAll.length !== 0) {
        let start = pageNo, end = pageSize;
        if (pageNo > 0) {
          start = (pageNo - 1) * pageSize;
          end = start + pageSize;
        };
        let list = state.articleAll;
        if (state.type) {
          list = state.articleAll.filter(element => {
            return element.typeName === state.type;
          });
        };
        return {
          list: list.slice(start, end),
          total: list.length
        };
      }
    };
  },
  
}
export default {
  state,
  mutations,
  getters
}

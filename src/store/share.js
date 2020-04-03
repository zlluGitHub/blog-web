
const state = {
  shareData: [],
}
const mutations = {
  setShareData(state, data) {
    state.shareData = data;
  }
}
const getters = {
  //分类
  getShareData(state) {
    let shareA = [];
    let shareB = [];
    let shareC = [];
    let shareD = [];
    let shareE = [];
    let shareF = [];
    if (state.shareData) {
      state.shareData.map(function (item) {
        switch (item.type) {
          case 'a':
            shareA.push(item);
            // mark = false;
            break;
          case 'b':
            shareB.push(item);
            // mark = false;
            break;
          case 'c':
            shareC.push(item);
            // mark = false;
            break;
          case 'd':
            shareD.push(item);
            // mark = false;
            break;
          case 'e':
            shareE.push(item);
            // mark = false;
            break;
          case 'f':
            shareF.push(item);
            // mark = false;
            break;
          default:
            break;
        }
      });
      return { shareA, shareB, shareC, shareD, shareE, shareF }
    }
  }
}

const share = {
  state,
  mutations,
  getters
}

export default share

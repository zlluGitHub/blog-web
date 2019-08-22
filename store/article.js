import { log } from "util";

const state = {
  articleAll: [],
  type: '',
  typeMark: '',
  bid: '',
  search: {},
  isSearchShow: false,
  tabName: ''
  // singleArticle: {},
  // artileListData: [],
  // articleTypeData: [],
  // articleReplyData: []
}
const mutations = {
  setArtileAll(state, data) {
    state.articleAll = data;
  },
  setSearchValue(state, data) {
    state.search = data;
  },
  setSearchShow(state, data) {
    state.isSearchShow = data;
  },
  setTab(state, data) {
    state.tabName = data;
  },
  setType(state, type) {
    switch (type) {
      case '前端技术':
        state.typeMark = 'a';
        break;
      case '后端基础':
        state.typeMark = 'b';
        break;
      case '数据库':
        state.typeMark = 'c';
        break;
      case '微信程序':
        state.typeMark = 'd';
        break;
      case '技术杂谈':
        state.typeMark = 'e';
        break;
      default:
        state.typeMark = '';
        break;
    }
    state.type = type;
  },
  setBid(state, id) {
    state.bid = id;
  },



  // setSingleArtile(state, data) {
  //   state.singleArticle = data;
  // },
  // setArtileListData(state, data) {
  //   state.artileListData = data;
  // },
  // getArticleReplyData(state, data) {
  //   state.articleReplyData = data;
  // },
  // setArticleTypeData(state, data) {
  //   state.articleTypeData = data;
  // }
}
const actions = {
  //   setArtile(context, data) {
  //     context.commit('setArtile', data);
  //   },
  //   setSingleArtile(context, bid) {
  //     const data = context.state.article.list.find(item => item.bid === bid);
  //     context.commit('setSingleArtile', data);
  //   },
  //   setSearchData(context, data) {
  //     context.commit('setSearchData', data);
  //   },
  //   getArticleReplyData(context, data) {
  //     context.commit('getArticleReplyData', data);
  //   },
  //   setArticleTypeData(context, data) {
  //     context.commit('setArticleTypeData', data);
  //   }
}
const getters = {
  //获文章取条获件分页列表
  // getArticleReplyPage(state) {
  //   return function (pageNo, pageSize) {
  //     let start = pageNo, end = pageSize;
  //     if (pageNo > 0) {
  //       start = (pageNo - 1) * pageSize;
  //       end = start + pageSize;
  //     }
  //     let list = state.articleReplyData;
  //     return list.slice(start, end);
  //   }
  // },
  //tab页文章列表
  getTabList(state) {
    return function (pageNo, pageSize) {
      if (state.articleAll.length !== 0) {
        let start = pageNo, end = pageSize;
        if (pageNo > 0) {
          start = (pageNo - 1) * pageSize;
          end = start + pageSize;
        };
        let list = state.articleAll.filter(element => {
          return element.keywords.indexOf(state.tabName) > -1;
          // return element.typeName === state.type;
        });
        return {
          list: list.slice(start, end),
          total: list.length
        }
      }
    };
  },
  //分类分页文章列表
  getTypeArticle(state, a) {
    return function (pageNo, pageSize) {
      if (state.articleAll.length !== 0) {
        let start = pageNo, end = pageSize;
        if (pageNo > 0) {
          start = (pageNo - 1) * pageSize;
          end = start + pageSize;
        };
        let list = state.articleAll;
        //根据 search 是否为空来判断是否 展示搜索结果页面
        if (state.isSearchShow) {
          list = state.articleAll.filter(element => {
            return element.title.indexOf(state.search.name) > -1;
            // return element.typeName === state.type;
          });
        } else if (state.search.url === '/tags') {
          list = state.articleAll.filter(element => {
            return element.keywords.indexOf(state.search.name) > -1;
            // return element.typeName === state.type;
          });
          // state.isTags = false;
          //清空tag信息

        } else if (state.typeMark) {
          list = state.articleAll.filter(element => {
            return element.typeName.indexOf(state.typeMark) > -1;
            // return element.typeName === state.type;
          });
        };

        return {
          list: list.slice(start, end),
          total: list.length
        };
      }
    };
  },
  //获取tags标签
  geTagsData(state) {
    let newArr = [], stringArr = [], string = '', data = state.articleAll;
    if (data) {
      data.forEach(ele => {
        stringArr = [...stringArr, ...ele.keywords];
        // string = string + '、' + ele.keywords
      });
      // stringArr = string.substr(1, string.length).split("、");

      var countedNames = stringArr.reduce(function (allNames, name) {
        if (name in allNames) {
          allNames[name]++;
        } else {
          allNames[name] = 1;
        };
        return allNames;
      }, {});

      for (let i in countedNames) {
        newArr.push({
          name: i,
          number: countedNames[i]
        });
      }
    };
    return newArr;
  },
  // //获取热门侧栏标题（b）
  // getBAsideArticle(state) {
  //   let dataArr = [], data = state.article.list;
  //   if (data) {
  //     for (let index = 0; index < data.length; index++) {
  //       if (data[index].classify === "b") {
  //         dataArr.push(data[index]);
  //       }
  //     }
  //     return dataArr.slice(0, 10);
  //   }
  // },
  //获取点击侧栏标题(浏览量)
  // getAsideArticle(state) {
  //   if (state.article.list) {
  //     let data = [...state.article.list];
  //     data.sort(function (a, b) {
  //       return b.viweNum * 1 - a.viweNum * 1;
  //     });
  //     return data.slice(0, 10);
  //   };
  // },
  //获取推荐侧栏标题(点赞数)
  // getTuiJianAsideArticle(state) {
  //   if (state.article.list) {
  //     let data = [...state.article.list];
  //     data.sort(function (a, b) {
  //       return b.starNum * 1 - a.starNum * 1;
  //     });
  //     return data;
  //   };
  // },
  //获取文章浏览总数
  // getArticleAllViweNum(state) {
  //   return function () {
  //     let count = 0, index = 0;
  //     if (state.article.list) {
  //       for (index; index < state.article.list.length; index++) {
  //         count = count + state.article.list[index].viweNum * 1;
  //       };
  //     };
  //     return count;
  //   };
  // },
  // 根据类别获取数据
  // getTypeData(state) {
  //   let list = state.article.list;
  //   return function (query) {
  //     if (query === '' || query === '技术专栏') {
  //       return list;
  //     } else {
  //       let data = list.filter(item => {
  //         if (item.typeName.indexOf(query) != -1) {
  //           item.typeName = query;
  //           return item;
  //         }
  //       });
  //       data.sort(function (a, b) {
  //         return Date.parse(b.publishTime) - Date.parse(a.publishTime); //时间倒叙 如果是从小到大交换啊a ,b位置即可
  //       });
  //       return data;
  //     }
  //   }
  // },
  // 根据tags获取数据
  // getTagsData(state) {
  //   let list = state.article.list;
  //   return function (query) {
  //     if (query === '' || query === '技术专栏') {
  //       return list;
  //     } else {
  //       let data = list.filter(item => {
  //         if (item.keywords.indexOf(query) != -1) {
  //           item.keywords = query;
  //           return item;
  //         }
  //       });
  //       data.sort(function (a, b) {
  //         return Date.parse(b.publishTime) - Date.parse(a.publishTime); //时间倒叙 如果是从小到大交换啊a ,b位置即可
  //       });
  //       return data;
  //     }
  //   }
  // },
  //获取搜索数据
  // getSearchData(state) {
  //   let list = state.article.list;
  //   return function (query) {
  //     if (query === '') {
  //       return list
  //     } else {
  //       return list.filter(item => {
  //         if (item.title.indexOf(query) !== -1) {
  //           return item
  //         };
  //       });
  //     };
  //   };
  //   // return state.carts.reduce(
  //   //   (obj, food) => ({
  //   //     allCount: obj.allCount + food.count,
  //   //     total: obj.total + food.price * food.count
  //   //   }),
  //   //   {
  //   //     allCount: 0,
  //   //     total: 0
  //   //   }
  //   // )
  // },
  //获取文章条件分页列表
  // getSearchPage(state) {
  //   return function (pageNo, pageSize) {
  //     let start = pageNo, end = pageSize;
  //     if (pageNo > 0) {
  //       start = (pageNo - 1) * pageSize;
  //       end = start + pageSize;
  //     }
  //     let list = state.searchData;
  //     return {
  //       list: list.slice(start, end),
  //       total: list.length
  //     };
  //   }
  // },
  //获文章取条获件分页列表
  // getArticleTypeData(state) {
  //   return function (pageNo, pageSize) {
  //     let start = pageNo, end = pageSize;
  //     if (pageNo > 0) {
  //       start = (pageNo - 1) * pageSize;
  //       end = start + pageSize;
  //     }
  //     let list = state.articleTypeData;
  //     return {
  //       list: list.slice(start, end),
  //       total: list.length
  //     };
  //   }
  // }
}
export default {
  state,
  actions,
  mutations,
  getters
}

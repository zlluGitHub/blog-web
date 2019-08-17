<template>
  <div class="tab">
    <h3 class="htitle">
      <a
        @click="handleTab(1,'JavaScript')"
        :class="[mark===1?'newscurrent':'']"
        href="javascript:void(0);"
      >JavaScript</a>
      <a
        @click="handleTab(2,'Vue/React')"
        :class="[mark===2?'newscurrent':'']"
        href="javascript:void(0);"
      >Vue/React</a>
      <a
        @click="handleTab(3,'NodeJs')"
        :class="[mark===3?'newscurrent':'']"
        href="javascript:void(0);"
      >NodeJs</a>
      <a
        @click="handleTab(4,'Echarts')"
        :class="[mark===4?'newscurrent':'']"
        href="javascript:void(0);"
      >Echarts</a>
    </h3>
    <!-- tab1 -->
    <div class="newstab">
      <div class="newsitem">
        <ul v-if="tabsData">
          <li v-for="item in tabsData" :key="item.title">
            <img :src="URL+item.imgSrc" :alt="item.title" />
            <div>
              <p>
                  <nuxt-link
                :to="'/detail/'+item.bid"
                @click.native="handleTo(item.bid)"
              >{{item.title}}</nuxt-link>
                <!-- <a
                  href="javascript:void(0);"
                  @click="handleTo(item.bid,'','',item.title)"
                >{{item.title}}</a> -->
                <span>{{item.publishTime}}</span>
              </p>
              <p>{{item.description}}</p>
            </div>
          </li>
        </ul>
        <div v-else class="demo-spin-col" span="8">
          <Spin fix>
            <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>
        </div>
        <!-- <ol>
          <li v-for="item in tabsData.leftData">
            <a href="javascript:void(0);" @click="handleTo(item.bid,'','',item.title)">
              <img :src="URL+item.imgSrc" :alt="item.title" />
              <span>{{item.title}}</span>
            </a>
          </li>
        </ol>
        <ul>
          <li v-for="item in tabsData.rightData">
            <h4>
              <i class="fa fa-hand-o-right fa-lg"></i>
              <a
                href="javascript:void(0);"
                @click="handleTo(item.bid,'','',item.title)"
              >{{item.title}}</a>
            </h4>
            <p>{{item.description}}</p>
          </li>
        </ul>-->
      </div>
      <p v-if="total>6">
        <i class="fa fa-angle-double-right"></i>
        <i class="fa fa-angle-double-right"></i>
        <span @click.stop="handleRouter">加载更多</span>
        <i class="fa fa-angle-double-left"></i>
        <i class="fa fa-angle-double-left"></i>
      </p>
    </div>
  </div>
</template>
<script>
// import { URL } from "../constant/constant.js";
export default {
  name: "tab",
  data: () => ({
    URL: process.env.BASE_URL,
    mark: 1,
    // articleData: [],
    tabsData: [],
    total:0,
    type: "JavaScript"
  }),
  computed: {
    articleData() {
      return this.$store.state.article.articleAll;
    }
  },
  watch: {
    articleData() {
      this.getArticle();
    }
  },
  created() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      this.$store.commit("setTab", this.type);
      let data = this.$store.getters.getTabList(1, 6);
      if (data) {
        this.tabsData = data.list;
        this.total = data.total;
      }
    },
    handleTo(bid, nav, url, title) {
      // 将bid存储到store中
      // this.$store.dispatch("setRouter", { nav, url, title });
      // this.$store.dispatch("setSingleArtile", bid);
      // this.$router.push({
      //   path: "/article",
      //   query: {
      //     bid: bid
      //   }
      // });
    },
    handleTab(val, tabName) {
      this.type = tabName;
      this.mark = val;
      this.getArticle();
    },
    handleRouter() {
      // let nav = this.type;
      // let pageData = this.$store.getters.getTypeData(nav);
      // this.$store.dispatch("setArticleTypeData", pageData);
      // this.$store.dispatch("setRouter", { nav, url: "/type", title: "" });
      this.$router.push({ path: "/tabs" });
      // this.$store.dispatch("setChangingOver", {
      //   position: true
      // });
      // //侧边栏配置
      // this.$store.dispatch("setAsideSingleConfigsData", "b");
    }
  }
};
</script>

<style lang="scss" scoped>
.tab {
  // padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  h3.htitle {
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 0px 15px;
    > a {
      padding: 15px;
      margin-right: 10px;
      color: #666;
      font-weight: 400;
      font-size: 16px;
      position: relative;
    }

    > a.newscurrent:after {
      content: "";
      width: 100%;
      height: 2px;
      position: absolute;
      bottom: -1px;
      left: 0;
      background: #1487f4;
    }
    > a.newscurrent {
      color: #1487f4;
    }
    > a:hover:after {
      content: "";
      width: 100%;
      height: 2px;
      position: absolute;
      bottom: -1px;
      left: 0;
      background: #1487f4;
    }
    > a:hover {
      color: #1487f4;
    }
  }
  .newstab {
    padding: 10px 20px;
    margin-bottom: 15px;
    > p {
      border-top: 1px solid #eee;
      cursor: pointer;
      font-size: 16px;
      text-align: center;
      margin-top: 15px;
      padding-top: 15px;
      span {
        margin: 0px 5px;
      }
    }
    > p:hover {
      color: #1487f4;
    }

    .newsitem {
      // display: flex;
      // ol {
      //   list-style: none;
      //   li {
      //     padding: 2px;
      //     border: 1px solid #f3f3f3;
      //     margin-right: 10px;
      //     a {
      //       background: rgba(0,0,0,1);
      //       position: relative;
      //       display: block;
      //       overflow: hidden;
      //       z-index: 2;
      //       img {
      //         display: block;
      //         width: 278px;
      //         height: 120px;
      //         transition: all 0.3s ease;
      //       }
      //       img:hover {
      //         transform: scale(1.1);
      //       }
      //       span {
      //         bottom: 0;
      //         position: absolute;
      //         bottom: 30%;
      //         left: 0;
      //         right: 0;
      //         color: #fff;
      //         text-align: center;
      //         font-size: 15px;
      //         padding: 0 40px;
      //         overflow: hidden;
      //         text-overflow: ellipsis;
      //         line-height: 22px;
      //       }
      //     }
      //   }
      //   li:nth-child(1) {

      //       margin-bottom: 15px;

      //   }
      // }
      ul {
        display: flex;
        flex-wrap: wrap;
        li:hover {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        li {
          width: 412px;
          display: flex;
          padding: 10px 5px;
          // padding-left: 0px;
          border: 1px solid #f3f3f3;
          margin: 4px 4px;
          transition: all 0.5s ease;
          img {
            display: block;
            width: 112px;
            height: 76px;
            padding: 2px;
            border: 1px solid #f3f3f3;
          }
          > div {
            margin-left: 10px;
            margin-right: 10px;
            p:nth-child(1) {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
              a {
                color: #666;
                font-weight: 700;
                font-size: 14px;
                width: 72%;
                height: 20px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
              }
              a:hover {
                color: #1487f4;
              }
              span {
                font-size: 12px;
                font-weight: 200;
                padding-top: 2px;
                color: #999;
              }
            }
            p:nth-child(2) {
              overflow: hidden;
              height: 50px;
              font-size: 12px;
              font-weight: 200;
              line-height: 24px;
              color: #999;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
        }
      }
      // ul {
      //   li {
      //     padding: 8px;
      //     h4 {
      //       display: flex;
      //       a {
      //         color: #666;
      //       }
      //     }
      //     i {
      //       //   width: 20px;
      //       //   height: 20px;
      //       //   display: block;
      //       //   position: relative;
      //       //   background: #9a9a9a;
      //       margin-right: 12px;
      //     }
      //     // i::before {
      //     //   position: absolute;
      //     //   left: 0;
      //     //   top: 0;
      //     //   font-size: 9px;
      //     //   color: #fff;
      //     //   line-height: 20px;
      //     //   width: 20px;
      //     //   text-align: center;
      //     // }
      //     p {
      //       margin-top: 5px;
      //       height: 78px;
      //       display: none;
      //       color: #999;
      //       font-size: 12px;
      //       line-height: 19px;
      //       text-indent: 2em;
      //       margin-left: 28px;
      //       -webkit-box-orient: vertical;
      //       -webkit-line-clamp: 3;
      //       overflow: hidden;
      //     }
      //   }
      //   li:nth-child(1) {
      //     background-color: #eee;
      //     i::before {
      //       color: #a8e957;
      //     }
      //   }
      //   li:nth-child(2) {
      //     i::before {
      //       color: #8dcffb;
      //     }
      //   }
      //   li:nth-child(3) {
      //     i::before {
      //       color: #ffcb96;
      //     }
      //   }
      //   li:nth-child(4) {
      //     i::before {
      //       color: #ffc2d8;
      //     }
      //   }
      //   li:nth-child(5) {
      //     i::before {
      //       color: #86f5f0;
      //     }
      //   }
      //   li:nth-child(1) {
      //     p {
      //       display: block;
      //     }
      //   }
      // }
      // ul:hover {
      //   li:hover {
      //     background-color: #eee;
      //     a {
      //       color: #45b6f7;
      //     }
      //     p {
      //       display: block;
      //     }
      //   }
      //   li:nth-child(1):hover {
      //     background-color: #eee;
      //     p {
      //       display: block;
      //     }
      //   }
      //   li:nth-child(1) {
      //     background-color: #fff;
      //     p {
      //       display: none;
      //     }
      //   }
      // }
    }
  }
}
</style>

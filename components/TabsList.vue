<template>
  <div class="tab">
    <h3 class="htitle">
      <a
        @click="handleTab(1,'JavaScript')"
        :class="[mark===1?'newscurrent':'']"
        href="javascript:void(0);"
      >JavaScript</a>
      <a
        @click="handleTab(2,'html、css')"
        :class="[mark===2?'newscurrent':'']"
        href="javascript:void(0);"
      >H5 / CSS</a>
      <a
        @click="handleTab(3,'Vue、React')"
        :class="[mark===3?'newscurrent':'']"
        href="javascript:void(0);"
      >Vue / React</a>
      <!-- <a
        @click="handleTab(4,'Echarts、d3')"
        :class="[mark===4?'newscurrent':'']"
        href="javascript:void(0);"
      >Echarts / D3</a> -->
      <a
        @click="handleTab(5,'NodeJs')"
        :class="[mark===5?'newscurrent':'']"
        href="javascript:void(0);"
      >NodeJs</a>
    </h3>
    <!-- tab1 -->
    <div class="newstab">
      <div class="newsitem">
        <div v-if="tabsData">
          <ul v-if="tabsData.length!==0">
            <li v-for="item in tabsData" :key="item.title">
              <img :src="$url+'/'+item.imgSrc" :alt="item.title" />
              <div>
                <p>
                  <nuxt-link :to="{ path: '/detail/', query: { id: item.bid}}">{{item.title}}</nuxt-link>
                  <!-- <a
                    @click="handleLook(item.bid,isStatic,item.title)"
                    :href="isStatic?URL+item.bid:'javascript:void(0);'"
                  >{{item.title}}</a>-->
                  <span>{{item.publishTime}}</span>
                </p>
                <p>{{item.description}}</p>
              </div>
            </li>
          </ul>
          <div v-else class="no-content">
            <span>暂无内容！</span>
          </div>
        </div>
        <div v-else class="demo-spin-col" span="8">
          <Spin fix>
            <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>
        </div>
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
    pageNo: 1,
    pageSize: 6,
    keywords: "JavaScript",
    tabsData: [],

    isStatic: false,
    // imgUrl: process.env.baseUrl + "/zllublogAdmin/",
    URL: process.env.baseUrl + "/detail/",
    mark: 1,
    // articleData: [],

    total: 0,
    type: "JavaScript"
  }),
  // props: {
  //   static: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  // computed: {
  //   articleData() {
  //     return this.$store.state.article.articleAll;
  //   }
  // },
  // watch: {
  //   articleData() {
  //     this.getArticle();
  //   },
  //   // static(data) {
  //   //   this.isStatic = data;
  //   // }
  // },
  created() {
    // this.isStatic = this.static;
    this.getArticle();
  },
  methods: {
    getArticle() {
      let data = {
        // pageNo: this.pageNo,
        // pageSize: this.pageSize,
        keywords: this.keywords
      };
      this.$axios
        .get(this.$url + "/zll/article/list", { params: data })
        .then(res => {
          if (res.data.result) {
            let data = res.data.list.slice(0, 6);

            this.tabsData = data.map(item=>{
              item.publishTime = item.publishTime.slice(0,10);
              return item;
            });
            this.total = res.data.count;
          }
          // data.forEach(ele => {
          //   ele.keywords = ele.keywords.split("、");
          //   ele.publishTime = ele.publishTime.slice(0, 10);
          // });
          // this.show = false;
          // this.$store.commit("setArtileAll", data);
        });
      // this.$store.commit("setTab", this.type);
      // let data = this.$store.getters.getTabList(1, 6);
      // if (data) {
      //   this.tabsData = data.list;
      //   this.total = data.total;
      // }
    },
    handleTab(val, tabName) {
      this.keywords = tabName;
      this.mark = val;
      this.getArticle();
    },
    //跳转到详情页
    handleLook(bid, isStatic) {
      // 将bid存储到store中
      // this.$store.commit("setBid", bid);
      // if (!isStatic) {
      //   this.$router.push({ path: "/detail/" + bid });
      // }
    },
    handleRouter() {
      this.$store.commit("setTagValue", this.keywords);
      this.$router.push({ path: "/tags" });
      // 返回顶部
      this.$goBack();
    }
  }
};
</script>

<style lang="scss" scoped>
.tab {
  // padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  .no-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
  }
  h3.htitle {
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 0px 15px;
    > a {
      padding: 15px;
      margin-right: 20px;
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
          width: 403px;
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
            width: 315px;
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

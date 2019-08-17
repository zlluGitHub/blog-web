<template>
  <div class="article_list box-bj-sd">
    <h3 class="h3-style" :class="[mark?'default':'']">
      <p v-if="mark">
        关于
        <span>{{searchVal}}</span> 关键词共检索到
        <span>{{total}}</span> 条记录
      </p>
      <span v-else>
        <i class="fa fa-list-ul"></i>
        {{type}}
      </span>
    </h3>
    <div class="article-box">
      <div v-if="dataList.length===0" class="article_tip">
        <span>暂无任何数据</span>
      </div>
      <div v-else class="article_list" v-for="item in dataList" :key="item.title">
        <div class="list-box">
          <div class="img-box">
            <img v-if="item.imgSrc" :src="URL+item.imgSrc" :alt="item.title" />
            <img v-else src="../assets/image/moren.jpg" :alt="item.title" />
            <!-- <span class="is_category">{{item.typeName}}</span> -->
          </div>
          <div class="list-right">
            <h2>
              <span>{{item.typeName}}</span>
              <nuxt-link
                :to="'/detail/'+item.bid"
                @click.native="handleLook(item.bid)"
              >{{item.title}}</nuxt-link>
              <!-- <a href="javascript:void(0);">{{item.title}}</a> -->
            </h2>
            <p>{{item.description}}</p>
            <div>
              <p class="tag-list">
                <span>
                  <i class="fa fa-calendar"></i>
                  {{item.publishTime.slice(0,10)}}
                </span>
                <!-- <span>
                <i class="fa fa-user"></i>
                {{item.author}}
                </span>-->
                <span>
                  <i class="fa fa-eye"></i>
                  {{item.viweNum}} 次阅读
                </span>
                <span class="tags-a">
                  <i class="fa fa-tag"></i>
                  <a
                    href="javascript:void(0);"
                    v-for="(tag,index) in item.keywords"
                    :key="index"
                    @click="handleTo(tag,'/type','')"
                  >{{tag}} {{index!==item.keywords.length-1?'、':''}}</a>
                  <!-- <a
                  class="typeName"
                  @click="handleTo(item.typeName,'/type','')"
                  href="javascript:void(0);"
                  >【{{item.typeName}}】</a>-->
                </span>
              </p>
              <nuxt-link
                class="read"
                :to="'/detail/'+item.bid"
                @click.native="handleLook(item.bid)"
              >
                阅读全文
                <i class="fa fa-chevron-circle-right"></i>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Page
      show-total
      @on-change="changePage"
      @on-page-size-change="changeSizePage"
      :total="total"
      show-sizer
    />
  </div>
</template>
<script>
// import { URL } from "../constant/constant.js";
export default {
  data: () => ({
    URL: process.env.baseUrl,
    dataList: [],
    pageNo: 0,
    pageSize: 10,
    total: 0,
    searchVal: "未知内容"
  }),
  props: {
    type: {
      type: String,
      default: "分类标题"
    },
    mark: {
      type: Boolean,
      default: false
    },
    tabs: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    articleData() {
      return this.$store.state.article.articleAll;
    },
    typeMark() {
      return this.$store.state.article.typeMark;
    },
    searchValue() {
      return this.$store.state.article.search;
    }
  },
  watch: {
    articleData() {
      this.getArticle();
    },
    typeMark() {
      this.getArticle();
    },
    searchValue() {
      this.getArticle();
    }
  },
  created() {
    this.getArticle();
  },
  mounted() {
    // this.handleData(this.dataList);
    //首页通知
    // this.$store.dispatch("setChangingOver", { notice: false, position: true });
  },
  methods: {
    getArticle() {
      let data = [];
      //判断是否为首页tabs列表
      if (this.tabs) {
       
        
        data = this.$store.getters.getTabList(this.pageNo, this.pageSize);
         console.log(data);
      } else {
        this.searchVal = this.$store.state.article.search.name;
        data = this.$store.getters.getTypeArticle(this.pageNo, this.pageSize);
      }

      if (data) {
        this.dataList = data.list;
        this.total = data.total;
      }
    },
    changePage(event) {
      this.pageNo = event;
      this.getArticle();
      // goBack();
    },
    changeSizePage(event) {
      this.pageSize = event;
      this.getArticle();
      // goBack();
    },
    handleLook(bid) {
      // 将bid存储到store中
      this.$store.commit("setBid", bid);
      // this.$store.dispatch("setSingleArtile", bid);
      // this.$router.push({
      //   path: "/article",
      //   query: {
      //     bid: bid
      //   }
      // });
    }
  }
};
</script>
<style lang="scss" scoped>
h3 {
  p {
    span {
      color: red;
    }
  }
}
h3.default {
  display: flex;
  align-items: center;
}
h3.default::before {
  width: 0;
  height: 0;
}
.article-box {
  .article_tip {
    text-align: center;
    padding: 100px;
    color: #666;
    // background-color: #fff;
    margin-bottom: 15px;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  }
  // .article_list a {
  //   // color: #ff5e5c;
  //   color: #337ab7;
  // }
  .article_list:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  }
  .article_list {
    padding: 15px;
    color: #666;
    // background-color: #fff;
    margin-bottom: 15px;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;

    h2 {
      // padding: 0px 15px;
      // padding-top: 8px;
      margin: 0px;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      > span {
        position: relative;
        background-color: #3f51b5;
        font-size: 12px;
        line-height: 14px;
        display: inline-block;
        padding: 4px 6px 3px;
        color: #fff;
        vertical-align: baseline;
        white-space: nowrap;
      }
      > span::after {
        content: "";
        position: absolute;
        width: 0;

        height: 0;
        vertical-align: top;
        top: 6px;
        right: -4px;
        border-left: 4px solid #3f51b5;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
      }
      > a {
        color: #666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 20px;
        margin-left: 10px;
        font-weight: 400;
        transform: translate(0, 0);
        transition: all 0.2s ease-in;
      }
      > a:hover {
        // color: #ff5e5c;
        color: #337ab7;
        transform: translate(10px, 0);
      }
    }

    .list-box {
      display: flex;
      .img-box {
        position: relative;
        padding: 2px;
        border: 1px solid #f3f3f3;
        width: 28%;
        height: 150px;
        margin-right: 18px;
        // border-radius: 3px;
        // background-color: #999;
        overflow: hidden;
        img {
          transform: scale(1, 1);
          transition: transform 0.5s ease;
          width: 100%;
          height: 100%;
        }
        .is_category {
          position: absolute;
          top: 5px;
          left: 5px;
          font-size: 12px;
          background-color: rgba(0, 0, 0, 0.5);
          color: #efefef;
          padding: 4px 8px;
        }
      }
      .img-box:hover img {
        transform: scale(1.1, 1.1);
      }
      .list-right {
        width: 69%;

        p.tags {
          padding-right: 20px;
          font-weight: 400;
          > a {
            font-size: 12px;
            padding: 3px 8px;
            margin-right: 10px;
            border-radius: 3px;
            color: #096;
            // color: #ac5a24;
            border: 1px solid rgb(0, 158, 106);
            opacity: 0.5;
            transition: all 0.3s ease;
          }
          > a:hover {
            opacity: 1 !important;
          }
        }

        p:nth-child(2) {
          text-indent: 2em;
          font-size: 14px;
          font-weight: 300;
          height: 78px;
          color: #666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          line-height: 25px;
          margin-bottom: 8px;
        }
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-weight: 300;
          .tag-list {
            // margin-bottom: 10px;
            // border-top: 1px solid #eee;
            font-size: 12px;
            .tags-a {
              a {
                margin-right: 5px;
              }
              a:hover {
                color: #12b7de;
              }
            }
            span {
              margin-right: 15px;
              i {
                margin-right: 5px;
              }
              a {
                color: #666;
              }
              > a.typeName:hover {
                color: #12b7de;
              }
            }
            // .fa-clock-o {
            //   color: #888888;
            // }
            // .fa-user {
            //   color: #e4aeae;
            // }
            // .fa-eye {
            //   color: #8ea0d0;
            // }
            // .fa-tag {
            //   color: #ffc2d8;
            // }
          }
          > span {
            padding: 5px 10px;
            border-radius: 3px;
            color: #333;
            font-size: 14px;
            // background-color: #ff5e5c;
            // background-color: #12b7de;
            // transition: all 0.3s ease;
          }
          span.read:hover {
            color: #51aded !important;
            cursor: url("../assets/image/b.png"), auto;
          }
        }
      }
    }
  }
}
</style>

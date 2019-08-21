<template>
  <article>
    <div class="box-bj-sd warp">
      <h1>{{articleData.title}}</h1>
      <ul class="meta">
        <li>
          <i class="fa fa-calendar"></i>
          发布时间：{{articleData.publishTime}}
        </li>
        <li>
          <i class="fa fa-user fa-lg"></i>
          发布者：{{articleData.author}}
        </li>
        <li class="viewNum">
          <i class="fa fa-eye fa-lg"></i>
          围观数：{{articleData.viweNum}}
        </li>
        <!-- <li>
          <i class="fa fa-heartbeat fa-lg"></i>
          点赞：{{starNum}}
        </li>-->
      </ul>
      <div class="article-meta">
        <div class="inner" v-html="articleData.content"></div>
        <p style="text-align: center;margin-top: 25px;">
          <font>- - - END - - -</font>
        </p>
        <p style="text-align: center;margin-top: 15px;">
          <font>
            浏览完了？你可以
            <a href="#word" style="text-decoration: none;color: #096">点我去评论</a>留下观点！
          </font>
        </p>
        <!-- tag标签 -->
        <p class="tags">
          <i data-v-0994aea9 class="fa fa-tags"></i>：
          <!-- <a
            href="javascript:void(0);"
            v-for="(tag,index) in articleData.keywords"
            :key="index"
            :style="'background-color:'+ getRandomColor()+';opacity: 0.8;'"
          >{{tag}}</a>-->
          <nuxt-link
            v-for="(tag,index) in articleData.keywordsArr"
            :key="index"
            to="/tags"
            @click.native="handleTo(tag,'/tags')"
            :style="'background-color:'+ getRandomColor()+';opacity: 0.8;'"
          >{{tag}}</nuxt-link>
        </p>
        <p class="share">
          <!-- <b>转载：</b>
          本站原创文章由LING☆璐个人发表，如需转载敬请将本文链接作为出处标注，谢谢合作！
          <br />-->
          <span>本文链接地址：</span>
          {{URL+articleData.bid}}
          <!-- <a :href="'https://zhenglinglu.cn/article?bid='+bid" target="_blank">{{articleData.title}}</a> -->
        </p>
        <!-- <div>
          <span class="diggit" @click.stop="handleClick">
            <a href="JavaScript:void(0);">棒棒哦！</a>(
            <b id="diggnum">{{starNum}}</b> )
          </span>
        </div>-->
      </div>
    </div>
    <div class="page box-bj-sd" id="word">
      <p>
        上一篇：
        <a
          v-if="prevArticle"
          @click="handleLook(prevArticle.bid,isStatic,nextArticle.title)"
          :href="isStatic?URL+prevArticle.bid:'javascript:void(0);'"
        >{{prevArticle.title}}</a>
        <a v-else href="javascript:void(0);">没有了！</a>
      </p>
      <p>
        下一篇：
        <a
          v-if="nextArticle"
          @click="handleLook(nextArticle.bid,isStatic,nextArticle.title)"
          :href="isStatic?URL+nextArticle.bid:'javascript:void(0);'"
        >{{nextArticle.title}}</a>
        <a v-else href="javascript:void(0);">没有了！</a>
      </p>
    </div>
    <div class="say-box">
      <ArticleWord :word="{id,title}" />
    </div>
  </article>
</template>
<script>
import ArticleWord from "./ArticleWord";
// import hljs from "highlight.js";
// import Vue from "vue";
// import { URL } from "../constant/constant.js";
// import { goBack } from "../assets/gloable.js";
// import Qs from "qs";
export default {
  name: "article-sing",
  components: {
    ArticleWord
  },
  head() {
    return {
      title: this.articleData ? this.articleData.title : "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.articleData ? this.articleData.description : ""
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.articleData ? this.articleData.keywords : ""
        }
      ]
    };
  },
  data: () => ({
    articleData: {},
    prevArticle: {},
    nextArticle: {},
    id: "",
    title: "",
    isStatic: false,
    URL: process.env.baseUrl + "/detail/",
    // -------------
    data: {},

    index: 0,

    starNum: 0,
    count: 1 //点赞计数
  }),
  props: {
    bid: {
      type: String,
      default: ""
    },
    article: {
      type: Object,
      default: {}
    },
    static: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // tagsArr() {
    //   return this.data.keywords.split("、"); //字符分割 ;
    // },
    articleAll() {
      return this.$store.state.article.articleAll;
    }
    // singleArticle() {
    //   return this.$store.state.article.singleArticle;
    // }
  },
  watch: {
    static(data) {
      this.isStatic = data;
    },
    article(data) {
      this.handleData(this.bid, data);
    },
    bid(bid) {
      //监听文章数据
      this.handleData(bid);
    },
    articleAll() {
      //监听文章数据
      this.handleData(this.bid);
    }
  },

  created() {
    this.isStatic = this.static;
    this.handleData(this.bid, this.article);
    // this.$store.dispatch("setSingleArtile", this.$route.query.bid);
    // //首页通知
    // this.$store.dispatch("setChangingOver", { notice: false, position: true });
    // // 侧边栏初始化
    // this.$store.dispatch("setAsideSingleConfigsData", "b");
    // this.data = this.$store.state.article.singleArticle;
    // this.starNum = this.data.starNum;
    // this.bid = this.data.bid;
    // this.title = this.data.title;
    // this.getPrevNext();
  },
  methods: {
    handleData(bid, article) {
      if (this.isStatic) {
        article.middle.keywords = article.middle.keywords.replace("、", "，");
        article.middle.keywordsArr = article.middle.keywords.split("，");
        this.prevArticle = article.prev;
        this.articleData = article.middle;
        this.nextArticle = article.next;
      } else {
        this.id = bid;
        var data = this.$store.state.article.articleAll;
        let length = data.length;
        if (length !== 0 && bid) {
          for (let index = 0; index < length; index++) {
            if (data[index].bid === bid) {
              this.prevArticle = index !== 0 ? data[index - 1] : false;
              this.articleData = data[index];
              //  console.log(this.articleData);
              // this.articleData.keywords = this.articleData.keywords.replace("、","，");
              this.articleData.keywordsArr = this.articleData.keywords;
              this.nextArticle = index !== length - 1 ? data[index + 1] : false;
              break;
            }
          }

          // this.title = this.articleData.title;
        }
      }
    },
    // 标签跳转
    handleLook(bid, isStatic) {
      // 将bid存储到store中
      this.$store.commit("setBid", bid);
      if (!isStatic) {
        this.$router.push({ path: "/detail/" + bid });
      }
      // this.$store.dispatch("setSingleArtile", bid);
      // this.$router.push({
      //   path: "/article",
      //   query: {
      //     bid: bid
      //   }
      // });
    },
    //跳转到详情页
    handleTo(name, url) {
      this.$store.commit("setSearchValue", { name, url });
      // 返回顶部
      this.$goBack();
    },

    // handleClick() {
    //   if (this.count <= 1) {
    //     this.count = this.count + 1;
    //     this.starNum = this.starNum * 1 + 1;
    //     this.axios
    //       .post(
    //         URL + "article/upd.article.php",
    //         Qs.stringify({ starNum: this.starNum, bid: this.bid })
    //       )
    //       .then(function(res) {})
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    //   } else {
    //     this.$Modal.info({
    //       title: "友情提示",
    //       content: "您已成功点赞，谢谢您的支持哦！(๑*◡*๑)"
    //     });
    //   }
    // },
    // getPrevNext() {
    //   const _this = this;
    //   let listData = this.$store.state.article.articleAll;
    //   for (let index = 0; index < listData.length; index++) {
    //     if (listData[index].bid === _this.bid) {
    //       _this.index = index;
    //     }
    //   }
    //   if (this.index === 0) {
    //     this.data = listData[0];
    //     this.nextArticle = listData[this.index + 1];
    //     this.prevArticle = {};
    //   } else if (this.index === listData.length - 1) {
    //     this.data = listData[listData.length - 1];
    //     this.prevArticle = listData[this.index - 1];
    //     this.nextArticle = {};
    //   } else {
    //     this.prevArticle = listData[this.index - 1];
    //     this.nextArticle = listData[this.index + 1];
    //   }
    // },
    // handleNext(bid, title) {
    //   this.$store.dispatch("setSingleArtile", bid);
    //   this.bid = bid;
    //   this.title = title;
    //   this.$router.push({
    //     path: "/article",
    //     query: {
    //       bid: bid
    //     }
    //   });
    //   // 返回顶部
    //   // goBack();
    // },
    // handlePrev(bid) {
    //   this.$store.dispatch("setSingleArtile", bid);
    //   this.bid = bid;
    //   this.title = title;
    //   this.$router.push({
    //     path: "/article",
    //     query: {
    //       bid: bid
    //     }
    //   });
    // },
    // 获取随机颜色
    getRandomColor() {
      return (
        "#" +
        ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(
          -6
        )
      );
    }
  }
};
</script>
<style lang="scss" scoped>
article {
  word-wrap: break-word;
  color: #666;
  .warp {
    padding: 12px;
    margin-bottom: 12px;
  }
  line-height: 24px;
  border-radius: 3px;
  margin-bottom: 20px;
  h1 {
    margin-top: 20px;
    color: #666;
    text-align: center;
    font-size: 25px;
    line-height: 33px;
    font-weight: bold;
    margin-bottom: 12px;
    padding: 12px 0;
  }

  ul.meta {
    position: relative;
    margin-top: 25px;
    // background-color: #f8f8f8;
    border-top: 1px dashed #999;
    border-bottom: 1px dashed #999;
    // color: #ac5a24;
    padding: 5px 0px;
    display: flex;
    // margin-bottom: 15px;
    margin-right: 10px;
    margin-left: 10px;
    justify-content: center;
    li {
      padding: 0 20px;
      margin: 0px 20px;
      // color: #606060;
      font-size: 13px;
      i {
        margin-right: 5px;
      }
    }
    // li:nth-child(1) i {
    //   color: #009966;
    // }
    // li:nth-child(2) i {
    //   color: #f8b06b;
    // }
    // li:nth-child(3) i {
    //   color: #add895;
    // }
    // li:nth-child(4) i {
    //   color: #e4aeae;
    // }
  }
  .article-meta {
    padding-top: 25px;
    // border-top: 1px solid #eee;
    // .code-highlight {
    //   padding-bottom: 70px;
    // }
    font-size: 15px;
    p.tags {
      padding-left: 20px;
      font-size: 15px;
      margin-top: 15px;
      font-weight: 600;
      a {
        font-size: 13px;
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 3px;
        color: #fff;
      }
      a:hover {
        opacity: 1 !important;
        transform: scale(1.1);
      }
    }
    .inner {
      padding: 0 10px;
      font-size: 15px;
      p {
        display: block;
        text-indent: 2em;
        .imgWidth {
          width: 100%;
        }
      }
    }

    .explain {
      width: 95%;
      font-size: 13px;
      border-radius: 3px;
      line-height: 28px;
      padding: 15px 10px;
      background-color: #fffce7;
      border: 1px dashed #9acbe8;
      color: #ff4000;
      margin: 0 8px;
      a {
        color: #666;
        font-size: 16px;
      }
    }
    .share {
      margin: 25px 20px;
      padding: 10px 0px;
      background: #f7f7f7;
      border-left: 3px solid #000;
      span {
        margin-left: 25px;
      }
    }
  }

  .say-box {
    padding-top: 20px;
    // border-top: 1px dashed #aaa;
    p {
      text-align: right;
      margin-right: 30px;
    }
  }
  .diggit {
    display: block;
    width: 160px;
    margin: 20px auto;
    background: #e2523a;
    color: #fff;
    box-shadow: 1px 2px 6px 0px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    line-height: 40px;
    text-align: center;
    a {
      color: #fff;
    }
  }
  .page {
    // border-top: 1px dashed #aaa;
    padding: 15px 60px;
    display: flex;
    justify-content: space-between;
    p {
      a {
        color: #ac5a24;
      }
      a:hover {
        color: #e2523a;
      }
    }
  }
}
</style>

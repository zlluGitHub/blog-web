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
        <li>
          <i class="fa fa-heartbeat fa-lg"></i>
          点赞：{{articleData.starNum}}
        </li>
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
            v-for="(tag,index) in articleData.keywords"
            :key="index+'sd'"
            to="/tags"
            @click.native="handleTo(tag)"
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
        <div>
          <span class="diggit" @click.stop="handleClickStar">
            <a href="JavaScript:void(0);">棒棒哦！</a>(
            <b id="diggnum">{{starNum}}</b> )
          </span>
        </div>
      </div>
    </div>
    <div class="page box-bj-sd" id="word">
      <p>
        上一篇：
        <a
          v-if="prevArticle"
          @click.stop="handleLook(prevArticle.bid)"
          href="javascript:void(0);"
        >{{prevArticle.title}}</a>
        <a v-else href="javascript:void(0);">没有了！</a>
      </p>
      <p>
        下一篇：
        <a
          v-if="nextArticle"
          @click.stop="handleLook(nextArticle.bid)"
          href="javascript:void(0);"
        >{{nextArticle.title}}</a>
        <a v-else href="javascript:void(0);">没有了！</a>
      </p>
    </div>
    <div class="say-box">
      <ArticleWord :word="wordObj" />
    </div>
  </article>
</template>
<script>
import ArticleWord from "./ArticleWord";
// import hljs from "highlight.js";
// import Vue from "vue";
// import { URL } from "../constant/constant.js";
// import { goBack } from "../assets/gloable.js";
import Qs from "qs";
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
    guessArticle: {},
    bid: "",
    wordObj: {},

    title: "",
    isStatic: false,
    URL: process.env.baseUrl + "/detail/",
    // -------------
    data: {},

    index: 0,

    starNum: 0,
    count: 1 //点赞计数
  }),
  // props: {
  //   bid: {
  //     type: String,
  //     default: ""
  //   },
  //   article: {
  //     type: Object,
  //     default: {}
  //   },
  //   static: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  computed: {
    articleId() {
      return this.$route.query.id;
    }
    //   articleAll() {
    //     return this.$store.state.article.articleAll;
    //   }
    //   // singleArticle() {
    //   //   return this.$store.state.article.singleArticle;
    //   // }
  },
  watch: {
    articleId(data) {
      this.handleData();
    }
    //   article(data) {
    //     this.handleData(this.bid, data);
    //   },
    //   bid(bid) {
    //     //监听文章数据
    //     this.handleData(bid);
    //   },
    //   articleAll() {
    //     //监听文章数据
    //     this.handleData(this.bid);
    //   }
  },
  created() {
    // this.isStatic = this.static;

    this.handleData();

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
    handleData() {
      this.bid = this.$route.query.id;
      this.$axios
        .get(process.env.baseUrl + "/zll/article/list", {
          params: { id: this.bid }
        })
        .then(res => {
          if (res.data.result) {
            let articleData = res.data.data.article;
            articleData.publishTime = articleData.publishTime.slice(0, 10);
            this.articleData = articleData;
            this.prevArticle = res.data.data.prev;
            this.nextArticle = res.data.data.next;
            this.guessArticle = res.data.data.guess;
            this.wordObj = {
              id: this.bid,
              title: this.articleData.title
            };
          }
          // this.$store.commit("setShareData", res.data.list);
        })
        .catch(error => {
          console.log(error);
        });
      // if (this.isStatic) {
      //   article.middle.keywords = article.middle.keywords.replace("、", "，");
      //   article.middle.keywordsArr = article.middle.keywords.split("，");
      //   this.prevArticle = article.prev;
      //   this.articleData = article.middle;
      //   this.nextArticle = article.next;
      // } else {
      //   this.id = bid;
      //   var data = this.$store.state.article.articleAll;
      //   let length = data.length;
      //   if (length !== 0 && bid) {
      //     for (let index = 0; index < length; index++) {
      //       if (data[index].bid === bid) {
      //         this.prevArticle = index !== 0 ? data[index - 1] : false;
      //         this.articleData = data[index];
      //         //  console.log(this.articleData);
      //         // this.articleData.keywords = this.articleData.keywords.replace("、","，");
      //         this.articleData.keywordsArr = this.articleData.keywords;
      //         this.nextArticle = index !== length - 1 ? data[index + 1] : false;
      //         break;
      //       }
      //     }
      //   }
      // }
    },
    // 标签跳转
    handleLook(bid) {
      // 将bid存储到store中
      // this.$store.commit("setBid", bid);
      // if (!isStatic) {
      // this.$router.push({ path: "/detail/" + bid });
      // }
      // this.$store.dispatch("setSingleArtile", bid);

      this.$router.push({ path: "/detail", query: { id: bid } });
      // 返回顶部
      this.$goBack();
    },
    //跳转到详情页
    handleTo(name) {
      this.$store.commit("setTagValue", name);
      // 返回顶部
      this.$goBack();
      // this.$store.commit("setSearchValue", { name, url });
    },

    //点赞
    handleClickStar() {
      let data = {
        id: this.bid
      };
      this.$axios
        .post(process.env.baseUrl + "/zll/article/update/star",  Qs.stringify(data))
        .then(res => {
        console.log(res);
        
        })
        .catch(error => {
          console.log(error);
        });
    },

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
  color: #657487;
  line-height: 1.9;
  font-size: 15px;
  .warp {
    padding: 12px;
    margin-bottom: 12px;
  }
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
    font-size: 14px;
    padding: 5px 0px;
    display: flex;
    // margin-bottom: 15px;
    margin-right: 10px;
    margin-left: 10px;
    justify-content: center;
    li {
      padding: 0 20px;
      margin: 0px 5px;
      font-size: 13px;
      // color: #606060;
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
    p.tags {
      padding-left: 20px;
      margin-top: 15px;
      font-weight: 600;
      a {
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 3px;
        color: #fff;
        font-size: 13px;
      }
      a:hover {
        opacity: 1 !important;
        transform: scale(1.1);
      }
    }

    .explain {
      width: 95%;
      border-radius: 3px;
      line-height: 28px;
      padding: 15px 10px;
      background-color: #fffce7;
      border: 1px dashed #9acbe8;
      color: #ff4000;
      margin: 0 8px;
      a {
        color: #666;
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
        color: #666;
      }
      a:hover {
        color: #2196f3;
      }
    }
  }
}
</style>

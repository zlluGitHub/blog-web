<template>
  <div>
    <!-- 左半部分 -->
    <section>
      <div class="whitebg lanmu">
       <img src="../../assets/image/default.jpg" />
        <h1>{{type}}</h1>
        <p>记录在建站开发中用到的一些后端技术知识点，比如 NodeJs、Java、PHP 等后端开发语言。希望在这里重温的同时可以为需要的朋友提供一些参考。</p>
      </div>
         <ArticleList :type="type"/>
    </section>
    <!-- 右半部分 -->
   <AsideMain :configure="asideConfig" />
  </div>
</template>
<script>
import AsideMain from "../../components/AsideMain";
import ArticleList from "../../components/ArticleList";
// import TabsList from "../components/TabsList";
// import { goBack } from "../assets/js/gloable.js";
export default {
  name: "backstage",
  components: {
    AsideMain,
    ArticleList
    // TabsList
  },
  data: () => ({
    type: '后端基础',
     asideConfig: {
      isSay: true,   //每日一句
      // isInfo: true,   //名片
      isRecommend: true, //本站推荐
      isClick: true, //点击排行
      // isComment: true, //评论
      // isArticle:true, //最新文章
      isCount: true, //统计
      isTags: true //标签
    },
  }),
  computed: {
    // articleData() {
    //   return this.$store.state.article.article;
    // },
    // swiper() {
    //   return this.$refs.mySwiper.swiper;
    // },
    // getConfigsData() {
    //   return this.$store.state.scatter.configsData;
    // },
    // getImgData() {
    //   return this.$store.state.scatter.swiper;
    // }
  },
  // watch: {
  //   articleData(data) {
  //     this.data = data.list.slice(0, 10);
  //     this.total = data.nums;
  //     this.getAArticleData(data.list);
  //   },
  //   getConfigsData(value) {
  //     this.isBanner = value.isBanner;
  //   },
  //   getImgData(value) {
  //     this.filterImgData(value);
  //   }
  // },
  created() {
    this.$store.commit("setType", this.type);
  },

  methods: {
    // filterImgData(data) {
    //   let newArr = [];
    //   if (data) {
    //     for (let index = 0; index < data.length; index++) {
    //       if (data[index].isIssue === "yes") {
    //         newArr.push(data[index]);
    //       }
    //     }
    //     this.imgData = newArr;
    //   }
    // },
    // changePage(event) {
    //   this.pageNo = event;
    //   let pageData = this.$store.getters.getTypeArticle(
    //     this.pageNo,
    //     this.pageSize
    //   );
    //   this.data = pageData.list;
    //   this.total = pageData.total;
    //   goBack();
    // },
    // changeSizePage(event) {
    //   this.pageSize = event;
    //   let pageData = this.$store.getters.getTypeArticle(
    //     this.pageNo,
    //     this.pageSize
    //   );
    //   this.data = pageData.list;
    //   this.total = pageData.total;
    //   goBack();
    // },
    // //获取精选文章
    // getAArticleData(data) {
    //   if (data) {
    //     let dataArr = [];
    //     for (let index = 0; index < data.length; index++) {
    //       if (data[index].classify === "a") {
    //         dataArr.push(data[index]);
    //       }
    //     }
    //     this.AdataArr = dataArr.length != 0 ? dataArr : this.AdataArr;
    //   }
    // },
    // handleLookAll(bid, nav, url, title) {
    //   // 将bid存储到store中
    //   this.$store.dispatch("setRouter", { nav, url, title });
    //   this.$store.dispatch("setSingleArtile", bid);
    //   this.$router.push({
    //     path: "/article",
    //     query: {
    //       bid: bid
    //     }
    //   });
    // }
  }
};
</script>

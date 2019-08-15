<template>
  <div class="section-warp">
    <!-- 左半部分 -->
    <section>
      <div class="whitebg lanmu">
        <img src="http://www.vipshan.com/skin/images/lm07.png" />
        <h1>前端技术</h1>
        <p>深山SEO博客,分享网站建设周边知识,建站搭建常用软件工具下载。好玩的网站资源、实用的建站技巧分享。</p>
      </div>
      <ArticleList />
    </section>
    <!-- 右半部分 -->
     <AsideMain :configure="asideConfig" />
  </div>
</template>
<script>
import AsideMain from "../../components/AsideMain";
import ArticleList from "../../components/ArticleList";
export default {
  name: "contents",
  components: {
    AsideMain,
    ArticleList
  },
  data: () => ({
    type: '技术杂谈',
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
  }
};
</script>

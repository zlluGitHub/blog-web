<template>
  <div>
    <!-- 左半部分 -->
    <section>
      <div class="whitebg lanmu">
          <img src="../../assets/image/web.jpg"/>
        <h1>{{type}}</h1>
        <p>记录 pc端 和 移动端 开发周边技术栈。比如 html5、css3、JavaScript 以及目前比较火的 Vue、React 等框架。常用的 UI 框架及建站 CMS。另外总结了在使用 Echarts、D3、Three 等框架时所遇到的技术问题等。</p>
      </div>
      <ArticleList :type="type" :static="isStatic" />
    </section>
    <!-- 右半部分 -->
    <AsideMain :configure="asideConfig" :static="isStatic" />
  </div>
</template>
<script>
import AsideMain from "../../components/AsideMain";
import ArticleList from "../../components/ArticleList";
export default {
  name: "reception",
  components: {
    AsideMain,
    ArticleList
  },
  data: () => ({
    type: "前端技术",
    isStatic: false,
    asideConfig: {
      isSay: true, //每日一句
      // isInfo: true,   //名片
      isRecommend: true, //本站推荐
      isClick: true, //点击排行
      // isComment: true, //评论
      // isArticle:true, //最新文章
      isCount: true, //统计
      isTags: true //标签
    }
  }),
  async asyncData(context) {
    if (context.isStatic) {
      return await {
        isStatic: context.isStatic
      };
    }
  },
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

  methods: {}
};
</script>

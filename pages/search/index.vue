<template>
  <div>
    <!-- 左半部分 -->
    <section>
        <ArticleList :type="type" :mark="true" :static="isStatic"/>
    </section>
    <!-- 右半部分 -->
   <AsideMain :configure="asideConfig" :static="isStatic"/>
  </div>
</template>
<script>
import AsideMain from "../../components/AsideMain";
import ArticleList from "../../components/ArticleList";
// import TabsList from "../components/TabsList";
// import { goBack } from "../assets/js/gloable.js";
export default {
  name: "base",
  components: {
    AsideMain,
    ArticleList
    // TabsList
  },
  data: () => ({
    type: '数据库',
      isStatic:false,
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
    async asyncData(context) {
    if (context.isStatic) {
      return await {
        isStatic: context.isStatic,
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

  methods: {
  }
};
</script>

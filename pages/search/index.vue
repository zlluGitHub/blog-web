<template>
  <div>
    <!-- 左半部分 -->
    <section>
      <h3 class="h3-tag">
        <p>
          关于（
          <i>{{searchValue}}</i>） 关键词共检索到
          （
          <i>{{total}}</i>） 条记录
        </p>
      </h3>
      <ArticleList :content="contentData" />
    </section>
    <!-- 右半部分 -->
    <AsideMain :configure="asideConfig" :static="isStatic" />
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
    pageNo: 1,
    pageSize: 10,
    searchValue: "",
    total: 0,
    contentData: {},

    type: "数据库",
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
  // async asyncData(context) {
  //   if (context.isStatic) {
  //     return await {
  //       isStatic: context.isStatic
  //     };
  //   }
  // },
  computed: {
    search() {
      return this.$store.state.article.search;
    }
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
  watch: {
    // articleData(data) {
    //   this.data = data.list.slice(0, 10);
    //   this.total = data.nums;
    //   this.getAArticleData(data.list);
    // },
    search() {
      this.getData();
      // this.isBanner = value.isBanner;
    }
    // getImgData(value) {
    //   this.filterImgData(value);
    // }
  },
  created() {
    this.getData();
    // this.$store.commit("setType", this.type);
  },

  methods: {
    getData() {
      this.searchValue = this.$store.state.article.search;
      let data = {};
      if (this.pageNo !== 1 || this.pageSize !== 10) {
        data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };
      }
      data.title = this.searchValue;
      this.$axios
        .get(this.$url + "/zll/article/list", { params: data })
        .then(res => {
          if (res.data.result) {
            this.contentData = res.data;
            this.total = res.data.count;
          }
          // this.$store.commit("setShareData", res.data.list);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<template>
  <div>
    <!-- 左半部分 -->
    <section>
      <div class="whitebg lanmu">
        <img src="../../assets/image/web.jpg" />
        <h1>{{type}}</h1>
        <p>此网站模板栏目主要以分享各类网页模板，有个人网站、企业公司网站、商业网站、网站后台、以及一些网站开源程序的模板，帝国CMS，DEDECMS，WordPress等网站模板。</p>
      </div>
      <ArticleList
        :content="contentData"
        @on-change-page="changePage"
        @on-size-page="changeSizePage"
      />
    </section>
    <!-- 右半部分 -->
    <AsideMain :configure="asideConfig" :static="isStatic" />
  </div>
</template>
<script>
import AsideMain from "../../components/AsideMain";
import ArticleList from "../../components/ArticleList";
export default {
  name: "other",
  components: {
    AsideMain,
    ArticleList
  },
  data: () => ({
    pageNo: 1,
    pageSize: 10,
    contentData: {},
    type: "企业网站",

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
  created() {
    this.getArticle();
  },

  methods: {
    getArticle() {
      let data = {};
      if (this.pageNo !== 1 || this.pageSize !== 15) {
        data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };
      }
      data.type = this.type;
      this.$axios
        .get(this.$url + "/zll/article/list", { params: data })
        .then(res => {
          if (res.data.result) {
            this.contentData = res.data;
          }
          // this.$store.commit("setShareData", res.data.list);
        })
        .catch(error => {
          console.log(error);
        });
    },
    changePage(event) {
      this.pageNo = event;
      this.getArticle();
    },
    changeSizePage(event) {
      this.pageSize = event;
      this.getArticle();
    }
  }
};
</script>

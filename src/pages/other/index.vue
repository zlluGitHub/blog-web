<template>
  <div>
    <!-- 左半部分 -->
    <section>
      <div class="whitebg lanmu">
          <img src="../../assets/image/web.jpg"/>
        <h1>{{type}}</h1>
        <p>此专栏主要记录一些有关 Linux 操作系统、Git、NPM 等知识点。另外还包括一些其他的技术要点。</p>
      </div>
         <ArticleList :content="contentData" @on-change-page="changePage"
        @on-size-page="changeSizePage"/>
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
    contentData:{},
    type: "技术杂谈",
    
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
          } else {
            this.$Message["error"]({
              background: true,
              content: "数据加载失败！呜呜~"
            });
          }
          this.$event.emit("inLoading", false);
        	let time = window.setTimeout(() => {
							window.clearTimeout(time);
							this.$event.emit("pageLoading", false);
						}, this.$loadingTime);
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

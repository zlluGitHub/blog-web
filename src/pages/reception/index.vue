<template>
  <div>
    <!-- 左半部分 -->
    <section>
      <div class="whitebg lanmu">
        <!-- <img src="../../assets/image/web.jpg" /> -->
        <h1><Icon type="md-desktop" size="16"/>{{type}}</h1>
        <p>记录 pc端 和 移动端 开发周边技术栈。比如 html5、css3、JavaScript 以及目前在用 Vue、React、各种 UI 框架及建站 CMS。另外总结在开发过程中所遇到的技术问题等。</p>
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
  name: "reception",
  components: {
    AsideMain,
    ArticleList
  },
  data: () => ({
    pageNo: 1,
    pageSize: 10,
    contentData: {},
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
  // async asyncData(context) {
  //   if (context.isStatic) {
  //     return await {
  //       isStatic: context.isStatic
  //     };
  //   }
  // },
  // computed: {
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
  // },
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
    // this.$store.commit("setType", this.type);
  },
  // mounted() {
  // let data = null;
  // if (this.pageNo !== 1 || this.pageSize !== 15) {
  //   data = {
  //     pageNo: this.pageNo,
  //     pageSize: this.pageSize
  //   };
  // }
  // this.$axios
  //   .get(process.env.baseUrl + "/zll/say", { params: data })
  //   .then(res => {
  //     if (res.data.result) {
  //       this.sayList = res.data.list;
  //       this.total = res.data.count;
  //     }
  //     // this.$store.commit("setShareData", res.data.list);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // },
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

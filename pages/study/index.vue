<template>
  <div>
    <!-- 左半部分 -->
    <section>
      <div class="whitebg lanmu">
        <img src="../../assets/image/web.jpg" />
        <h1>{{type}}</h1>
        <p>本专栏中记录了自己在闲暇期间吸取的一些技术知识点，以及在开发过程中所遇到的技术问题，在此做下总结，以备不时之需。同时也希望可以帮到那些和我遇到同样问题的朋友！ ٩(๑&gt;◡&lt;๑)۶ 。</p>
      </div>
      <ArticleList
        :content="contentData"
        @on-change-page="changePage"
        @on-size-page="changeSizePage"
      />
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
  name: "study",
  components: {
    AsideMain,
    ArticleList
    // TabsList
  },
  data: () => ({
    contentData: [],

    type: "技术专栏",
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
    // this.$store.commit("setType", this.type);
    this.getArticle();
  },

  methods: {
    getArticle() {
      // let data = this.$store.getters.getTypeArticle(this.pageNo, this.pageSize);
      //请求文章数据
      let data = null;
      if (this.pageNo !== 1 || this.pageSize !== 10) {
        data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };
      }
      this.$axios
        .get(this.$url + "/zll/article/list", { params: data })
        .then(res => {
          if (res.data.result) {
            this.contentData = res.data;
          }
        });
      // this.dataList = data.list;
      // this.total = data.total;
    },
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
    changePage(event) {
      this.pageNo = event;
      this.getArticle();
    },
    changeSizePage(event) {
      this.pageSize = event;
      this.getArticle();
    }
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

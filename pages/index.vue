<template>
  <div>
    <!-- 左半部分 -->
    <section>
      <div class="swiper-warp">
        <!-- 轮播tab -->
        <div class="swiper-left">
          <Swiper />
        </div>
        <!-- 轮播右边小图 -->
        <div class="swiper-right">
          <div class="right-top">
            <div class="img-box">
              <img :src="URL+AdataArr[0].imgSrc" :alt="AdataArr[0].title" />
            </div>
            <span>{{AdataArr[0].title}}</span>
            <a
              @click="handleLookAll(AdataArr[0].bid,'','',AdataArr[0].title)"
              href="javascript:void(0);"
            ></a>
          </div>
          <div class="right-bottom">
            <div class="img-box">
              <img :src="URL+AdataArr[1].imgSrc" :alt="AdataArr[1].title" />
            </div>
            <span>{{AdataArr[1].title}}</span>
            <a
              @click="handleLookAll(AdataArr[1].bid,'','',AdataArr[1].title)"
              href="javascript:void(0);"
            ></a>
          </div>
        </div>
      </div>
      <!-- tab页文章 -->
      <TabsList :static="isStatic" />
      <!-- <div class="article_list">
        <h3>
          <i class="fa fa-list-ul"></i>
          <span>最新文章</span>
      </h3>-->
      <ArticleList :type="type" :static="isStatic" />
      <!-- <Page
          show-total
          @on-change="changePage"
          @on-page-size-change="changeSizePage"
          :total="total"
          show-sizer
      />-->
      <!-- </div> -->
      <!-- </div> -->

      <!-- 最新文章 -->
      <!-- <h3>
      <i class="fa fa-list-ul"></i>
      <span>最新文章</span>
    </h3>
      <ArticleList :dataList="data" />-->
      <!-- <div class="page">
        <Page
          show-total
          @on-change="changePage"
          @on-page-size-change="changeSizePage"
          :total="total"
          show-sizer
        />
      </div>-->
    </section>
    <!-- 右半部分 -->
    <AsideMain :configure="asideConfig" :static="isStatic" />
  </div>
</template>
<script>
import Swiper from "../components/Swiper";
import AsideMain from "../components/AsideMain";
import ArticleList from "../components/ArticleList";
import TabsList from "../components/TabsList";
// import { goBack } from "../assets/js/gloable.js";
export default {
  name: "warp",
  components: {
    Swiper,
    AsideMain,
    ArticleList,
    TabsList
  },
  data: () => ({
    asideConfig: {
      // isSay: true,   //每日一句
      isInfo: true, //名片
      isRecommend: true, //本站推荐
      isClick: true, //点击排行
      // isComment: true, //评论
      // isArticle:true, //最新文章
      isCount: true, //统计
      isTags: true //标签
    },
    isStatic: false,
    type: "最新文章",
    URL: "",
    value2: 0,
    dataList: [],
    pageNo: 0,
    pageSize: 10,
    total: 0,
    imgData: [],
    isBanner: "yes",
    AdataArr: [
      {
        imgSrc: "https://www.zhenglinglu.cn/zllublogAdmin/images/aside/qw12.jpg",
        title: "有所珍惜，才会有所真心。有所懂得，才会有所值得。"
      },
      {
        imgSrc:  "https://www.zhenglinglu.cn/zllublogAdmin/images/aside/qw23.jpg",
        title: "人生就像蒲公英，最终落到哪里都是个未知数。"
      }
    ] //精选数据
  }),
  async asyncData(context) {
    if (context.isStatic) {
      return await {
        isStatic: context.isStatic
      };
    }
  },
  computed: {
    articleData() {
      return this.$store.state.article.articleAll;
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
    articleData(data) {
      this.getArticle();
    }
    // getConfigsData(value) {
    //   this.isBanner = value.isBanner;
    // },
    // getImgData(value) {
    //   this.filterImgData(value);
    // }
  },
  created() {
    this.$store.commit("setType", "");
    // this.$store.dispatch("setChangingOver", {
    //   position: false
    // });
  },
  mounted() {
    // this.$axios
    //   .get(process.env.baseUrl + "/zllublogAdmin/article/get.article.php")
    //   .then(res => {
    //     console.log(res);
    //     this.dataList = res.data.list;
    //   });
  },
  methods: {
    getArticle() {
      let data = this.$store.getters.getTypeArticle(this.pageNo, this.pageSize);
      this.dataList = data.list;
      this.total = data.total;
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
      // goBack();
    },
    changeSizePage(event) {
      this.pageSize = event;
      this.getArticle();
      // goBack();
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
<style lang="scss" scoped>
.swiper-warp {
  display: flex;
  margin-bottom: 15px;
  .swiper-left,
  .swiper-right {
    padding: 6px;
    background-color: #fff;
    border-radius: 3px;
    .img-box {
      overflow: hidden;
      border-radius: 3px;
    }
  }

  .swiper-left {
    width: 65%;
    > div {
      height: 100%;
    }
  }
  .swiper-right {
    width: 34%;
    margin-left: 10px;
    img {
      display: block;
      width: 100%;
      height: 140px;
      transform: scale(1, 1);
      transition: transform 0.3s ease;
    }
    .right-bottom,
    .right-top {
      position: relative;
      a,
      span {
        top: 0;
        border-radius: 3px;
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 10px 30px;
        text-align: center;
        z-index: 50;
        font-size: 16px;
        color: #fff;
        /*flex 布局*/
        display: flex;
        /*实现垂直居中*/
        align-items: center;
        /*实现水平居中*/
        justify-content: center;
      }
      a {
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.3);
        opacity: 0.3;
        transition: background-color 0.3s ease;
      }
      a:hover {
        background-color: rgba(0, 0, 0, 0);
      }
    }

    .right-top {
      margin-bottom: 10px;
    }
    .right-top:hover img {
      transform: scale(1.1, 1.1);
    }
    .right-bottom:hover img {
      transform: scale(1.1, 1.1);
    }
  }
}
// .article_list {}
// img {
//   display: block;
//   width: 100%;
//   height: 290px;
//   border-radius: 3px;
// }
// .demo-box {
//   position: relative;
//   p {
//     position: absolute;
//     width: 100%;
//     padding: 10px;
//     background-color: rgba(0, 0, 0, 0.3);
//     left: 0;
//     font-size: 14px;
//     color: #fff;
//     bottom: 0;
//     z-index: 100;
//   }
// }
</style>

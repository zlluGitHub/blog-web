<template>
  <div>
    <!-- 左半部分 -->
    <section>
      <h3 class="h3-tag">
        <p>
          包含 <i>{{keywords}}</i> 标签共检索到
          <i>{{total}}</i> 条记录
        </p>
      </h3>
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
// import TabsList from "../components/TabsList";
// import { goBack } from "../assets/js/gloable.js";
export default {
  name: "tags",
  components: {
    AsideMain,
    ArticleList
    // TabsList
  },
  data: () => ({
    pageNo: 1,
    pageSize: 10,
    contentData: {},
    keywords: "",
    total: 0,

    type: "标签",
    isStatic: false, //判断是否是服务器端渲染
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
    tagValue() {
      return this.$store.state.article.tagValue;
    }
  },
  watch: {
    tagValue() {
      this.getData();
    }
  },
  created() {
    this.getData();
    // this.$store.commit("setType", this.type);
  },

  methods: {
    getData() {
      this.keywords = this.$store.state.article.tagValue;
      let data = {};
      if (this.pageNo !== 1 || this.pageSize !== 10) {
        data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };
      }
      data.keywords = this.keywords;
      this.$axios
        .get(this.$url + "/zll/article/list", { params: data })
        .then(res => {
          if (res.data.result) {
            this.contentData = res.data;
            this.total = res.data.count;
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
      this.getData();
      // goBack();
    },
    changeSizePage(event) {
      this.pageSize = event;
      this.getData();
      // goBack();
    }
  }
};
</script>
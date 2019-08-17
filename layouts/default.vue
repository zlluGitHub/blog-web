<template>
  <div>
    <!-- 头部 -->
    <Header />
    <div class="section-warp">
      <!-- 搜索框 -->
      <SearchInput/>
      <!-- 中间内容 -->
      <nuxt />
    </div>
    <!-- 尾部 -->
    <Footer />
    <!-- 加载动画 -->
    <Loading v-if="show" />
    <!-- 回到顶部 -->
    <BackTop/>
  </div>
</template>
<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Loading from "~/components/Loading";
import SearchInput from "~/components/SearchInput";
export default {
  name: "default",
  components: {
    Header,
    Footer,
    Loading,
    SearchInput
  },
  data: () => ({
    show: true
  }),
  created() {
    //请求文章数据
    this.$axios
      .get(process.env.baseUrl + "/adminblog/article/get.article.php")
      .then(res => {
        let data = res.data.list;
        data.forEach(ele => {
          ele.keywords = ele.keywords.split("、");
          ele.publishTime = ele.publishTime.slice(0, 10);
        });
        this.show = false;
        this.$store.commit("setArtileAll", data);
      });

    // 请求留言数据
    this.$axios
      .get(process.env.baseUrl + "/adminblog/comment/get.comment.php")
      .then(res => {
        let data = res.data.list;
        data.forEach(ele => {
          ele.time = ele.time.slice(0, 10);
        });
        // this.show = false;
        this.$store.commit("setCommentAll", data);
      });
  }
};
</script>


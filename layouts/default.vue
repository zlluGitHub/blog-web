<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
    <Loading v-if="show" />
  </div>
</template>
<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Loading from "~/components/Loading";
export default {
  name: "default",
  components: {
    Header,
    Footer,
    Loading
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
    // 请求微语数据
    this.$axios
      .get(process.env.baseUrl + "/adminblog/say/get.say.php")
      .then(res => {
        let data = res.data.list;
        data.forEach(ele => {
          ele.sendTime = ele.sendTime.slice(0, 10);
        });
        // this.show = false;
        this.$store.commit("setSayAll", data);
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


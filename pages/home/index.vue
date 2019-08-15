<template>
  <div>
    <h1>{{name}}</h1>
    <ul>
      <!-- <li v-for="item of dataList" :key="item.title">{{item.title}}</li> -->
    </ul>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data: () => ({
    name: "文章列表"
    // dataList:[]
  }),

  // //同步请求
  // async asyncData({ app }) {

  //   let dataA = await app.$axios
  //     .get("api/zllublogAdmin/article/get.article.php")
  //     .then(res => {
  //       return res.data.list;
  //     });
  //   console.log(dataA);
  //   console.log(dataB);

  //   let dataB = await app.$axios
  //     .get("api/zllublogAdmin/article/get.article.php")
  //     .then(res => {
  //       return res.data.list;
  //     });
  //   console.log(dataA);
  //   console.log(dataB);

  //   return { dataList: dataA };

  // },


  // //异步步请求
  // async asyncData({ app }) {
  //   let [dataA, dataB] = await Promise.all([
  //     app.$axios.get("api/zllublogAdmin/article/get.article.php"),
  //     app.$axios.get("api/zllublogAdmin/article/get.article.php")
  //   ]);
  //   console.log(dataA);
  //   console.log(dataB);
  //     return { dataList: dataA };
  // },

  //单个请求
  //  asyncData({ app }) {
  //    return app.$axios
  //     .get("api/zllublogAdmin/article/get.article.php")
  //     .then(res => {
  //       return { dataList: res.data.list };
  //     });
  // },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
      this.open(true);
    });
  },
  methods: {
    open(nodesc) {
      this.$Notice.open({
        title: "这是通知标题",
        desc: nodesc
          ? ""
          : "这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述"
      });
    }
  }
};
</script>

<style>
</style>

<template>
  <aside v-if="configure">
    <!-- 每日一语 -->
    <DaySay v-if="configure.isSay" :say="say" />

    <!-- 名片 -->
    <Info v-if="configure.isInfo" :info="info" />

    <!-- 最新文章 -->
    <NewArticle v-if="configure.isArticle" :static="isStatic" />

    <!-- 本站推荐 -->
    <TuiJian v-if="configure.isRecommend" :static="isStatic" />

    <!-- 点击排行 -->
    <dianji v-if="configure.isClick" :static="isStatic" />

    <!-- 标签 -->
    <Affix :offset-top="70">
      <Tag v-if="configure.isTags" />

      <!-- <RiLi v-if="configure.isDay"/> -->

      <!-- 评论 -->
      <!-- <PingLun v-if="configure.isComment" /> -->

      <!-- 统计 -->
      <!-- <TongJi style="margin-top: 15px;" v-if="configure.isCount" :statisty="statisty" /> -->
    </Affix>
    <!-- 友情链接 -->
    <!-- <YouQing v-if="configure.isYouQing" /> -->
  </aside>
  <aside v-else>
    <div class="tip-content box-bj-sd">暂无内容！</div>
  </aside>
</template>
<script>
import DaySay from "./aside/DaySay";
import Info from "./aside/Info";
// import PingLun from "./aside/PingLun";
// import RiLi from "./aside/RiLi";
// import TongJi from "./aside/TongJi";
import TuiJian from "./aside/TuiJian";
// import YouQing from "./aside/YouQing";
import Tag from "./aside/Tag";
import NewArticle from "./aside/NewArticle";
import dianji from "./aside/dianji";
export default {
  name: "asdie",
  components: {
    DaySay,
    Info,
    // PingLun,
    // YouQing,
    // TongJi,
    TuiJian,
    Tag,
    NewArticle,
    dianji
    // RiLi
  },
  data: () => ({
    say: null,
    info: null,
    statisty: null,
    isStatic: false
  }),
  props: ["configure", "static"],
  // watch: {
  //   static(data) {
  //     this.isStatic = data;
  //   }
  // },
  created() {
    let data = this.$store.state.comment.informData;
    if (data.visitCount) {
      this.say = { content: data.say };
      this.info = {
        arCount: data.articleCount,
        sayCount: data.sayCount,
        visitCount: data.visitCount
      };
      this.statisty = {
        time: data.listTime.slice(0, 10),
        linkCount: data.linkCount
      };
    } else {
      this.$axios.get(this.$url + "/zll/inform").then(res => {
        if (res.data.result) {
          data = res.data.data;
          this.$store.commit("setInformData", data);
          this.say = { content: data.say };
          this.info = {
            arCount: data.articleCount,
            sayCount: data.sayCount,
            visitCount: data.visitCount
          };
          this.statisty = {
            time: data.listTime.slice(0, 10),
            linkCount: data.linkCount
          };
        }
      });
    }
  }
};
</script>
<style lang="scss">
.tip-content {
  padding-top: 100px;
  text-align: center;
  height: 300px;
}
aside {
  > div {
    margin-bottom: 15px;
    > ul {
      padding: 10px 15px;
      padding-bottom: 20px;
    }
  }
}
</style>
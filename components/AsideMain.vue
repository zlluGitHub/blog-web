<template>
  <aside v-if="configure">
    <!-- 每日一语 -->
    <DaySay v-if="configure.isSay" />

    <!-- 名片 -->
    <Info v-if="configure.isInfo" />

    <!-- 最新文章 -->
    <NewArticle v-if="configure.isArticle" />

    <!-- 本站推荐 -->
    <TuiJian v-if="configure.isRecommend" />

    <!-- 点击排行 -->
    <dianji v-if="configure.isClick" />

    <!-- 标签 -->
    <Tag v-if="configure.isTags" />

    <!-- <RiLi v-if="configure.isDay"/> -->

    <!-- 评论 -->
    <PingLun v-if="configure.isComment" />

    <!-- 统计 -->
    <TongJi v-if="configure.isCount" />

    <!-- 友情链接 -->
    <YouQing v-if="configure.isYouQing" />
  </aside>
  <aside v-else>
    <div class="tip-content box-bj-sd">暂无内容！</div>
  </aside>
</template>
<script>
import DaySay from "./aside/DaySay";
import Info from "./aside/Info";
import PingLun from "./aside/PingLun";
// import RiLi from "./aside/RiLi";
import TongJi from "./aside/TongJi";
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
    PingLun,
    // YouQing,
    TongJi,
    TuiJian,
    Tag,
    NewArticle,
    dianji
    // RiLi
  },
  props: ["configure"]
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
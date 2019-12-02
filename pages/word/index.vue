<template>
  <div>
    <!-- 左半部分 -->
    <section class="box-bj-sd">
      <div class="word-title">
        <h1>留言板</h1>
        <p>客官来都来了，难道不想说点什么吗 φ(>ω&lt;*)</p>
      </div>
      <div class="massage public">
        <span>我要吐槽</span>
        <p class="email-span">
          <span>下述邮件地址不会被公开，只作为回复时的联系方式！</span>
        </p>
      </div>
      <Word :config="wordConfig"/>
    </section>
    <!-- 右半部分 -->
    <AsideMain :configure="asideConfig" :static="isStatic"/>
  </div>
</template>
<script>
import AsideMain from "../../components/AsideMain";
import Word from "../../components/Word";
// import TabsList from "../components/TabsList";
// import { goBack } from "../assets/js/gloable.js";
export default {
  name: "word",
  components: {
    AsideMain,
    Word
    // TabsList
  },
  data: () => ({
    type: "标签",
    isStatic: false,
    asideConfig: {
      isSay: true,   //每日一句
      // isInfo: true,   //名片
      // isRecommend: true, //本站推荐
      isClick: true, //点击排行
      // isComment: true, //评论
      isArticle: true, //最新文章
      isCount: true //统计
      // isTags: true //标签
    },
    wordConfig: {
      commentUrl: "comment/get.comment.content.php", //请求数据地址
      submitUrl: "comment/add.comment.php" //请求数据地址
    }
  }),
  // async asyncData(context) {
  //   if (context.isStatic) {
  //     return await {
  //       isStatic: context.isStatic
  //     };
  //   }
  // },
  created() {
    this.$store.commit("setType", this.type);
  },

  methods: {}
};
</script>
<style lang="scss" scoped>
.word-title {
  margin-top: 20px;
  margin-bottom: 40px;
  h1 {
    text-align: center;
  }
  p {
    text-align: center;
    padding: 20px;
    padding-top: 40px;
    border-bottom: 1px dashed #ccc;
  }
}
.massage {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  // margin-top: 40px;
  margin: 10px 20px;
  font-family: Georgia;
  border-bottom: 1px solid #eee;
  span {
    font-weight: bold;
    font-size: 16px;
  }
  p {
    span {
      color: #d32;
      font-size: 12px;
      padding-right: 2px;
    }
  }
}
// .public {
//   // margin-top: 30px;

// }
</style>
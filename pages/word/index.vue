<template>
  <div>
    <!-- 左半部分 -->
    <section>
        <Word />
    </section>
    <!-- 右半部分 -->
   <AsideMain :configure="asideConfig" />
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
    type: '标签',
      isStatic:false,
     asideConfig: {
      // isSay: true,   //每日一句
      // isInfo: true,   //名片
      // isRecommend: true, //本站推荐
      isClick: true, //点击排行
      // isComment: true, //评论
      isArticle:true, //最新文章
      isCount: true, //统计
      // isTags: true //标签
    },
  }),
    async asyncData(context) {
    if (context.isStatic) {
      return await {
        isStatic: context.isStatic,
      };
    }
  },
  created() {
    this.$store.commit("setType", this.type);
  },

  methods: {
  }
};
</script>

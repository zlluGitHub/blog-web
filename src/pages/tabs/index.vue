<template>
	<div>
		<!-- 左半部分 -->
		<section>
			<ArticleList :type="type" :tabs="true" :static="isStatic" />
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
			type: "标签",
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
		// computed: {
		//   tabName() {
		//     return this.$store.state.article.tabName;
		//   }
		// },
		// watch: {
		//   tabName(newVal) {
		//     this.type = newVal;
		//   }
		// },
		created() {
			this.type = this.$store.state.article.tabName;
			this.$event.emit("inLoading", false);
			let time = window.setTimeout(() => {
				window.clearTimeout(time);
				this.$event.emit("pageLoading", false);
			}, this.$loadingTime);
		}
	};
</script>

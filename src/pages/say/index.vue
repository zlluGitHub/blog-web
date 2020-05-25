<template>
	<div>
		<!-- 左半部分 -->
		<section>
			<Say />
		</section>
		<!-- 右半部分 -->
		<AsideMain :configure="asideConfig" />
	</div>
</template>
<script>
	import AsideMain from "../../components/AsideMain";
	import Say from "../../components/Say";
	export default {
		name: "say",
		components: {
			AsideMain,
			Say
		},
		data: () => ({
			isStatic: false,
			asideConfig: {
				isSay: true, //每日一句
				// isInfo: true,   //名片
				isRecommend: true, //本站推荐
				// isClick: true, //点击排行
				// isComment: true, //评论
				// isArticle:true, //最新文章
				isCount: true, //统计
				isTags: true //标签
			}
			// data: []
		}),
		// computed: {
		//   sayAll() {
		//     return this.$store.state.say.sayAll;
		//   }
		// },
		// watch: {
		//   sayAll(value) {
		//     this.data = value;
		//   }
		// },
		// async asyncData(context) {
		//   if (context.isStatic) {
		//     return await {
		//       isStatic: context.isStatic
		//     };
		//   }
		// },
		created() {
			this.$event.emit("inLoading", false);
			let time = window.setTimeout(() => {
				window.clearTimeout(time);
				this.$event.emit("pageLoading", false);
			}, this.$loadingTime);
		}
	};
</script>

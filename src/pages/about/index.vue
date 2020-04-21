<template>
	<div>
		<!-- 左半部分 -->
		<section>
			<About />
		</section>
		<!-- 右半部分 -->
		<AsideMain :configure="asideConfig" :static="isStatic" />
	</div>
</template>
<script>
	import AsideMain from "../../components/AsideMain";
	import About from "../../components/About";
	export default {
		name: "About-1",
		components: {
			AsideMain,
			About
		},
		data: () => ({
			asideConfig: {
				isSay: true, //每日一句
				// isInfo: true,   //名片
				// isRecommend: true, //本站推荐
				// isClick: true, //点击排行
				// isComment: true, //评论
				// isArticle:true, //最新文章
				isCount: true, //统计
				isTags: true //标签
			},
			data: [],
			isStatic: false
		}),
		// async asyncData(context) {
		//   if (context.isStatic) {
		//     return await {
		//       isStatic: context.isStatic
		//     };
		//   }
		// },
		created() {
			// 请求微语数据
			// if (this.$store.state.say.sayAll.length === 0) {
			//   this.$axios
			//     .get(process.env.baseUrl + "/zllublogAdmin/say/get.say.php")
			//     .then(res => {
			//       let data = res.data.list;
			//       data.forEach(ele => {
			//         ele.sendTime = ele.sendTime.slice(0, 10);
			//       });
			//       this.data = data;
			//       this.$store.commit("setSayAll", data);
			//     });
			// } else {
			//   this.data = this.$store.state.say.sayAll;
			// }
		},
		mounted() {
			// this.$store.commit("setLoading", false);
				this.$event.emit("inLoading", false);
			let time = window.setTimeout(() => {
				window.clearTimeout(time);
				this.$event.emit("pageLoading", false);
			}, this.$loadingTime);
		}
	};
</script>

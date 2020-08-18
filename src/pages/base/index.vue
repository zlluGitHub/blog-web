<template>
	<div>
		<!-- 左半部分 -->
		<section>
			<div class="whitebg lanmu">
				<!-- <img src="../../assets/image/web.jpg" /> -->
				<h1><Icon type="md-desktop" size="16"/>{{type}}</h1>
				<p>此专栏主要记录一些关于数据库的一些相关内容。比如 MySQL 数据库、mongoDB 数据库等。</p>
			</div>
			<ArticleList :content="contentData" @on-change-page="changePage" @on-size-page="changeSizePage" />
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
		name: "base",
		components: {
			AsideMain,
			ArticleList
			// TabsList
		},
		data: () => ({
			pageNo: 1,
			pageSize: 10,
			contentData: {},
			type: "数据库",

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
		created() {
			this.getArticle();
		},

		methods: {
			getArticle() {
				let data = {};
				if (this.pageNo !== 1 || this.pageSize !== 15) {
					data = {
						pageNo: this.pageNo,
						pageSize: this.pageSize
					};
				}
				data.type = this.type;
				this.$axios
					.get(this.$url + "/zll/article/list", { params: data })
					.then(res => {
						if (res.data.result) {
							this.contentData = res.data;
						} else {
							this.$Message["error"]({
								background: true,
								content: "数据加载失败！呜呜~"
							});
						}
						this.$event.emit("inLoading", false);
						// this.$store.commit("setLoading", false);
						let time = window.setTimeout(() => {
							window.clearTimeout(time);
							this.$event.emit("pageLoading", false);
						}, this.$loadingTime);
						// this.$store.commit("setShareData", res.data.list);
					})
					.catch(error => {
						console.log(error);
					});
			},
			changePage(event) {
				this.pageNo = event;
				this.getArticle();
			},
			changeSizePage(event) {
				this.pageSize = event;
				this.getArticle();
			}
		}
	};
</script>

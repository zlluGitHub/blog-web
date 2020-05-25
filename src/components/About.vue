<template>
	<div class="about-warp box-bj-sd">
		<div class="about-top">
			<img src="../assets/image/touxiang0.jpg" alt="头像" />
			<div class="top-right">
				<h3>lu@Blog</h3>
				<p>一切伟大的行动和思想，都有一个微不足道的开始。</p>
			</div>
		</div>
		<div class="introduce">
			<div class="int-top">
				<h4>博主简介</h4>
				<p>博主网名：露珠博客</p>
				<p>
					博客网址：
					<a href="http://zhenglinglu.cn" target="_blank">http://zhenglinglu.cn</a>
				</p>
				<p>
					GitHub：
					<a href="https://github.com/zlluGitHub" target="_blank">https://github.com/zlluGitHub</a>
				</p>
				<p>博主邮箱：1182567968@qq.com</p>
				<!-- <p>个人独白：博主与很多95后IT同龄人一样，喜欢研究、瞎折腾，在很早之前就非常崇拜那些从事网站开发的大牛们（虽然当时不懂），为此从那时起开始就接触网站开发这一块，随着学习的不断深入令自己没有想到的是水竟然这么深，从事这方面应该都懂得吧，哈哈... ，现在自己也是在一步步的追随着目前各种新的技术，GET各种新的技能来提升自身能力。由于本站是博主第一个上线版的个人学习记录网站，作为初学者还有很多不足之处还望各位多多指点 ヾ(@^▽^@)ノ。</p> -->
			</div>
			<div class="wx">
				<img src="../assets/image/wx.jpg" />
				<div>欢迎叨扰(*^▽^*)</div>
			</div>
			<div class="int-jieshao">
				<h4>本站简介</h4>
				<!-- <p>建站时间：2018年7月29日 --- 至今</p> -->
				<p>服务器：腾讯云服务器</p>
				<p>备案号：冀ICP备18004100号</p>
				<p>技术栈：Vue全家桶 + Iview + NodeJs + Nginx + Express + Mongodb</p>
				<p>本站宗旨：记录点滴的同时把最实用的经验分享给最需要的读者，希望每一位来访的朋友都能有所收获！</p>
			</div>
			<div class="int-top">
				<h4>关于版权</h4>
				<p>
					<span>★</span>本站所有原创文章均由博主发表，如需转载敬请将相关内容链接作为出处标注，谢谢合作！
				</p>
				<p>
					<span>★</span>若发现本站有任何侵犯您的利益与版权隐私相关的内容，请联系博主，博主将会在第一时间内删除相关内容。
				</p>
			</div>
		</div>
	</div>
</template>
<script>
	// import { URL } from "../constant/constant.js";
	// import Qs from "qs";
	export default {
		name: "about",
		data: () => ({
			aboutMe: []
		}),
		created() {
			// this.$store.dispatch("setChangingOver", { notice: false, position: true });
		},

		methods: {
			getAboutMeData() {
				let _this = this;
				// this.axios
				//   .get(URL + "aboutMe/get.aboutMe.php")
				//   .then(function(res) {
				//     if (res.data) {
				//       _this.aboutMe = res.data.list;
				//       _this.$store.dispatch("setAboutData", res.data.list);
				//     }
				//   })
				//   .catch(function(error) {
				//     console.log(error);
				//   });
			}
		}
	};
</script>

<style lang="scss" scoped>
	.about-warp {
		background-color: #fff;
		padding: 40px;

		border-radius: 3px;
		p {
			color: #666;
		}
		.about-top {
			display: flex;
			padding-bottom: 20px;
			position: relative;
			img {
				width: 120px;
				height: 120px;
				border-radius: 100px;
				border: 2px solid #bbbbbb;
				box-shadow: 0 0 12px 1px #ccc;
			}

			.top-right {
				margin-left: 20px;
				line-height: 26px;
				padding-top: 20px;
				h3 {
					font-size: 24px;
					padding: 10px 0px;
				}
			}
		}
		.about-top::after {
			content: "";
			position: absolute;
			background: url("../assets/image/v.png") no-repeat;
			background-size: 20px;
			width: 20px;
			height: 20px;
			left: 95px;
			bottom: 32px;
		}
		.introduce {
			padding-bottom: 45px;
			position: relative;
			h4 {
				font-size: 20px;
				padding: 6px 0px;
				margin-top: 20px;
				border-bottom: 1px solid #ccc;
				background: url("../assets/image/hline.png") 80px 12px no-repeat;
				background-size: 32px;
				margin-bottom: 15px;
			}
			.int-top {
				p {
					margin-top: 10px;
					line-height: 24px;
					text-indent: 2em;
				}
			}
			.int-jieshao {
				p {
					text-indent: 2em;
					padding: 5px 0;
				}
			}
		}
	}
	.wx {
		position: absolute;
		right: 0;
		top: 52px;
		display: flex;
		flex-direction: column;
		align-items: center;
		img {
			width: 150px;
			display: block;
			height: 150px;
		}
	}
</style>

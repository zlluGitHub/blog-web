<template>
  <div class="box-bj-sd">
    <h3 class="h3-style">
      <i class="fa fa-line-chart"></i>点击排行
    </h3>
    <ul class="dianji-list" v-if="titleData.length">
      <li v-for="item in titleData" :key="item.bid">
        <img :src="$url+'/'+item.imgSrc" :alt="item.title" />
        <router-link
          :to="{ path: '/detail', query: { id: item.bid}}"
          @click.native="handleLook(item.bid)"
        >{{item.title}}</router-link>
        <!-- <a
          @click="handleLook(item.bid,isStatic,item.title)"
          :href="isStatic?URL+item.bid:'javascript:void(0);'"
        >{{item.title}}</a>-->
      </li>
    </ul>
    <div v-else style="padding:100px 0;text-align: center;">暂无内容！</div>
  </div>
</template>
<script>
// import { URL } from "../../constant/constant.js";
export default {
  name: "dianji",
  data: () => ({
    URL: process.env.baseUrl + "/detail/",
    imgUrl: process.env.baseUrl + "/zllublogAdmin/",
    titleData: [],
    isStatic: false
  }),
  // props: {
  //   static: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  // computed: {
  //   articleAll() {
  //     return this.$store.state.article.articleAll;
  //   }
  // },
  // watch: {
  //   articleAll() {
  //     this.handleData();
  //   },
  //   static(data) {
  //     this.isStatic = data;
  //   }
  // },

  created() {
    // this.isStatic = this.static;
    this.handleData();
  },

  methods: {
    handleData() {
      let data = this.$store.state.comment.dianjiData;
      if (data.length === 0) {
        this.$axios.get(this.$url + "/zll/article/point").then(res => {
          if (res.data.result) {
            this.$store.commit("setDianjiData", res.data.list);
            this.titleData = res.data.list;
          }
        });
      } else {
        this.titleData = data;
      }
      // var data = [...this.$store.state.article.articleAll];
      // // viweNum
      // let arr = [];
      // if (data.length !== 0) {
      //   //   this.titleData = data
      //   //     .filter(params => {
      //   //       return params.classify === "b";
      //   //     })
      //   //     .slice(0, 10);
      //   arr = data.sort((a, b) => {
      //     return b.viweNum * 1 - a.viweNum * 1;
      //   });
      //   this.titleData = arr.slice(0, 8);
      // }
      // // this.titleData = data;
    },
    //跳转到详情页
    handleLook(bid) {
      // 将bid存储到store中
      // this.$store.commit("setBid", bid);
      // this.$router.push({ path: "/detail/" + bid });
      // 返回顶部
      this.$goBack();
    }
  }
};
</script>
<style lang="scss" scoped>
.dianji-list li {
  display: flex;
  padding: 10px 0px;
  color: #525252;
  border-bottom: 1px dashed #e6e6e6;
  transition: all 0.25s ease-in;
}

.dianji-list li:hover {
  background-color: #eee;
}

/* .dianji-list li:hover img {
  transform: scale(1.1);
} */

.dianji-list li a {
  display: inline-block;
  width: 211px;
  color: #525252;
  transition: all 0.3s ease;
  padding-right: 5px;
}
.dianji-list li a:hover {
  transform: scale(1.05);
  color: #337ab7;
}

.dianji-list li img {
  display: block;
  margin-right: 15px;
  width: 70px;
  height: 40px;
  padding: 2px;
  border: 1px solid #f3f3f3;
  transition: all 0.3s ease;
}
</style>
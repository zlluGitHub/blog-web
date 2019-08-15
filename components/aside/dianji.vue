<template>
  <div class="box-bj-sd">
    <h3>
      <i class="fa fa-line-chart"></i>点击排行
    </h3>
    <ul class="dianji-list">
      <li v-for="item in titleData" @click="handleLookAll(item.bid)" :key="item.title">
        <img :src="URL+item.imgSrc" :alt="item.title" />
        <a :title="item.title" href="javascript:void(0);">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
// import { URL } from "../../constant/constant.js";
export default {
  name: "tuijian",
  data: () => ({
    URL: "",
    titleData: []
  }),
  computed: {
    articleAll() {
      return this.$store.state.article.articleAll;
    }
  },
  watch: {
    articleAll() {
      this.handleData();
    }
  },

  created() {
    this.handleData();
  },

  methods: {
    handleData() {
      var data = [...this.$store.state.article.articleAll];
      // viweNum
      let arr = [];
      if (data.length !== 0) {
        //   this.titleData = data
        //     .filter(params => {
        //       return params.classify === "b";
        //     })
        //     .slice(0, 10);
        arr = data.sort((a, b) => {
          return b.viweNum * 1 - a.viweNum * 1;
        });
        this.titleData = arr.slice(0, 8);
      }
      // // this.titleData = data;
    },
    handleLookAll(bid) {
      // 将bid存储到store中
      this.$store.dispatch("setSingleArtile", bid);
      this.$router.push({
        path: "/article",
        query: {
          bid: bid
        }
      });
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
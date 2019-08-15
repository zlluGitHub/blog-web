<template>
  <div class="box-bj-sd">
    <h3>
      <i class="fa fa-map-signs"></i>本站推荐
    </h3>
    <ul class="article-list">
      <li v-for="item in titleData" @click="handleLook(item.bid)" :key="item.title">
        <a :title="item.title" href="javascript:void(0);">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "tuijian",
  data: () => ({
    titleData: []
  }),
  // computed: {
  //   getTuiJianAsideArticle() {
  //     return this.$store.getters.getTuiJianAsideArticle;
  //   }
  // },
  // watch: {
  //   getTuiJianAsideArticle(value) {
  //     this.titleData = value.slice(0, 10);
  //   }
  // },
  // mounted() {
  //   if (this.$store.getters.getTuiJianAsideArticle) {
  //     this.titleData = this.$store.getters.getTuiJianAsideArticle.slice(0, 10);
  //   }
  // },
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
      var data = this.$store.state.article.articleAll;
      if (data.length !== 0) {
        this.titleData = data
          .filter(params => {
            return params.classify === "b";
          })
          .slice(0,8);
      }
      // this.titleData = data;
      // console.log(this.titleData);
    }
  }
};
</script>
<style lang="scss" scoped>

.article-list li {
  display: block;
  padding-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 36px;
  transform: translate(0, 0);
  border-bottom: 1px solid #eee;
  transition: all 0.25s ease-in;
}

.article-list li:hover {
  transform: translate(4px, 0);
  background-color: #eee;
}

.article-list a {
  color: #525252;
}

.article-list li a {
  display: block;
  margin-right: 10px;
  position: relative;
  padding-left: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.article-list li a:hover {
  color: #337ab7;
}

.article-list li a::before {
  position: absolute;
  left: 0;
  top: 12px;
  font-size: 9px;
  color: #fff;
  line-height: 16px;
  width: 16px;
  text-align: center;
}

.article-list li:nth-child(1) a::before {
  background-color: red;
  content: "1";
}

.article-list li:nth-child(2) a::before {
  background-color: #ff983d;
  content: "2";
}

.article-list li:nth-child(3) a::before {
  background-color: #ffdf8b;
  content: "3";
}

.article-list li:nth-child(4) a::before {
  background-color: #ccc;
  content: "4";
}

.article-list li:nth-child(5) a::before {
  background-color: #ccc;
  content: "5";
}

.article-list li:nth-child(6) a::before {
  background-color: #ccc;
  content: "6";
}

.article-list li:nth-child(7) a::before {
  background-color: #ccc;
  content: "7";
}

.article-list li:nth-child(8) a::before {
  background-color: #ccc;
  content: "8";
}

.article-list li:nth-child(9) a::before {
  background-color: #ccc;
  content: "9";
}

.article-list li:nth-child(10) a::before {
  background-color: #ccc;
  content: "10";
}
</style>
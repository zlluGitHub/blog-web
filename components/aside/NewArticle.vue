<template>
  <div class="box-bj-sd">
    <h3>
      <i class="fa fa-th-list"></i>最新文章
    </h3>
    <ul class="article-list-new">
      <li v-for="item in titleData" @click="handleLookAll(item.bid)" :key="item.title">
        <i class="fa fa-angle-double-right fa-lg"></i>
        <a :title="item.title" href="javascript:void(0);">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "rtuijian",
  data: () => ({
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
      let arr = [];
      if (data.length !== 0) {
        arr = data.reverse();
        this.titleData = arr.slice(0, 8);
      }
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

.article-list-new li {
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-bottom: 1px dashed #ccc;
  transition: all .2s ease;
}

.article-list-new li a {
  line-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #525252;
}

.article-list-new li i {
  margin-right: 10px;
}

.article-list-new li:hover {
  background: #f2f2f2;
  box-shadow: 0 0 10px #ccc;
  color: #337ab7;
}

.article-list-new li:hover a {
  line-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #337ab7;
}
</style>
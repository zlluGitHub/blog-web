<template>
  <div class="box-bj-sd">
    <h3 class="h3-style">
      <i class="fa fa-th-list"></i>最新文章
    </h3>
    <ul class="article-list-new">
      <li v-for="item in titleData" :key="item.bid+'21'">
        <i class="fa fa-angle-double-right fa-lg"></i>
        <!-- <a
          @click="handleLook(item.bid,isStatic,item.title)"
          :href="isStatic?URL+item.bid:'javascript:void(0);'"
        >{{item.title}}</a> -->
         <router-link
          :to="{ path: '/detail', query: { id: item.bid}}"
          @click.native ="handleLook(item.bid)"
        >{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "rtuijian",
  data: () => ({
    // URL: this.$url + "/detail/",
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
      this.$axios
        .get(this.$url + "/zll/article/list")
        .then(res => {
          if (res.data.result) {
            this.titleData = res.data.list;
          }
          // data.forEach(ele => {
          //   ele.keywords = ele.keywords.split("、");
          //   ele.publishTime = ele.publishTime.slice(0, 10);
          // });
          // this.show = false;
          // this.$store.commit("setArtileAll", data);
        });
      // var data = [...this.$store.state.article.articleAll];
      // let arr = [];
      // if (data.length !== 0) {
      //   arr = data.reverse();
      //   this.titleData = arr.slice(0, 8);
      // }
    },
    //跳转到详情页
    handleLook(bid) {
      console.log(bid);
      
         // 返回顶部
      this.$goBack();
      // 将bid存储到store中
      // this.$store.commit("setBid", bid);
      // if (!isStatic) {
      //   this.$router.push({ path: "/detail/" + bid });
      // }
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
  transition: all 0.2s ease;
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
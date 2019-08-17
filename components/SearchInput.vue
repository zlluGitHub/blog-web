<template>
  <div v-if="isSearchShow" class="search box-bj-sd">
    <Input search @on-search="queryDate" enter-button placeholder="请输入关键词，全站搜索..." />
    <Icon type="md-close" @click.stop="searchShow" />
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data: () => ({
    isSearchShow: false
  }),

  computed: {
    searchIsShow() {
      return this.$store.state.article.isSearchShow;
    }
  },
  watch: {
    searchIsShow(val) {
      this.isSearchShow = val;
    }
  },
  methods: {
    queryDate(name) {
      this.$store.commit("setSearchValue", {name,url:'/search'});
      this.$router.push({ path: "/search" });
    },
    searchShow() {
      this.isSearchShow = false;
      this.$store.commit("setSearchShow", this.isSearchShow);
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 15px;
  padding: 20px;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  > div {
    width: 50%;
  }
  i {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 20px;
    border-radius: 100px;
    background-color: #ccc;
    color: #fff;
    cursor: pointer;
  }
  i:hover {
    background-color: red;
  }
}
</style>

<template>
  <div class="box-bj-sd">
    <h3>
      <i class="fa fa-tags"></i>热门标签
    </h3>
    <ul class="tag">
      <li v-for="item in tagsData" :key="item.name">
        <a
          :style="'background-color:'+ getRandomColor()+';opacity: 0.8;'"
          href="javascript:void(0);"
          @click="handleTo(item.name,'/type')"
        >{{item.name}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
// import { goBack } from "../../assets/gloable.js";
export default {
  name: "asdide",
  data: () => ({
    tagsData: []
  }),
  computed: {
    geTagsDatas() {
      return this.$store.getters.geTagsData;
    }
  },
  watch: {
    geTagsDatas(value) {
      this.tagsData = value;
    }
  },
  mounted() {
    this.tagsData = this.$store.getters.geTagsData;
  },
  methods: {
    // 获取随机颜色
    getRandomColor() {
      return (
        "#" +
        ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(
          -6
        )
      );
    },
    handleTo(nav, url, title) {
      let pageData = this.$store.getters.getTagsData(nav);
      this.$store.dispatch("setArticleTypeData", pageData);
      this.$store.dispatch("setRouter", { nav, url, title });
      this.$router.push({ path: url });
      this.$store.dispatch("setChangingOver", {
        notice: false,
        position: true
      });
      // goBack();
    }
  }
};
</script>
<style lang="scss" scoped>
.tag {
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
}

.tag li {
  margin-right: 8px;
  margin-bottom: 8px;
}

.tag li a {
  display: flex;
  padding: 4px 10px;
  border-radius: 5px;
  color: #fff;
  background-color: #ccc;
  transition: all 0.3s ease;
}

.tag li a:hover {
  opacity: 1 !important;
  transform: scale(1.1);
}
</style>

<template>
  <div class="box-bj-sd">
    <h3>
      <i class="fa fa-link"></i>友情链接
    </h3>
    <ul>
      <li>
        <a href="http://www.zhenglinglu.cn" target="_blank">☆冰蓝の心☆-个人博</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "asdie",
  data:()=>({
    total:null
  }),
  created() {
    this.total = this.$store.state.article.article.list.length;
  }
};
</script>

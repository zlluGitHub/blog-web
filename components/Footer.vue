<template>
  <div class="footer">
    <footer>
      <p>CopyRight © 2018-{{year}} <a href="https://zhenglinglu.cn">luBlogの博客</a> 版权所有。<br>备案号：冀ICP备18004100号</p>
    </footer>
    <BackTop></BackTop>
  </div>
</template>
<script>
export default {
  name: "footers",
  data:()=>({
    year:''
  }),
  mounted(){
    let myDate = new Date();
   this.year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
  }
};
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 30px;
  border-top: #00c1de 5px solid;
  background-color: #23282d;
  color: #999;
  footer {
    width: 1200px;
    margin: 0 auto;
    p {
      text-align: center;
      padding: 30px 0;
      font-size: 14px;
    }
  }
}
</style>

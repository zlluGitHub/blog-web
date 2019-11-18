<template>
  <div class="box-bj-sd">
    <a class="denglu" href="javascript:void(0);">
      <img
        class="card_img"
        height="100px"
        width="100px"
        src="../../assets/image/touxiang0.jpg"
        alt="头像"
      />
      <h2>Crazy@Rookie</h2>
    </a>
    <p>
      网名：
      <span>菜鸟也疯狂</span>
    </p>
    <p>
      现居：
      <span>北京-海淀区</span>
    </p>
    <p>
      职业：
      <span>Web前端开发</span>
    </p>
    <p>
      Email：
      <span>1182567968@qq.com</span>
    </p>
    <div class="author_footer">
      <ul>
        <li>
          <strong class="shujv">{{ArticleNum}}</strong>
          <span>文章</span>
        </li>
        <li>
          <!-- <strong class="shujv">{{ViweNum}}</strong> -->
          <strong class="shujv">5206</strong>
          <span></span>访客
        </li>
        <li>
          <strong class="shujv">{{SayNum}}</strong>
          <span>微语</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "info",
  data: () => ({
    content: null,
    ViweNum: 0,
    ArticleNum: 0,
    SayNum: 0
  }),
  props: ["info"],
  computed: {
    // articleAll() {
    //   return this.$store.state.article.articleAll;
    // },
    // sayAll() {
    //   return this.$store.state.say.sayAll;
    // }
  },
  watch: {
    info(val) {
      this.content = val;
      this.handleData();
    }
    // sayAll() {
    //   this.handleData();
    // }
  },

  created() {
    this.content = this.info;
    this.handleData();
  },

  methods: {
    handleData() {
      if (this.content) {
        this.ArticleNum = this.content.arCount;
        this.SayNum = this.content.sayCount;
      }
      // var data = this.$store.state.article.articleAll;
      // if (data.length !== 0) {
      //   //文章总数
      //   this.ArticleNum = data.length;
      //   // 阅读总数
      //   let count = 0,
      //     index = 0;
      //   for (index; index < data.length; index++) {
      //     count = count + data[index].viweNum * 1;
      //   }
      //   this.ViweNum = count;
      // };
      // var data = this.$store.state.say.sayAll;
      // if (data) {
      //   this.SayNum = data.length;
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
a::after {
  content: "";
  position: absolute;
  background: url("../../assets/image/v.png") no-repeat;
  background-size: 12px;
  width: 12px;
  height: 12px;
  left: 60px;
  bottom: 20px;
  opacity: 0.8;
}
a {
  display: flex;
  padding: 12px;
  margin-bottom: 10px;
  color: #666;
  position: relative;
  img {
    width: 60px;
    height: 60px;
    border-radius: 100px;
    border: 2px solid #ccc;
    box-shadow: 0 0 12px 1px #ccc;
    margin-right: 15px;
  }
  h2 {
    font-family: Georgia;
    font-size: 15px;
    margin-top: 30px;
  }
}
p {
  padding: 5px 0 0 20px;
  line-height: 28px;
}
.author_footer {
  margin-top: 23px;
  border-top: 1px solid #e5e5e5;
  ul {
    display: flex;
    justify-content: space-around;
    margin: 0 25px;
    li {
      width: 30%;
      padding: 15px 0;
      font-size: 14px;
      text-align: center;
      color: #888;
      .shujv {
        font-family: Georgia;
        font-weight: 600;
        font-size: 15px;
        color: #222;
      }
    }
  }
}
</style>
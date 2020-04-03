<template>
  <div class="box-bj-sd">
    <router-link to="/about" class="denglu">
      <img class="card_img" src="../../assets/image/touxiang0.jpg" alt="头像" />
      <h2>lu@Blog</h2>
    </router-link>
    <p>
      网名：
      <span>月光下的露珠</span>
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
          <strong class="shujv">{{ViweNum}}</strong>访客
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
        this.ViweNum = this.content.visitCount;
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

// a::after {
//   content: "";
//   position: absolute;
//   background: url("../../assets/image/v.png") no-repeat;
//   background-size: 12px;
//   width: 12px;
//   height: 12px;
//   left: 60px;
//   bottom: 20px;
//   opacity: 0.8;
// }
a {
  display: flex;
  padding: 12px;
  margin-bottom: 10px;
  color: #666;
  position: relative;
  img {
    height: 70px;
    width: 70px;
    border-radius: 100px;
    border: 2px solid #ccc;
    box-shadow: 0 0 12px 1px #ccc;
    margin-right: 15px;
  }
  h2 {
    font-family: Georgia;
    font-size: 18px;
    margin-top: 40px;
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
        margin-right: 3px;
        font-family: Georgia;
        font-weight: 600;
        font-size: 15px;
        color: #666;
      }
    }
  }
}
.denglu {
  img {
    transition: all 1s ease;
  }
  img:hover {
    transform: rotate(360deg);
  }
}
</style>
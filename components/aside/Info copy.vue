<template>
  <div class="box statistics">
    <a class="denglu" @click="handleRender" href="javascript:void(0);">
      <img
        class="card_img"
        height="100px"
        width="100px"
        src="../../assets/image/touxiang0.jpg"
        alt="头像"
      />
      <span>Login</span>
    </a>
    <div class="visiting_card_text">
      <h4>LING☆璐の博客</h4>
      <div class="author_other author">
        <span>
          <a @click="handleTo('关于我','/about','')" href="javascript:void(0);">
            <i class="fa fa-qq fa-lg"></i>博主
          </a>
        </span>
        <span>
          <a @click="handleTo('留言板','/word','')" href="javascript:void(0);">
            <i class="fa fa-comments fa-lg"></i>留言
          </a>
        </span>
      </div>
      <div class="author_footer">
        <ul>
          <li>
            <strong class="shujv">{{ArticleNum}}</strong>
            <span>文章</span>
          </li>
          <li>
            <strong class="shujv">{{ViweNum}}</strong>
            <span></span>预览
          </li>
          <li>
            <strong class="shujv">{{SayNum}}</strong>
            <span>微语</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   name: "asdide",
  computed: {
    ViweNum() {
      return this.$store.getters.getArticleAllViweNum();
    },
    ArticleNum() {
      return this.$store.state.article.article.nums;
    },
    SayNum() {
      return this.$store.getters.getSaySum();
    }
  },

  methods: {
    handleRender() {
      this.$store.dispatch("setLogin", {
        login: true
      });
    },
    handleTo(nav, url, title) {
      this.$store.dispatch("setRouter", { nav, url, title });
      this.$router.push({ path: url });
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .denglu::after {
    content: "";
    position: absolute;
    background: url('../../assets/image/v.png') no-repeat;
    background-size: 16px;
    width: 16px;
    height: 16px;
    right: 0;
    bottom: 15px;
  }
  .denglu {
    position: relative;
    width: 100px;
    .card_img {
      transition: opacity 0.2s ease-in, box-shadow 0.2s ease-in;
      margin-top: 32px;
      border-radius: 100px;
      box-shadow: 0px 0px 1.5px 1.5px #cccccc;
    }
    span {
      line-height: 105px;
      /*设置line-height与父级元素的height相等*/
      text-align: center;
      /*设置文本水平居中*/
      overflow: hidden;
      /*防止内容超出容器或者产生自动换行*/
      position: absolute;
      font-size: 20px;
      font-weight: bold;
      width: 105px;
      height: 105px;
      top: 30px;
      left: -2px;
      opacity: 0;
      color: #333;
      transition: opacity 0.2s ease-in;
    }
  }
  .denglu:hover span {
    opacity: 1;
  }
  .denglu:hover .card_img {
    opacity: 0.7;
    box-shadow: 0px 0px 10px 3px #cccccc;
  }
  .visiting_card_text {
    color: #666;
    padding: 0px 10px 5px 10px;
    h4 {
      line-height: 26px;
      margin: 5px 0;
      font-weight: 700;
      font-size: 16px;
      text-align: center;
    }
    .author {
      padding: 25px 10px 18px 10px;
      display: flex;
      font-size: 16px;
      justify-content: space-around;
      span {
        padding: 7px 16px;
        background-color: #ff5e5c;
        border-radius: 8px;
        margin: 0px 10px;
        transition: all 0.5s;
        a {
          color: #fff;
          i {
            margin-right: 5px;
          }
        }
      }
      span:hover {
        background-color: #ff332f;
      }
    }
    .author_footer {
      border-top: 1px solid #e5e5e5;
      ul {
        width: 250px;
        display: flex;
        justify-content: space-around;
        li {
          width: 30%;
          padding: 15px 0;
          font-size: 14px;
          text-align: center;
          .shujv {
            font-family: Georgia;
            font-weight: 400;
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>
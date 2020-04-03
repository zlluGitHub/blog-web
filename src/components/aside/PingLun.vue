<template>
  <div class="box-bj-sd">
    <h3 class="h3-style">
      <i class="fa fa-commenting-o"></i>最新评论
    </h3>
    <ul class="plul">
      <li v-for="item in replyData" :key="item.name">
        <img :src="URL+item.url" alt="头像" />
        <p>{{item.content.slice(0,10)}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
// import { URL } from "../../constant/constant.js";
export default {
  name: "pinglun",
  data: () => ({
   URL: this.$url+'/zllublogAdmin/',
    replyData: []
  }),
  computed: {
    commentAll() {
      return this.$store.state.comment.commentAll;
    }
  },
  watch: {
    commentAll() {
      this.handleData();
    }
  },

  created() {
    this.handleData();
  },
  methods: {
    handleData() {
      var data = this.$store.state.comment.commentAll;
      if (data.length !== 0) {
        this.replyData = data.slice(0, 8);
      }
    }
  }
};
</script>
<style lang="scss" scoped>

.plul li {
  border-bottom: 1px solid #fff;
  line-height: 18px;
  padding-left: 5px;
  display: flex;
}

.plul img {
  width: 30px;
  height: 30px;
  /* border-radius: 100px;
  box-shadow: 0px 0px 1.5px 1.5px #cccccc; */
  margin-top: 10px;
}

.plul p {
  margin-top: 10px;
  color: #999;
  width: 100%;
  margin-left: 15px;
  position: relative;
  display: inline-block;
  padding: 6px 6px 6px 10px;
  border: solid #dfdfdf 1px;
  word-wrap: break-word;
  border-radius: 5px;
}

.plul p:after {
  content: "";
  position: absolute;
  left: -6px;
  top: 70%;
  margin-top: -11px;
  width: 9px;
  height: 9px;
  border-width: 0 0 1px 1px;
  border-style: solid;
  border-color: #e5e5e5;
  background: #fff;
  transform: rotate(45deg);
}
</style>

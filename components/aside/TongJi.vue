<template>
  <div class="box-bj-sd">
    <h3 class="h3-style">
      <i class="fa fa-bar-chart"></i>站点信息
    </h3>
    <ul class="tongji">
      <!-- <li>今日更新：0</li> -->
      <!-- <li>总共留言：&nbsp;{{sayData}}&nbsp;条</li> -->
      <li>最近更新：&nbsp;2019-8-12</li>
      <li>正常运行：&nbsp;{{d}}&nbsp;天&nbsp;{{h}}&nbsp;小时&nbsp;{{f}}&nbsp;分钟</li>
    </ul>
  </div>
</template>
<script>
// import { currentDate } from "../../assets/gloable.js";
export default {
  name: "tongji",
  data: () => ({
    d: null,
    h: null,
    f: null,
    // sayData: 0
  }),
  // computed: {
  //   ViweNum() {
  //     return this.$store.getters.getArticleAllViweNum();
  //   },
  //   SayNum() {
  //     return this.$store.getters.getSaySum();
  //   },
  //   replyData() {
  //     return this.$store.state.scatter.replyData.length;
  //   },
  //   replyData() {
  //     return this.$store.state.scatter.replyData.length;
  //   },
  //   articleSum(){
  //     let list =this.$store.state.article.article.list;
  //     return list ? list.length : 0;
  //   }
  // },
  computed: {
    // sayAll() {
    //   return this.$store.state.say.sayAll;
    // }
  },
  watch: {
    // sayAll() {
    //   this.handleData();
    // }
  },

  created() {
    // this.handleData();
    // let list = this.$store.state.article.article.list;
    // this.total = list ? list.length : 0;
    //获取将来时间
    let nextDate = new Date("2/7/2018 00:00:00");
    //设置定时器
    setInterval(() => {
      //获取当前时间
      let currentDate = new Date();
      //获取当前时间戳
      let currentTime = currentDate.getTime();
      let nextTime = nextDate.getTime();
      //获取剩下的时间戳
      let allTime = currentTime - nextTime;
      //把毫秒转化成秒
      let allsecond = parseInt(allTime / 1000);
      //转化
      this.d = this.size(parseInt(allsecond / 3600 / 24));
      this.h = this.size(parseInt((allsecond / 3600) % 24));
      this.f = this.size(currentDate.getMinutes());
    }, 1000);
  },
  methods: {
    // handleData() {
    //   var data = this.$store.state.say.sayAll;
    //   if (data) {
    //     this.sayData = data.length;
    //   }
    // },
    //运行时间统计
    size(num) {
      return num >= 10 ? num : "0" + num;
    }
  }
};
</script>
<style lang="scss" scoped>
.tongji {
  font-size: 14px;
  margin-top: 10px;
  li {
    border-bottom: 1px solid #fff;
    padding: 6px;
    color: #666;
  }
}
</style>
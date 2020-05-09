<template>
  <div class="box-bj-sd">
    <h3 class="h3-style">
      <i class="fa fa-bar-chart"></i>站点统计
    </h3>
    <ul class="tongji">
      <!-- <li>今日更新：0</li> -->
      <!-- <li>总共留言：&nbsp;{{sayData}}&nbsp;条</li> -->
      <li>
        <span>分类数目：&nbsp;12&nbsp;个</span>
        <span>链接总数：&nbsp;{{linkNum?linkNum:0}}&nbsp;个</span>
      </li>
      <li><span>标签数量：&nbsp;{{tagData.count?tagData.count:0}}&nbsp;个</span></li>
      <li>最近更新：&nbsp;{{lastTime?lastTime:'0000-00-00'}}</li>
      <!-- <li>正常运行：&nbsp;{{d}}&nbsp;天&nbsp;{{h}}&nbsp;小时&nbsp;{{f}}&nbsp;分钟</li> -->
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
    content: null,
    linkNum: 0,
    lastTime: null
  }),
  props: ["statisty"],
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
    tagData() {
      return this.$store.state.article.tagData;
    }
  },
  watch: {
    statisty(val) {
      this.content = val;
      this.handleData();
    }
  },
  created() {
    this.content = this.statisty;
    this.handleData();
    // this.handleData();
    // let list = this.$store.state.article.article.list;
    // this.total = list ? list.length : 0;
    //获取将来时间
    let nextDate = new Date("7/29/2018 00:00:00");
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
    handleData() {
      let date = new Date();
      let year = date.getFullYear(); //获取完整的年份(4位)
      let month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      let dates = date.getDate(); //获取当前日(1-31)
      if (this.content) {
        this.lastTime = this.content.time
          ? this.content.time.slice(0, 10)
          : `${year} - ${month} - ${dates}`;
        this.linkNum = this.content.linkCount;
      }

      // var data = this.$store.state.say.sayAll;
      // if (data) {
      //   this.sayData = data.length;
      // }
    },
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
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #fff;
    padding: 6px;
    color: #666;
    margin-right: 20px;
  }
}
</style>
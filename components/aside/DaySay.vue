<template>
  <div class="box-bj-sd">
    <h3 class="h3-style">
      <i class="fa fa-slideshare"></i>每日一语
    </h3>
    <div class="panel-body">
      <p>
        <i class="fa fa-quote-left fa-lg"></i>
        {{Value}}
        <i class="fa fa-quote-right fa-lg"></i>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "daysay",
  data: () => ({
    Value: ""
  }),
  props: ["say"],
  watch: {
    say(val) {
      this.Value = val.content;
    }
  },
  // computed: {
  //   sayData() {
  //     return this.$store.state.say.sayAll[0];
  //   }
  // },
  // watch: {
  //   sayData(cur) {
  //     this.Value = cur?cur.content:'博主很懒，什么都没说。。。';
  //   }
  // },
  created() {
    // let val = this.$store.state.say.sayAll[0];
    this.Value = this.say ? this.say.content : "博主很懒，什么都没说。。。";
  }
};
</script>
<style lang="scss" scoped>
.panel-body {
  margin: 5px 0px;
  padding-bottom: 10px;
  p {
    // text-indent: 2em;
    padding: 20px 20px;
    font-size: 13px;
    line-height: 1.8;
    color: #777;
    i {
      // width: 0;
      display: inline-block;
      color: rgba(121, 120, 120, 0.6);
      // position: absolute;
    }
    .fa-quote-left {
      //   top: 18px;
      // left: 14px;
      margin-left: 5px;
      margin-right: 8px;
      margin-bottom: 3px;
      transform: translateY(-8px);
    }
    .fa-quote-right {
      margin-left: 5px;
      margin-right: 8px;
      margin-bottom: 3px;
      transform: translateY(8px);
      //      bottom: 18px;
      // right: 14px;
    }
  }
}
</style>

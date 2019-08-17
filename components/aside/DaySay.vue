<template>
  <div class="box-bj-sd">
    <h3 class="h3-style">
      <i class="fa fa-slideshare"></i>每日一语
    </h3>
    <div class="panel-body">
      <p>{{Value}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "daysay",
  data: () => ({
    Value: ''
  }),
  computed: {
    sayData() {
      return this.$store.state.say.sayAll[0];
    }
  },
  watch: {
    sayData(cur) {
      this.Value = cur?cur.content:'博主很懒，什么都没说。。。';
    }
  },
  created() {
    let val = this.$store.state.say.sayAll[0];
    this.Value =val? val.content :'博主很懒，什么都没说。。。';
  }
};
</script>
<style lang="scss" scoped>
.panel-body{
  text-indent: 2em;
  p{
    padding: 20px 15px;
    font-size: 13px;
    line-height: 1.8;
    color:#777;

  }
}
</style>

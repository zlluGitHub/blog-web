<template>
    <div class="box-bj-sd warp">
      <span>此专栏升级中，暂无内容</span>
    </div>
</template>
<script>
// import '../assets/css/APlayer.min.css';
// import '../assets/js/APlayer.min.js';
export default {
  name: "works",
  data: () => ({

  }),
  created() {
   
  },
  mounted() {
  
  },
  methods: {
   
    // getAudioData(url) {
    //   const _this = this;
    //   this.axios
    //     .get(url)
    //     .then(function(res) {
    //       if (res.data) {
    //         _this.audioList = res.data.data.songs;
    //         _this.initAudio(_this.ele, _this.audioList[0]);
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
  }
};
</script>
<style lang="scss" scoped>
.warp{
  padding: 20px;
  height: 400px;
  justify-content: center;
  align-items: center;
}
</style>
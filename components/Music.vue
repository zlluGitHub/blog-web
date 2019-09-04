<template>
  <div class="music" ref="audioId"></div>
</template>
<script>
// import '../assets/css/APlayer.min.css';
// import '../assets/js/APlayer.min.js';
export default {
  name: "music",
  data: () => ({}),
  created() {},
  mounted() {
    const ap = new APlayer({
      container: this.$refs.audioId,
      fixed: true,

      audio: [
        //   {
        //     name: '佛系少女',
        //     artist: '冯提莫',
        //     url: 'https://zhenglinglu.cn/music/foxishaonv.mp3',
        //     cover: 'https://zhenglinglu.cn/static/img/touxiang0.ff5a451.jpg',
        //       //  theme: '#46718b',
        // },
        // {
        //     name: '你是我今生最美的情缘',
        //     artist: '魏新雨',
        //     url: 'https://zhenglinglu.cn/music/zuimeiqingyuan.mp3',
        //     cover: 'https://zhenglinglu.cn/static/img/touxiang0.ff5a451.jpg',
        //       //  theme: '#46718b',
        // }, {
        //     name: '小幸运',
        //     artist: '冯提莫',
        //     url: 'https://zhenglinglu.cn/music/xiaoxingyun.mp3',
        //     cover: 'https://zhenglinglu.cn/static/img/touxiang0.ff5a451.jpg',
        //       //  theme: '#46718b',
        // }
      ]
    });
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

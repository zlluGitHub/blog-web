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
          {
            name: 'WONDER Tourism',
            artist: 'Take Me Hands',
            url: 'https://webfs.yun.kugou.com/201909061051/e3d2d24efb47f6b6da2514e51bbae044/G082/M01/0A/1D/8oYBAFf6CLiAEuvJAEVGDygc1mQ202.mp3',
            cover: 'https://p3fx.kgimg.com/stdmusic/20150720/20150720120440515101.jpg',
              //  theme: '#46718b',
        },
        {
            name: 'Fade Reloaded',
            artist: 'Faded',
            url: 'https://webfs.yun.kugou.com/201909061058/7990e375b82fd2d13205daa6a4e359b2/G052/M04/19/07/FJQEAFZWxMSAbdi-ADPyIZwJRM0272.mp3',
            cover: 'https://imgessl.kugou.com/uploadpic/softhead/400/20190806/20190806163442954.jpg"',
            lrcType: 2,
            lrc: 'https://www.zhenglinglu.cn/staticimg/music/faded.lrc'
              //  theme: '#46718b',
        }
        //, {
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

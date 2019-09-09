<template>
  <div>
    <div class="musics" ref="audio"></div>
  </div>

  <!-- <div class="box-bj-sd warp">
      <span>此专栏升级中，暂无内容</span>
  </div>-->
</template>
<script>
export default {
  name: "music",
  data: () => ({
    content: []
  }),
  computed: {
    musicData() {
      return this.$store.state.music.musicData;
    }
  },
  watch: {
    musicData(value) {
      this.content = value;
       this.initAudio();
    }
  },
  mounted() {
    this.content = this.$store.state.music.musicData;
    this.initAudio();
  },
  methods: {
    initAudio() {
      if (this.content) {
        const ap = new APlayer({
          container: this.$refs.audio,
          fixed: false,
          mini: false,
          autoplay: false,
          // theme: "#FADFA3",
          loop: "all",
          // order: "random",
          preload: "auto",
          volume: 0.7,
          mutex: true,
          listFolded: false,
          listMaxHeight: 90,
          lrcType: 3,
          audio: this.content
          // audio: [
          //   {
          //     name: "WONDER Tourism",
          //     artist: "Take Me Hands",
          //     url:
          //       "https://webfs.yun.kugou.com/201909061051/e3d2d24efb47f6b6da2514e51bbae044/G082/M01/0A/1D/8oYBAFf6CLiAEuvJAEVGDygc1mQ202.mp3",
          //     cover:
          //       "https://p3fx.kgimg.com/stdmusic/20150720/20150720120440515101.jpg"
          //     //  theme: '#46718b',
          //   },
          //   {
          //     name: "Fade Reloaded",
          //     artist: "Faded",
          //     url: "https://www.zhenglinglu.cn/staticimg/music/mp3/faded.mp3",
          //     cover: 'https://www.zhenglinglu.cn/staticimg/music/img/faded.jpg"',
          //     lrc: "https://www.zhenglinglu.cn/staticimg/music/lrc/faded.lrc"
          //     //  theme: '#46718b',
          //   },
          //   {
          //     name: "小幸运",
          //     artist: "冯提莫",
          //     url: "https://zhenglinglu.cn/music/xiaoxingyun.mp3",
          //     cover: "https://zhenglinglu.cn/static/img/touxiang0.ff5a451.jpg"
          //     //  theme: '#46718b',
          //   }
          // ]
        });

        // console.log(document.querySelector(".musics").querySelector(".aplayer-lrc").classList.add("lrc-active"));
      }
    }
  }
};
</script>
<style lang="scss">
.musics {
  width: 100%;
  min-height: 450px;
}
</style>
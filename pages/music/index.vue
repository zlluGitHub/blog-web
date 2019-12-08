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
          // audio: this.content
          audio: [
            {
            name: "God Is A Girl",
            artist: "Groove Coverage",
            url:
              "https://webfs.yun.kugou.com/201912071724/8b7484d2205e05223572ac47e1525119/G003/M05/1D/01/o4YBAFS8KBiAWantADW2L7v3dH0122.mp3",
            cover:
              "https://p3fx.kgimg.com/stdmusic/20190418/20190418034756147779.jpg"
            //  theme: '#46718b',
          },
          {
            name: "Pretty Boy",
            artist: "Shades of Purple",
            url: "https://webfs.yun.kugou.com/201912071727/988dae82943d81418629e1a8a8cded32/part/0/960052/G004/M05/01/04/RA0DAFS5NHCAFdWZAEPrQbncnXU891.mp3",
            cover: 'https://www.zhenglinglu.cn/staticimg/music/img/faded.jpg"',
            // lrc: "https://www.zhenglinglu.cn/staticimg/music/lrc/faded.lrc"
            //  theme: '#46718b',
          }
          //   {
          //     name: "小幸运",
          //     artist: "冯提莫",
          //     url: "https://zhenglinglu.cn/music/xiaoxingyun.mp3",
          //     cover: "https://zhenglinglu.cn/static/img/touxiang0.ff5a451.jpg"
          //     //  theme: '#46718b',
          //   }
          ]
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
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
  // computed: {
  //   musicData() {
  //     return this.$store.state.music.musicData;
  //   }
  // },
  // watch: {
  //   musicData(value) {
  //     this.content = value;
  //     this.initAudio();
  //   }
  // },
  mounted() {
    // this.content = this.$store.state.music.musicData;
    this.initAudio();
    					this.$event.emit("inLoading", false);
   	let time = window.setTimeout(() => {
							window.clearTimeout(time);
							this.$event.emit("pageLoading", false);
						}, this.$loadingTime);
  },
  methods: {
    initAudio() {
      // if (this.content) {
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
            name: "Céline Dion",
            artist: "Various Artists",
            url: this.$url + "/music/mp3/dion.mp3",
            cover: this.$url + "/music/img/dion.png",
            lrc: this.$url + "/music/lrc/dion.lrc"
            //  theme: '#46718b',
          },
          {
            name: "Take Me Hand",
            artist: "DAISHI DANCE、Cecile Corbel",
            url: this.$url + "music/mp3/take_me_hand.mp3",
            cover: this.$url + "music/img/take_me_hand.jpg",
            lrc: this.$url + "music/lrc/take_me_hand.lrc"
            //  theme: '#46718b',
          },
          {
            name: "Solheim - Faded",
            artist: "Alan Walker、Iselin Solheim",
            url: this.$url + "/music/mp3/faded.mp3",
            cover: this.$url + "/music/img/faded.jpg",
            lrc: this.$url + "/music/lrc/faded.lrc"
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
      // }
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
<template>
  <div>
    <!-- 头部 -->
    <Header />
    <div class="section-warp">
      <!-- 搜索框 -->
      <SearchInput />
      <!-- 中间内容 -->
      <transition name="page">
        <router-view />
      </transition>
      <transition name="loading">
        <div class="cell" v-if="inLoading">
          <div class="card">
            <span class="whirly-loader">Loading…</span>
          </div>
        </div>
      </transition>
    </div>
    <!-- 尾部 -->
    <Footer />
    <!-- 加载动画 -->
    <!-- carousel -->
    <transition name="loading">
      <Loading v-if="show" />
    </transition>
    <!-- 音乐 -->
    <div class="music aplayer-left" ref="audioId"></div>
    <!-- 回到顶部 -->
    <BackTop />
    <!-- 背景粒子 -->
    <div id="particles-js"></div>
    <!-- 右键菜单 -->
    <Menus />
  </div>
</template>
<script>
import { analysisString, agentInfo } from "./assets/js/globle.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import SearchInput from "./components/SearchInput";
import Menus from "./components/Menu";
// import Qs from "qs";
export default {
  name: "default",
  components: {
    Header,
    Footer,
    Loading,
    SearchInput,
    Menus
  },
  data: () => ({
    show: true,
    inLoading: false,
    name: "",
    location: "",
    system: ""
    // URL: process.env.baseUrl + "/zllublogAdmin/"
  }),
  // computed: {
  // 	loading() {
  // 		return this.$store.state.article.loading;
  // 	}
  // },
  // watch: {
  // 	loading(val) {
  // 		this.show = val;
  // 	}
  // },
  // created() {},
  mounted() {
    let _this = this;
    this.$event.on("pageLoading", e => {
      this.show = e;
    });
    this.$event.on("inLoading", e => {
      this.inLoading = e;
    });
    //*****************************解决刷新页面数据丢失开始**************************************** */
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
      sessionStorage.removeItem("store");
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    this.initMusit();
    this.$nextTick(() => {
      //背景粒子
      this.bgAnimation();
    });

    // function getUserIP(onNewIP) {
    //   //  onNewIp - your listener function for new IPs
    //   //compatibility for firefox and chrome
    //   var myPeerConnection =
    //     window.RTCPeerConnection ||
    //     window.mozRTCPeerConnection ||
    //     window.webkitRTCPeerConnection;
    //   var pc = new myPeerConnection({
    //       iceServers: []
    //     }),
    //     noop = function() {},
    //     localIPs = {},
    //     ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    //     key;

    //   function iterateIP(ip) {
    //     if (!localIPs[ip]) {
    //       _this.submitInfo(ip);
    //     }
    //     localIPs[ip] = true;
    //   }

    //   //create a bogus data channel
    //   pc.createDataChannel("");

    //   // create offer and set local description
    //   pc.createOffer()
    //     .then(function(sdp) {
    //       sdp.sdp.split("\n").forEach(function(line) {
    //         if (line.indexOf("candidate") < 0) return;
    //         line.match(ipRegex).forEach(iterateIP);
    //       });

    //       pc.setLocalDescription(sdp, noop, noop);
    //     })
    //     .catch(function(reason) {
    //       // An error occurred, so handle the failure to connect
    //     });

    //   //listen for candidate events
    //   pc.onicecandidate = function(ice) {
    //     if (
    //       !ice ||
    //       !ice.candidate ||
    //       !ice.candidate.candidate ||
    //       !ice.candidate.candidate.match(ipRegex)
    //     )
    //       return;
    //     ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    //   };
    // }
    // console.log(!window.sessionStorage.getItem("vi"));

    if (!window.sessionStorage.getItem("vi")) {
      // //获取浏览器信息
      agentInfo._init();
      // getUserIP();
      this.submitInfo();
    }
  },
  methods: {
    // 提交访问信息
    submitInfo() {
      // 返回当前访问人信息
      let data = {
        // ip: ip ? ip : "",
        // path: "/",
        // content: "访问首页。"
      };

      if (this.name) {
        data.name = this.name;
      }

      if (this.location) {
        data.location = this.location;
      }

      if (agentInfo.OSname) {
        data.OSname = agentInfo.OSname;
      }

      if (agentInfo.browserName) {
        data.browserName = agentInfo.browserName;
      }

      if (agentInfo.browserVer) {
        data.browserVer = agentInfo.browserVer;
      }

      // this.$axios
      // .get("http://ip.taobao.com/service/getIpInfo.php?ip=", Qs.stringify(data))
      // .then(res => {
      //     window.sessionStorage.setItem("vi", res.data.result);
      // });

      this.$axios
        .post(this.$url + "/zll/visit/add", this.$qs.stringify(data))
        .then(res => {
          window.sessionStorage.setItem("vi", res.data.result);
        });
    },

    initMusit(data) {
      const ap = new APlayer({
        container: this.$refs.audioId,
        fixed: true,
        lrcType: 3,
        // audio: data
        audio: [
          // {
          //   name: "God Is A Girl",
          //   artist: "Groove Coverage",
          //   url:
          //     "https://webfs.yun.kugou.com/201912071724/8b7484d2205e05223572ac47e1525119/G003/M05/1D/01/o4YBAFS8KBiAWantADW2L7v3dH0122.mp3",
          //   cover:
          //     "https://p3fx.kgimg.com/stdmusic/20190418/20190418034756147779.jpg"
          //   //  theme: '#46718b',
          // },
          // {
          //   name: "Pretty Boy",
          //   artist: "Shades of Purple",
          //   url: "https://webfs.yun.kugou.com/201912071727/988dae82943d81418629e1a8a8cded32/part/0/960052/G004/M05/01/04/RA0DAFS5NHCAFdWZAEPrQbncnXU891.mp3",
          //   cover: 'https://www.zhenglinglu.cn/staticimg/music/img/faded.jpg"',
          //   // lrc: "https://www.zhenglinglu.cn/staticimg/music/lrc/faded.lrc"
          //   //  theme: '#46718b',
          // }
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
          //, {
          //     name: '小幸运',
          //     artist: '冯提莫',
          //     url: 'https://zhenglinglu.cn/music/xiaoxingyun.mp3',
          //     cover: 'https://zhenglinglu.cn/static/img/touxiang0.ff5a451.jpg',
          //       //  theme: '#46718b',
          // }
        ]
      });
      document
        .querySelector(".aplayer-left")
        .querySelector(".aplayer-lrc")
        .classList.add("lrc-height");
      document
        .querySelector(".aplayer-left")
        .querySelector(".aplayer-lrc")
        .querySelector(".aplayer-lrc-contents")
        .classList.add("lrc-padding-top");
    },
    bgAnimation() {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#666"
          },
          shape: {
            type: "star",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 0.1,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 5,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#666",
            opacity: 0.1,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 0.1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 0.1,
              speed: 3
            },
            repulse: {
              distance: 200
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true,
        config_demo: {
          hide_card: false,
          background_color: "#b61924",
          background_image: "",
          background_position: "50% 50%",
          background_repeat: "no-repeat",
          background_size: "cover"
        }
      });
    }
  }
};
</script>
<style lang="scss">
body {
  background: url("./assets/image/bl.png") no-repeat fixed bottom left,
    url("./assets/image/tr.png") no-repeat fixed top right, #f0f2f7 !important;
  z-index: -1;
}
@import "./assets/css/globle.scss";
</style>


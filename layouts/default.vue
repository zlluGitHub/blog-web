<template>
  <div>
    <!-- 头部 -->
    <Header />
    <div class="section-warp">
      <!-- 搜索框 -->
      <SearchInput />
      <!-- 中间内容 -->
      <nuxt />
    </div>
    <!-- 尾部 -->
    <Footer />
    <!-- 加载动画 -->
    <!-- carousel -->
    <transition name="loading">
      <Loading v-if="show" />
    </transition>
    <!-- 音乐 -->
    <Music />
    <!-- 回到顶部 -->
    <BackTop />
    <!-- 背景粒子 -->
    <!-- <div id="particles-js"></div> -->
  </div>
</template>
<script>
import { analysisString } from "../assets/js/globle.js";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Loading from "~/components/Loading";
import SearchInput from "~/components/SearchInput";
import Music from "~/components/Music";
export default {
  name: "default",
  components: {
    Header,
    Footer,
    Loading,
    SearchInput,
    Music
  },
  data: () => ({
    show: true
  }),
  created() {
    //请求文章数据
    this.$axios
      .get(process.env.baseUrl + "/zllublogAdmin/article/get.article.php")
      .then(res => {
        let data = res.data.list;
        data.forEach(ele => {
          ele.keywords = ele.keywords.split("、");
          ele.publishTime = ele.publishTime.slice(0, 10);
        });
        this.show = false;
        this.$store.commit("setArtileAll", data);
      });

    // 请求留言数据
    this.$axios
      .get(
        process.env.baseUrl + "/zllublogAdmin/comment/get.comment.content.php"
      )
      .then(res => {
        let data = res.data.list;
        data.forEach(item1 => {
          //最外层循环
          if (item1.data.indexOf("},{") === -1) {
            item1.data = [
              analysisString(
                item1.data.substring(
                  item1.data.indexOf("[{") + 2,
                  item1.data.indexOf("}]")
                )
              )
            ];
          } else {
            var arr = item1.data;
            arr = arr
              .substring(arr.indexOf("[{") + 2, arr.indexOf("}]"))
              .split("},{");
            item1.data = arr.map(item2 => {
              return analysisString(item2.toString());
            });
          }
        });

        // var arr = data[1].data;

        // // console.log(arr, "222222222222222222222222222222222");
        // arr = arr.substring(arr.indexOf("[{") + 2, arr.indexOf("}]"));
        // console.log(arr, "3333333333333333333333333333333");

        // arr = arr.split("},{");

        // console.log(arr, "444444444444444444444444444444444444");

        // arr = arr[0].split('","');
        // console.log(arr, "55555555555555555555555555555");
        // arr = arr[0].substring(arr.indexOf('":"') + 3, arr.length).toString();
        // console.log({
        //   name: arr
        // });

        // console.log(arr.split('},{') );
        // console.log(JSON.parse(arr));

        // console.log(eval("(" + data[0].data.toString() + ")"));

        // console.log(typeof data[0].data);
        // console.log("'" + data[0].data + "'");
        // // var str = JSON.stringify(data[0].data).replace("\\","")
        // var str = data[0].data.toString();
        // console.log(str);
        // // console.log(data[0].data.toString());
        // console.log(JSON.parse(str));
        // // this.show = false;
        this.$store.commit("setCommentAll", data);
      });

    // 请求微语数据
    this.$axios
      .get(process.env.baseUrl + "/zllublogAdmin/say/get.say.php")
      .then(res => {
        let data = res.data.list;
        data.forEach(ele => {
          ele.sendTime = ele.sendTime.slice(0, 10);
        });
        this.data = data;
        this.$store.commit("setSayAll", data);
      });
  },
  mounted() {
    //背景粒子
    // this.bgAnimation();
  },
  methods: {
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
            value: "#ffffff"
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
            color: "#ffffff",
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

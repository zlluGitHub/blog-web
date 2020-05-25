<template>
  <div>
    <div class="heade" :class="isFixed?'heade-fixed':''">
      <div class="warp">
        <span class="navicon" @click.stop="handleNavShow" :class="[navShow?'open':'']"></span>
        <Icon type="ios-search" class="search" @click.stop="SearchShow" size="40" />
        <div class="logo">
          <div class="logo-top">Hi,&nbsp;&nbsp;{{textDate}}&nbsp;现在是 {{time}}</div>
          <div class="logo-inner">
            <router-link to="/">
              <h1>
                <img src="../assets/image/logo.png" alt="logo" />
                <i :class="isFixed?'light-fixed':''" class="light"></i>
              </h1>
            </router-link>
            <div class="brand">
              伟大的行动
              <br />都有一个微不足道的开始。
            </div>
          </div>
        </div>
        <div class="nav" :class="[navShow?'navShow':'']">
          <div class="scrow">
            <ul class="nav-box">
              <li>
                <a href="https://zllugithub.github.io" target="_blank">
                  <i class="fa fa-paper-plane-o"></i>
                  zll-NoteBook
                </a>
              </li>
              <li>
                <a href="https://github.com/zlluGitHub" target="_blank">
                  <i class="fa fa-github"></i>
                  GitHub
                </a>
              </li>
              <li class="yijian-li">
                <a href="https://gitee.com/zlluGitHub" target="_blank">
                  <i class="fa fa-github-alt"></i>
                  Gitee
                </a>
              </li>
              <li class="seach-li">
                <a class="seach" @click="SearchShow" href="javascript:void(0);">
                  <Icon type="ios-search" size="16" />搜索
                </a>
              </li>
              <li class="seach-li">
                <a class="seach" :href="$url+'/admin/'">
                 <Icon type="md-exit"  size="16" />登录
                </a>
              </li>
            </ul>
            <nav>
              <ul class="nav-ul">
                <li class="index" :class="[active==='a'?'active':'']">
                  <router-link to="/" @click.native="handleTo('首页','/','a')">
                    <i class="fa fa-home"></i>
                    首页
                  </router-link>
                </li>
                <li :class="[active==='b'?'active':'']" class="li">
                  <!-- <router-link to="/study" @click.native="handleTo('技术专栏','/study','b')">
                    <i class="fa fa-file-code-o"></i>技术专栏
                    <Icon type="ios-arrow-down" class="iShow" />
                  </router-link> -->
                  <a href="javascript:void(0);">
                    <i class="fa fa-file-code-o"></i>技术专栏
                    <Icon type="ios-arrow-down" class="iShow" />
                  </a>
                  <ul class="nav-two">
                    <li>
                      <router-link
                        to="/reception"
                        @click.native="handleTo('前端技术','/reception','b')"
                      >前端技术</router-link>
                    </li>
                    <li>
                      <router-link
                        to="/backstage"
                        @click.native="handleTo('后端基础','/backstage','b')"
                      >后端基础</router-link>
                    </li>
                    <li>
                      <router-link to="/base" @click.native="handleTo('数据库','/base','b')">数据库</router-link>
                    </li>
                    <li>
                      <router-link to="/wxcx" @click.native="handleTo('微信程序','/wxcx','b')">微信程序</router-link>
                    </li>
                    <li>
                      <router-link to="/other" @click.native="handleTo('技术杂谈','/other','b')">技术杂谈</router-link>
                    </li>
                  </ul>
                </li>
                <!-- <li :class="[active==='c'?'active':'']" class="li">
                  <a href="javascript:void(0);">
                    <Icon type="md-desktop" />素材模板
                    <Icon type="ios-arrow-down" class="iShow" />
                  </a>
                  <ul class="nav-two">
                    <li>
                      <router-link to="/subunit" @click.native="handleTo('常用组件','/webblog','c')">常用组件</router-link>
                    </li>
                    <li>
                      <router-link
                        to="/template"
                        @click.native="handleTo('网站模板','/template','c')"
                      >网站模板</router-link>
                    </li>
                  </ul>
                </li>-->

                <li :class="[active==='d'?'active':'']" class="li">
                  <a href="javascript:void(0);">
                    <i class="fa fa-share-alt fa-fw"></i>可视化
                    <Icon type="ios-arrow-down" class="iShow" />
                  </a>
                  <ul class="nav-two">
                    <li :class="[active==='e'?'active':'']">
                      <router-link to="/charts" @click.native="handleTo('可视图谱','/charts','d')">可视图谱</router-link>
                    </li>
                    <li :class="[active==='e'?'active':'']">
                      <router-link to="/works" @click.native="handleTo('代码案例','/works','d')">代码案例</router-link>
                    </li>
                    <!-- <li :class="[active==='e'?'active':'']">
                      <router-link to="/say" @click.native="handleTo('大屏制作','/say','d')">大屏制作</router-link>
                    </li>-->
                  </ul>
                </li>
                <li :class="[active==='c'?'active':'']">
                  <router-link to="/say" @click.native="handleTo('时间线','/say','c')">
                    <i class="fa fa-book"></i>时间线
                  </router-link>
                </li>
                <li :class="[active==='e'?'active':'']">
                  <router-link to="/links" @click.native="handleTo('网址导航','/links','e')">
                    <i class="fa fa-link"></i>网址导航
                  </router-link>
                </li>

                <!-- <li :class="[active==='f'?'active':'']" class="li">
                  <a href="javascript:void(0);">
                    <i class="fa fa-share-alt fa-fw"></i>与我相关
                    <Icon type="ios-arrow-down" class="iShow" />
                  </a>
                  <ul class="nav-two">
                    <li :class="[active==='e'?'active':'']">
                      <router-link to="/music" @click.native="handleTo('音乐大厅','/music','f')">音乐大厅</router-link>
                    </li>
                    <li :class="[active==='e'?'active':'']">
                      <router-link to="/say" @click.native="handleTo('微语记录','/say','f')">微语记录</router-link>
                    </li>
                    <li>
                      <router-link to="/about" @click.native="handleTo('关于我','/about','f')">关于我</router-link>
                    </li>
                  </ul>
                </li>-->
                <li :class="[active==='f'?'active':'']">
                  <router-link to="/about" @click.native="handleTo('关于我','/about','f')">
                    <i class="fa fa-user-o"></i>关于我
                  </router-link>
                </li>
                <li :class="[active==='g'?'active':'']">
                  <router-link to="/word" @click.native="handleTo('留言板','/word','g')">
                    <i class="fa fa-edit"></i>留言板
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div v-if="navShow" class="nav-show fade-transition ivu-modal-mask" @click.stop="handleNavShow"></div>
  </div>
</template>
<script>
import { date, goBack } from "../assets/js/globle";
export default {
  name: "headers",
  data: () => ({
    value: "",
    time: date(),
    isSearchShow: false,
    navShow: false, //导航显示
    textDate: "",
    pageNo: 0,
    pageSize: 10,
    offsetTop: 50, //导航到顶部的触发距离
    isFixed: false,
    mark: false, //判断是否是首页
    active: "a"
  }),
  mounted() {
    const _this = this;
    //给window添加一个滚动滚动监听事件
    window.addEventListener("scroll", this.handleScroll);
    const now = new Date();
    const hour = now.getHours();
    if (hour < 6) {
      _this.textDate = "凌晨好！";
    } else if (hour < 9) {
      _this.textDate = "早上好！";
    } else if (hour < 12) {
      _this.textDate = "上午好！";
    } else if (hour < 14) {
      _this.textDate = "中午好！";
    } else if (hour < 17) {
      _this.textDate = "下午好！";
    } else if (hour < 19) {
      _this.textDate = "傍晚好！";
    } else if (hour < 22) {
      _this.textDate = "晚上好！";
    } else {
      _this.textDate = "夜里好！";
    }
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop < this.offsetTop) {
        this.isFixed = false;
      } else {
        this.isFixed = true;
      }
    },
    handleTo(name, url, mark) {
      // console.log(name, url, mark);
      this.$store.commit("setSearchShow", false);
      if (this.$route.path !== url) {
        this.$event.emit("inLoading", true);
      }

      // let pageData = this.$store.getters.getTypeData(nav);
      // this.$store.dispatch("setArticleTypeData", pageData);
      // this.$store.dispatch("setRouter", { nav, url, title });
      // this.$router.push({ path: url });
      this.active = mark;
      // this.handleNavShow();
      // this.$store.dispatch("setChangingOver", {
      //   notice: false,
      //   position: mark === "a" ? false : true
      // });
      // //侧边栏配置
      // this.$store.dispatch("setAsideSingleConfigsData", mark);
    },
    handleActive(mark) {
      this.active = mark;
    },
    SearchShow() {
      this.isSearchShow = !this.isSearchShow;
      this.$store.commit("setSearchShow", this.isSearchShow);
    },
    handleNavShow() {
      this.navShow = !this.navShow;
    },
    handleLogin() {
      let data = {
        client_id: "8b089dc0bdefbbfc7d95",
        state: 12,
        state: this.$url + "/"
      };
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${data.client_id}&state=${data.state}&redirect_uri=${data.state}`;
      // 4f9e49538ae9d1079898
      // this.$axios
      //   // .get(process.env.baseUrl+"/zllublogAdmin/login/login.php"), { params: data }
      //   .get(`https://github.com/login/oauth/access_token?client_id=8b089dc0bdefbbfc7d95&client_secret=61f6952cb122165e69f19f448491054500249715&code=4f9e49538ae9d1079898&redirect_uri=https://www.zhenglinglu.cn/`).then(res => {
      //     console.log(res);
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   });
      // https://www.zhenglinglu.cn/?code=4f9e49538ae9d1079898&state=12
      //  access_token=118b5f90de8578f16d99454d7e535938c52e4d89&scope=&token_type=bearer
    },
    handleClikFeedBack() {
      this.$store.dispatch("setChangingOver", {
        feedBack: true
      });
      this.handleNavShow();
    }
  }
};
</script>

<style lang="scss" scoped>
.heade-fixed {
  margin-top: -45px;
  opacity: 0.95;
}
.nav-show {
  display: none;
}
.heade::before {
  background: #000
    linear-gradient(
      to left,
      #4cd964,
      #5ac8fa,
      #007aff,
      #34aadc,
      #5856d6,
      #ff2d55
    );
  content: "";
  height: 5px;
  top: 0;
  width: 100%;
  float: left;
}
.heade {
  position: fixed;
  width: 100%;
  z-index: 100;
  height: 105px;
  background: #fff;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.17);
  transition: all 0.3s ease;
  .warp {
    width: 1200px;
    display: flex;
    position: relative;
    justify-content: space-between;
    margin: auto;
    i.search {
      position: absolute;
      right: 30px;
      top: 15px;
      display: none;
    }
    .navicon {
      margin-left: 25px;
      position: absolute;
      display: none;
      width: 30px;
      height: 5px;
      background-color: #000;
      margin-top: 30px;
    }
    .navicon:before,
    .navicon:after {
      content: "";
      display: block;
      width: 30px;
      height: 5px;
      position: absolute;
      background: #000;
      transition: transform 0.3s ease;
    }
    .navicon:before {
      transform-origin: 0px 0px;
      margin-top: -10px;
    }
    .navicon:after {
      transform-origin: 0px 5px;
      margin-top: 10px;
    }
    .open {
      background-color: #fff;
    }
    .open:before {
      transform-origin: 0px 0px;
      transform: rotate(45deg);
    }
    .open:after {
      transform-origin: 0px 5px;
      transform: rotate(-45deg);
    }
    .logo {
      // padding: 20px 0;
      .logo-top {
        font-size: 12px;
        color: #999;
        padding: 16px 0px;
      }
      .logo-inner {
        display: flex;
      }
      .brand {
        font-size: 12px;
        color: #bbb;
        padding-left: 10px;
        top: 1px;
        font-family: Georgia;
        border-left: 2px solid #eaeaea;
        margin-left: 10px;
        overflow: hidden;
        height: 40px;
      }
      h1 {
        position: relative;

        img {
          width: 125px;
          height: 38px;
          transition: all 0.3s ease;
        }
        .logo-fixed {
          position: absolute;
          margin-top: 25px;
          width: 155px;
          height: 60px;
        }
        .light {
          cursor: pointer;
          position: absolute;
          left: 0px;
          top: 0;
          width: 12px;
          height: 40px;
          background-image: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0)
          );

          transform: skewx(-25deg);
          animation: mymove 2.5s infinite;
        }
        // .light-fixed {
        //   top: 25px;
        // }

        @keyframes mymove {
          from {
            left: -0px;
          }
          to {
            left: 125px;
          }
        }
      }
    }
    .nav {
      ul {
        display: flex;
        justify-content: flex-end;
        margin-top: 9px;
        li a {
          font-size: 12px;
        }
      }
      a {
        display: inline-block;
        font-size: 15px;
        color: #666;
        margin-left: 10px;
        padding: 5px 8px;
        margin-top: 5px;
        margin-bottom: 0;
        transition: color 0.5s;
        i {
          margin-right: 5px;
        }
      }
      a:hover {
        color: red;
      }
      nav {
        .index {
          margin-right: 5px;
        }
        ul.nav-ul {
          > li.active > a {
            color: #45b6f7;
          }
          > li {
            position: relative;
            padding-bottom: 12px;
            margin-left: 15px;
            a:hover {
              color: #45b6f7;
            }
            a {
              margin: 0px 2px;
              font-size: 15px;
              // padding-right: 0px;
              transition: color 0.25s ease-in;
            }
            ul.nav-two {
              padding: 10px 5px;
              top: 31px;
              z-index: 100;
              border-radius: 5px;
              background-color: #fff;
              position: absolute;
              flex-direction: column;
              border: 1px solid #ddd;
              box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.17);
              opacity: 0;
              height: 0;
              overflow: hidden;
              transition: all 0.3s ease;
              li {
                // padding: 5px;
                transition: all 0.3s ease;
                a {
                  display: block;
                  text-align: center;
                  padding: 5px 16px;
                  font-size: 13px;
                }
              }
              li:hover {
                background-color: #45b6f7;
                a {
                  color: #fff;
                }
              }
            }
          }
          li a i:nth-child(2) {
            transform: rotate(0deg);
            transition: transform 0.3s ease;
          }
          li:hover:nth-child(2) a i:nth-child(2),
          li:hover:nth-child(3) a i:nth-child(2),
          li:hover:nth-child(4) a i:nth-child(2),
          li:hover:nth-child(6) a i:nth-child(2) {
            transform: rotate(180deg);
          }

          li:hover:nth-child(2) ul.nav-two {
            opacity: 1;
            height: 167px;
          }
          li:hover:nth-child(3) ul.nav-two {
            opacity: 1;
            height: 80px;
          }
          li:hover:nth-child(4) ul.nav-two {
            opacity: 1;
            height: 80px;
          }
          li:hover:nth-child(5) ul.nav-two {
            opacity: 1;
            height: 110px;
          }
          li:hover:nth-child(6) ul.nav-two {
            opacity: 1;
            height: 110px;
          }

          li:hover:nth-child(2):after,
          li:hover:nth-child(4):after,
          // li:hover:nth-child(5):after,
          li:hover:nth-child(6):after,
          li:hover:nth-child(3):after {
            opacity: 1;
          }

          li:nth-child(2) ul {
            left: 5px;
          }
          li:nth-child(3) ul {
            left: 10px;
          }
          li:nth-child(4) ul {
            left: 10px;
          }
          li:nth-child(5) ul {
            left: 10px;
          }
          li:nth-child(6) ul {
            left: 10px;
          }
        }
        .li:after {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          top: 35px;
          left: 50px;
          z-index: 101;
          border-width: 1px 0 0 1px;
          border-style: solid;
          border-color: #e5e5e5;
          background: #fff;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
          opacity: 0;
          transition: opacity 0.3s ease-in;
        }
      }
    }
  }
}
</style>

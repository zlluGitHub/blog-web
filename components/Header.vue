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
                  <i class="fa fa-github-alt"></i>
                  GitHub
                </a>
              </li>
              <li class="yijian-li">
                <a href="javascript:void(0);" @click="handleClikFeedBack">
                  <i class="fa fa-heartbeat"></i>
                  意见反馈
                </a>
              </li>
              <li class="seach-li">
                <a class="seach" @click="SearchShow" href="javascript:void(0);">
                  <Icon type="ios-search" size="22" />搜索
                </a>
              </li>
              <li class="login-li">
                <a @click="handleRender" href="javascript:void(0);">登录</a>
              </li>
            </ul>
            <nav>
              <ul class="nav-ul">
                <li class="index" :class="[active==='a'?'active':'']">
                  <nuxt-link to="/" @click.native="handleTo('首页','/','a')">
                    <i class="fa fa-home"></i>
                    首页
                  </nuxt-link>
                </li>
                <li :class="[active==='b'?'active':'']" class="li">
                  <nuxt-link to="/study" @click.native="handleTo('技术专栏','/study','b')">
                    <i class="fa fa-file-code-o"></i>技术专栏
                    <Icon type="ios-arrow-down" class="iShow" />
                  </nuxt-link>
                  <ul class="nav-two">
                    <li>
                      <nuxt-link to="/reception" @click.native="handleTo('前端技术','/reception','b')">前端技术</nuxt-link>
                    </li>
                    <li>
                       <nuxt-link to="/backstage" @click.native="handleTo('后端基础','/backstage','b')">后端基础</nuxt-link>
                      <!-- <a @click="handleTo('后端技术','/type','','b')" href="javascript:void(0);">后端基础</a> -->
                    </li>
                    <li>
                       <nuxt-link to="/base" @click.native="handleTo('数据库','/base','b')">数据库</nuxt-link>
                      <!-- <a @click="handleTo('数据库','/type','','b')" href="javascript:void(0);">数据库</a> -->
                    </li>
                     <li>
                       <nuxt-link to="/wxcx" @click.native="handleTo('微信程序','/wxcx','b')">微信程序</nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/other" @click.native="handleTo('技术杂谈','/other','b')">技术杂谈</nuxt-link>
                    </li>
                  </ul>
                </li>
                <li :class="[active==='c'?'active':'']" class="li">
                  <a @click="handleTo('素材资源','/type','','c')" href="javascript:void(0);">
                    <i class="fa fa-share-alt fa-fw"></i>素材资源
                    <Icon type="ios-arrow-down" class="iShow" />
                  </a>
                  <ul class="nav-two">
                    <li :class="[active==='e'?'active':'']" class="li">
                      <a @click="handleTo('在线文档','/webnav','','c')" href="javascript:void(0);">在线文档</a>
                    </li>
                    <li>
                      <a @click="handleTo('资源下载','/type','','c')" href="javascript:void(0);">资源下载</a>
                    </li>
                    <li>
                      <a @click="handleTo('网站模板','/type','','c')" href="javascript:void(0);">网站模板</a>
                    </li>
                    <li>
                      <a @click="handleTo('开源分享','/type','','c')" href="javascript:void(0);">开源分享</a>
                    </li>
                  </ul>
                </li>

                <li :class="[active==='d'?'active':'']" class="li">
                  <a @click="handleActive('d')" href="javascript:void(0);">
                    <i class="fa fa-file-image-o"></i>点滴生活
                    <Icon type="ios-arrow-down" class="iShow" />
                  </a>
                  <ul class="nav-two">
                    <li>
                      <a @click="handleTo('微语记录','/say','','d')" href="javascript:void(0);">微语记录</a>
                    </li>
                    <li>
                      <a @click="handleTo('随笔文字','/type','','d')" href="javascript:void(0);">随笔文字</a>
                    </li>
                    <li>
                      <a @click="handleTo('电子相册','/photo','','d')" href="javascript:void(0);">电子相册</a>
                    </li>
                  </ul>
                </li>
                <li :class="[active==='h'?'active':'']">
                  <a @click="handleTo('博友圈','/friends','','h')" href="javascript:void(0);">
                    <i class="fa fa-link"></i>博友圈
                  </a>
                </li>
                <li :class="[active==='i'?'active':'']" class="li">
                  <a @click="handleActive('i')" href="javascript:void(0);">
                    <i class="fa fa-bookmark"></i> 关于本站
                    <Icon type="ios-arrow-down" class="iShow" />
                  </a>
                  <ul class="nav-two">
                    <li>
                      <a @click="handleTo('时间轴','/time','','i')" href="javascript:void(0);">时间轴</a>
                    </li>
                    <li>
                      <a @click="handleTo('我的资料','/About','','i')" href="javascript:void(0);">我的资料</a>
                    </li>
                    <li>
                      <a @click="handleTo('本站统计','/About','','i')" href="javascript:void(0);">本站统计</a>
                    </li>
                  </ul>
                </li>
                <li :class="[active==='f'?'active':'']">
                  <a @click="handleTo('踩脚印','/word','','f')" href="javascript:void(0);">
                    <i class="fa fa-pencil-square-o"></i>踩脚印
                  </a>
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
import { date, goBack } from "~/assets/js/globle";
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
      console.log(name, url, mark);

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
      this.$store.dispatch("setChangingOver", {
        notice: false,
        search: this.isSearchShow,
        position: !this.isSearchShow
      });
      //返回顶部
      goBack();
    },
    handleNavShow() {
      this.navShow = !this.navShow;
    },
    handleRender() {
      this.$store.dispatch("setLogin", {
        login: true
      });
      this.handleNavShow();
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
            margin-left: 20px;
            a:hover {
              color: #45b6f7;
            }
            a {
              margin: 0px 2px;
              font-size: 15px;
              transition: color 0.25s ease-in;
            }
            ul.nav-two {
              padding: 10px 5px;
              top: 31px;
              z-index: 100;
              border-radius: 8px;
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
            height: 132px;
          }
          li:hover:nth-child(4) ul.nav-two {
            opacity: 1;
            height: 108px;
          }
          li:hover:nth-child(6) ul.nav-two {
            opacity: 1;
            height: 108px;
          }

          li:hover:nth-child(2):after,
          li:hover:nth-child(3):after,
          li:hover:nth-child(4):after,
          li:hover:nth-child(6):after {
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

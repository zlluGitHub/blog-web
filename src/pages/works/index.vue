<template>
  <div class="works">
    <div>
      <div class="whitebg lanmu">
        <img src="../../assets/image/web.jpg" />
        <h1>{{type}}</h1>
        <p>此版块主要记录个人在学习过程中所做的一些 Demo 案例。包括一些可视化图谱，例如：D3、Three、vis、echarts等等。</p>
      </div>
      <div v-if="!contentData.length" class="box-bj-sd warp">
        <span>此专栏暂无内容</span>
      </div>
      <div v-else class="content-box box-bj-sd">
        <ul class="wall">
          <li class="wall-column" v-for="item in contentData" :key="item.bid">
            <div>
              <a href="javascript:void(0);">
                <img :src="$url+'/'+item.imgSrc" :alt="item.title" />
                <!-- <img v-if="$url+'/'+item.imgSrc" :src="imgUrl+item.imgSrc" :alt="item.title" /> -->
                <!-- <img v-else src="../../assets/image/moren.jpg" :alt="item.title" /> -->
                <p>
                  <span @click.stop="handleLook(item.bid)">详情</span>
                  <span @click.stop="handleClose(item.herf)">预览</span>
                </p>
              </a>
              <div class="title">
                <h5>{{item.title}}</h5>
                <div class="wall-lines">
                  <small>
                    <i class="fa fa-calendar"></i>
                    <span>{{item.publishTime?item.publishTime.slice(0,10):''}}</span>
                  </small>
                  <!-- <small>
                    <i class="fa fa-tag"></i>
                    <span
                      v-for="(tag,index) in item.keywords"
                      :key="index"
                    >{{tag}} {{index!==item.keywords.length-1?'、':''}}</span>
                  </small>-->
                  <small>
                    <i class="fa fa-eye"></i>
                    <span>{{item.viweNum}}</span>
                  </small>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <Page
          show-total
          @on-change="changePage"
          @on-page-size-change="changeSizePage"
          :page-size-opts="pageSizeOpts"
          :page-size="limit"
          :total="total"
          show-sizer
        />
      </div>
    </div>
    <!-- 弹出层 -->
    <!-- <transition name="carousel">
      <div class="click-box" v-if="isCarousel">
        <div v-if="herf" class="carousel-warp">
          <Icon type="ios-close-circle-outline zl-close" @click="handleClose" />
          <iframe frameborder="no" :src="herf"></iframe>
        </div>
        <div v-else class="carousel-warp">
          <Icon type="ios-close-circle-outline  zl-close" @click="handleClose" />
          <i class="fa fa-spinner fa-pulse"></i>
        </div>
      </div>
    </transition>-->
    <!-- <transition name="carouselBgc">
      <div class="bgc" v-if="isCarouselBgc"></div>
    </transition>-->
  </div>
</template>
<script>
export default {
  name: "works",
  data: () => ({
    isShow: false,
    isStatic: false,
    URL: process.env.baseUrl + "/detail/",
    imgUrl: process.env.baseUrl + "/zllublogAdmin/",
    isCarousel: false,
    isCarouselBgc: false,
    contentData: [],
    pageNo: 1,
    pageSize: 16,
    total: 0,
    herf: "",
    type: "代码案例",
    pageSizeOpts: [16, 32, 48, 64, 80],
    limit: 16
  }),
  // async asyncData(context) {
  //   if (context.isStatic) {
  //     return await {
  //       isStatic: context.isStatic
  //     };
  //   }
  // },
  // computed: {
  //   articleData() {
  //     return this.$store.state.article.articleAll;
  //   },
  //   typeMark() {
  //     return this.$store.state.article.typeMark;
  //   }
  // },
  created() {
    // this.$store.commit("setType", this.type);
    this.getArticle();
  },
  // watch: {
  //   articleData() {
  //     this.getArticle();
  //   },
  //   typeMark() {
  //     this.getArticle();
  //   }
  // },
  methods: {
    getArticle() {
      // let data = this.$store.getters.getTypeArticle(this.pageNo, this.pageSize);
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      data.type = this.type;
      this.$axios
        .get(this.$url + "/zll/article/list", { params: data })
        .then(res => {
          if (res.data.result) {
            this.contentData = res.data.list.map(item => {
              item.keywords = item.keywords.split("、").filter(item => {
                return item !== "";
              });
              item.publishTime = item.publishTime.slice(0, 10);
              return item;
            });
            this.total = res.data.count;
          } else {
            this.$Message["error"]({
              background: true,
              content: "数据加载失败！呜呜~"
            });
          }
          this.$store.commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
        });

      // if (data) {
      //   this.contentData = data.list;
      //   this.total = data.total;
      // }
    },
    changePage(event) {
      this.pageNo = event;
      this.getArticle();
      // goBack();
    },
    changeSizePage(event) {
      this.pageSize = event;
      this.getArticle();
      // goBack();
    },
    //跳转到详情页
    handleLook(bid) {
      // 将bid存储到store中

      // this.$store.commit("setBid", bid);
      // if (!isStatic) {
      this.$router.push({ path: "/detail", query: { id: bid } });
      // } else {
      //   window.location.href = this.URL + bid;
      // }
    },
    //跳转到 demo 页
    handleHerf(herf) {
      window.open(this.$url + "/" + herf);
    },
    // 展示demo
    // handleClose(herf) {
    //   window.open(this.$url + "/" + herf);
    //   // this.isCarousel = !this.isCarousel;
    //   // this.isCarouselBgc = this.isCarousel;
    //   // if (herf) {
    //   //   this.herf = this.$url + "/" + herf;
    //   // }
    //   // if (!this.isCarousel) {
    //   //   let time = setTimeout(() => {
    //   //     this.isCarouselBgc = false;
    //   //     clearTimeout(time);
    //   //   }, 350);
    //   // }
    // },
    // 获取随机颜色
    getRandomColor() {
      return (
        "#" +
        ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(
          -6
        )
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.works {
  > div {
    width: 100%;
  }
}
.warp {
  padding: 20px;
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    background-color: #fff;
    margin: 5px;
    border: 1px solid #eee;
    border-radius: 3px;
    overflow: hidden;
    padding: 5px;
    // padding-bottom: 20px;
    // box-shadow: 0 0 10px #999;
    //  transform: scale(1);
    > div {
      position: relative;
      .title {
        background: rgba(255, 255, 255, 0.8);
        transition: all 0.3s ease;
        position: absolute;
        padding: 0 18px;
        padding-bottom: 20px;
        bottom: -15px;
        width: 100%;
        transform: translate(0, 25px);
        h5 {
          margin-bottom: 10px;
        }
      }
      > a {
        p {
          position: absolute;
          transition: all 0.3s ease;
          transform: scale(0);
          opacity: 0;
          left: 50%;
          top: 50%;
          margin: -38px 0 0 -70px;
          span {
            border: 1px solid #fff;
            border-radius: 5px;
            background-color: rgba(253, 252, 252, 0.1);
            color: #45b6f7;
            padding: 6px 20px;
          }
          span:nth-child(1) {
            margin-right: 5px;
            color: #fff;
            background-color: #2db7f5;
          }
          span:nth-child(2) {
            // margin-right: 5px;
            color: #fff;
            background-color: #19be6b;
          }
        }
      }
    }
    > div:hover {
      .title {
        transform: translate(0, -5px);
        background: rgba(255, 255, 255, 0.9);
      }
      > a {
        p {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
    .t-orange {
      margin: 0 2px;
    }
    a {
      height: 100%;
      img {
        display: block;
        width: 268px;
        height: 200px;
      }
    }

    h5 {
      font-weight: bold;
      margin-right: 3px;
      color: #666;
      margin-top: 10px;
    }

    small {
      color: #999;
    }
    .wall-lines {
      overflow: hidden;
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  // li:hover {
  //   transform: scale(1.05);
  // }
}
.box-bj-sd {
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 3px;
  padding: 10px;
}
.content-box {
  border-radius: 3px;
}
.tag {
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
}

.tag li {
  margin: 10px 12px;
  border: 0;
}

.tag li a {
  display: flex;
  padding: 7px 14px;

  font-size: 13px;
  border-radius: 5px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.12);
  color: #666;
  // background-color: #ccc;
  transition: all 0.3s ease;
}

.tag li a:hover {
  opacity: 1 !important;
  transform: scale(1.1);
}
.bgc {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  // opacity: 0.5;
  z-index: 100;
}
.click-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 102;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .carousel-warp {
    margin-top: 20px;
    z-index: 500;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px #fff;
    margin: auto;
    border: 2px solid #fff;
    position: relative;
    border-radius: 5px;
    background: #fff;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  .zl-close {
    position: absolute;
    z-index: 1000;
    right: 10px;
    top: 10px;
    font-size: 30px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .fa-pulse {
    position: absolute;
    font-size: 28px;
    left: 50%;
    top: 50%;
  }
  .ivu-icon:hover {
    transform: scale(1.1);
    color: red;
  }
}
.ivu-page {
  margin: 10px 0px;
}
</style>
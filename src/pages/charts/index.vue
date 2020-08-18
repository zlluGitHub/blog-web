<template>
  <div>
    <div>
      <div class="box-bj-sd">
        <h3 class="h3-style">
          <i class="fa fa-tags"></i>图谱分类
        </h3>
        <ul class="tag">
          <li @click="handleQuery('')" :class="!type?'active':''">
            <a
              :style="'border:1px solid '+ getRandomColor()+';'"
              href="javascript:void(0);"
            >全部（{{count}}）</a>
          </li>
          <li
            v-for="(item,i) in typeArr"
            :key="i+'w'"
            @click="handleQuery(item.type)"
            :class="type===item.type?'active':''"
          >
            <a
              :style="'border:1px solid '+ getRandomColor()+';'"
              href="javascript:void(0);"
            >{{item.type}}（{{item.count}}）</a>
          </li>
        </ul>
      </div>

      <div class="web-box" v-if="content.length">
        <div class="content">
          <div class="item" v-for="item in content" :key="item.bid">
            <div class="img-warp">
              <div class="img-box">
                <img :src="$url+'/'+item.imgSrc" />
                <div class="jieshi">
                  <span class="isBj">{{item.title}}</span>
                </div>
                <div class="shade">
                  <p>
                    <a href="javascript:void(0);" @click="handleRouter(item.bid)">浏览编辑</a>
                  </p>
                </div>
              </div>
              <div class="edit">
                <span>
                  <i class="fa fa-calendar"></i>
                  {{item.date.slice(0,10)}}
                </span>
                <span>
                  <i class="fa fa-eye"></i>
                  {{item.look}}
                </span>
                <span>
                  <i class="fa fa-cubes"></i>
                  {{item.type}}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Page
          show-total
          @on-change="changePage"
          @on-page-size-change="changeSizePage"
          :page-size-opts="pageSizeOpts"
          :page-size="limit"
          :total="total"
          show-sizer
        />
        <!-- <div class="load-more" @click="handleMore">
          <p>
            <Icon type="ios-arrow-dropdown" size="18" />
            <span>加载更多</span>
            <Icon type="ios-arrow-dropdown" size="18" />
          </p>
        </div>-->
        <!-- <div v-else class="load-more">
        <p>
          <span>没有更多啦！</span>
        </p>
        </div>-->
      </div>
      <div v-else class="web-box demo-spin-col">
        <i class="fa fa-spinner fa-pulse"></i>
      </div>
      <Modal v-model="isChartEditor" footer-hide fullscreen :closable="false">
        <Charteditor :id="bid" @on-change="onChange" />
      </Modal>
    </div>
  </div>
</template>
<script>
// import { URL } from "../constant/constant.js";
import Charteditor from "../charteditor";
export default {
  name: "subunit",
  components: {
    Charteditor,
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 15,
      count: 0,
      total: 0,
      pageSizeOpts: [15, 30, 45, 60, 75],
      limit: 15,
      // URL: process.env.baseUrl + "/zllublogAdmin/",
      isChartEditor: false,
      bid: "",
      content: [],
      typeArr: [],
    };
  },
  // computed: {
  //   getShareData() {
  //     return this.$store.getters.getShareData;
  //   }
  // },
  // watch: {
  //   getShareData(value) {
  //     this.data = value;
  //   }
  // },
  created() {
    this.$axios
      .get(this.$url + "/zll/subunit/chart/type")
      .then((res) => {
        if (res.data.result) {
          this.typeArr = res.data.type;
          this.count = res.data.count;
        } else {
          this.$Message["error"]({
            background: true,
            content: "数据请求失败！",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    this.handleQuery();
  },
  mounted() {},
  methods: {
    handleQuery(val) {
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
      this.type = val;
      if (val) {
        data.type = this.type;
      }

      this.$axios
        .get(this.$url + "/zll/subunit/chart", { params: data })
        .then((res) => {
          if (res.data.result) {
            this.content = res.data.list;
            this.total = res.data.total;
          } else {
            this.$Message["error"]({
              background: true,
              content: "数据加载失败！呜呜~",
            });
          }
          this.$event.emit("inLoading", false);
          let time = window.setTimeout(() => {
            window.clearTimeout(time);
            this.$event.emit("pageLoading", false);
          }, this.$loadingTime);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取随机颜色
    getRandomColor() {
      return (
        "#" +
        ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(
          -6
        )
      );
    },
    //路由跳转
    handleRouter(bid) {
      this.bid = bid;
      this.isChartEditor = !this.isChartEditor;
      // this.$router.push({
      //   path: "charteditor",
      //   query: { bid }
      // });
    },
    onChange(val) {
      this.isChartEditor = val;
    },

    changePage(event) {
      this.pageNo = event;
      this.handleQuery();
      this.$goBack();
    },
    changeSizePage(event) {
      this.pageSize = event;
      this.handleQuery();
      this.$goBack();
    },
  },
  beforeDestory() {
    // this.$event.emit("inLoading", false);
  },
};
</script>

<style lang="scss" scoped>
.active {
  a {
    color: #fff !important;
    background-color: #19be6b;
    border: 0 !important;
  }
}
.box-bj-sd {
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 3px;
  padding: 10px;
}
.tag {
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
}

.tag li {
  margin: 10px 12px;
}

.tag li a {
  display: flex;
  padding: 5px 15px;
  font-size: 12px;
//   border-radius: 5px;
//   box-shadow: 0 3px 5px rgba(0, 0, 0, 0.12);
  color: #666;
  // background-color: #ccc;
  transition: all 0.3s ease;
}

.tag li a:hover {
  opacity: 1 !important;
  transform: scale(1.1);
}

.load-more {
  text-align: center;
  padding: 15px 16px;
  margin-bottom: 20px;
  margin-top: 10px;
  border-top: 1px solid #eee;
  cursor: pointer;
  span {
    font-size: 15px;
    margin: 0 5px;
  }
}
.load-more:hover {
  color: #19be6b;
}
.content {
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 8px;
    width: 278px;
  }
  .img-warp {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.12);
    transition: all 0.3s;
    border-radius: 3px;
    .img-box {
      position: relative;
      display: flex;
      width: 100%;
      height: 170px;
      padding: 2px;
      cursor: pointer;
      align-items: center;
      overflow: hidden;
      img {
        width: 100%;
        // border: 1px solid #dfdfdf;
      }
      .shade p {
        position: absolute;
        top: 0px;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 50px;
        transition: all 0.3s ease;
        a {
          color: #fff;
          border: 1px solid #fff;
          border-radius: 5px;
          padding: 5px 12px;
          z-index: 10;
          transition: all 0.3s ease;
          transform: scale(0);
          margin: 18px;
          background: #2db7f5;
        }
      }
      .shade:hover p {
        background: rgba(253, 252, 252, 0.2);
        a {
          transform: scale(1);
        }
      }
      .jieshi {
        position: absolute;
        bottom: 0px;
        width: 100%;
        text-align: center;
        padding: 10px;
        background: rgba(0, 0, 0, 0);
        transition: all 0.2s ease;
        color: #fff;
        transform: translate(0, 42px);
        .isBj {
          cursor: pointer;
        }
      }
    }
  }
  .img-warp:hover {
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.24), 0 0 8px rgba(0, 0, 0, 0.12);
    .img-box {
      .jieshi {
        background: rgba(0, 0, 0, 0.6);
        border-top: 1px solid #efefef;
        transform: translate(0, 0px);
      }
    }
  }

  .edit {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #efefef;
    padding: 10px;
    font-size: 14px;
    color: #aaa;
    span {
      // color: #fff;
      overflow: hidden;
      i {
        margin-right: 5px;
      }
    }
  }
}
/deep/ .ivu-modal-body {
  padding: 0;
}
</style>

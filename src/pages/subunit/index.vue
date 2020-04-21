<template>
  <div>
    <div>
      <div class="whitebg lanmu">
        <img src="../../assets/image/web.jpg" />
        <h1>{{type}}</h1>
        <p>此版块主要汇集自己在项目开发中用到的组件，其中包括与 Vue、React、jQuery 相关的组件以及常用的 UI 组件等等。</p>
      </div>
      <div class="web-box" v-if="contentData.length">
        <div class="content">
          <div v-for="item in contentData" :key="item.bid" class="item">
            <div class="img-warp">
              <div class="img-box" @click="handleTo(item.bid)">
                <img :src="$url+'/'+item.imgSrc" />
              </div>
              <div class="jieshi">
                <div>
                  <span class="isBj">{{item.title}}</span>
                </div>
                <p>
                  <span>{{item.description}}</span>
                </p>
              </div>
              <div class="edit">
                <span>
                  <i class="fa fa-calendar"></i>
                  <span>{{item.publishTime}}</span>
                </span>
                <span>
                  <i class="fa fa-eye"></i>
                  <span>{{item.viweNum}}</span>
                </span>
                <span>
                  <i class="fa fa-cubes"></i>
                  <span>{{item.keywords}}</span>
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
          :total="count"
          show-sizer
        />
      </div>
      <div class="web-box demo-spin-col" v-else>
        <i class="fa fa-spinner fa-pulse"></i>
      </div>
    </div>
  </div>
</template>
<script>
// import { URL } from "../constant/constant.js";
export default {
  name: "subunit",
  data() {
    return {
      pageNo: 1,
      pageSize: 12,
      count: 0,
      pageSizeOpts: [12, 24, 36, 48, 60],
      limit: 12,
      contentData: [],
      type: "常用组件"
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
    this.getArticle();
  },

  methods: {
    getArticle() {
      let data = {};
      data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      data.type = this.type;
      this.$axios
        .get(this.$url + "/zll/article/list", { params: data })
        .then(res => {
          if (res.data.result) {
            let data = res.data.list;
            this.contentData = data.map(item => {
              item.publishTime = item.publishTime.slice(0, 10);
              return item;
            });
            this.count = res.data.count * 1;
          } else {
            this.$Message["error"]({
              background: true,
              content: "数据加载失败！呜呜~"
            });
          }
                    this.$event.emit("inLoading", false);
       	let time = window.setTimeout(() => {
							window.clearTimeout(time);
							this.$event.emit("pageLoading", false);
						}, this.$loadingTime);
        })
        .catch(error => {
          console.log(error);
        });
    },
    changePage(event) {
      this.pageNo = event;
      this.getArticle();
      this.$goBack();
    },
    changeSizePage(event) {
      this.pageSize = event;
      this.getArticle();
      this.$goBack();
    },
    //标签跳转
    handleTo(bid) {
      this.$router.push({ path: "/detail", query: { id: bid } });
      // 返回顶部
      this.$goBack();
    }
  }
};
</script>

<style lang="scss" scoped>
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

.content {
  display: flex;
  flex-wrap: wrap;
  .item {
    margin: 8px;
    width: 279px;
  }
  .img-warp {
    position: relative;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.12);
    transition: all 0.3s;
    border-radius: 3px;
    .img-box {
      display: flex;
      width: 100%;
      height: 200px;
      padding: 2px;
      cursor: pointer;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
        // border: 1px solid #dfdfdf;
      }
    }
  }
  .img-warp:hover {
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.24), 0 0 8px rgba(0, 0, 0, 0.12);
  }
  .jieshi {
    height: 90px;
    padding: 10px;
    border-top: 1px solid #efefef;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    > p {
      color: #999;
      margin-top: 9px;
    }
    > div {
      .isBj {
        display: block;
        font-size: 16px;
        // cursor: pointer;
        color: #19be6b;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
    }
  }
  .edit {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #efefef;
    padding: 10px;
    font-size: 12px;
    color: #aaa;
    span {
      // color: #fff;
      i {
        margin-right: 5px;
      }
    }
  }
}

</style>

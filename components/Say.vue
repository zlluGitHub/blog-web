<template>
  <div>
    <div class="say-box box-bj-sd">
      <h1>微语记录</h1>
      <div v-if="sayList.length!==0">
        <ul class="twiter" v-for="(item,index) in sayList" :key="index">
          <li>
            <div class="comments">
              <div class="comment">
                <img :src="$url+'/'+item.authorUrl" alt="logo" width="50" height="50" />
                <div class="comment-body">
                  <div class="text">
                    <div v-html="item.content"></div>
                    <p class="twiter_info">
                      <i class="fa fa-user"></i>
                      <span class="twiter_author">{{item.author}}</span>
                      <time class="twiter_time">
                        <i class="fa fa-clock-o"></i>
                        {{item.sendTime.slice(0,10)}}
                      </time>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <Page
          show-total
          @on-change="changePage"
          @on-page-size-change="changeSizePage"
          :total="total"
          show-sizer
          :page-size-opts="[15,30,45,60,75]"
          :page-size="pageSize"
        />
      </div>
      <div v-else class="demo-spin-col" span="8">
        <Spin fix>
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
    </div>
  </div>
</template>
<script>
// import { URL } from "../constant/constant.js";
// import { goBack } from "../assets/gloable.js";
export default {
  name: "say",
  data: () => ({
    // URL: process.env.baseUrl + "/zllublogAdmin/",
    sayList: [],
    content: [],
    pageNo: 1,
    pageSize: 15,
    total: 0
  }),
  // props: ["content"],
  // watch: {
  //   data(value) {
  //     this.getSay(value);
  //   }
  // },
  created() {
    this.getSay();
  },
  methods: {
    getSay() {
      let data = null;
      if (this.pageNo !== 1 || this.pageSize !== 15) {
        data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };
      };

      this.$axios
        .get(this.$url + "/zll/say", { params: data })
        .then(res => {
          if (res.data.result) {
            this.sayList = res.data.list;
            this.total = res.data.count;
          }
          // this.$store.commit("setShareData", res.data.list);
        })
        .catch(error => {
          console.log(error);
        });
      // this.content = data;
      // this.sayList = data.slice(0, 15);
      // this.total = data.length;
    },
    changePage(event) {
      this.pageNo = event;
      this.getSay();
      // this.changeList(this.pageNo, this.pageSize);
      // 返回顶部
      this.$goBack();
    },
    changeSizePage(event) {
      this.pageSize = event;
      this.getSay();
      // this.changeList(this.pageNo, this.pageSize);
      // 返回顶部
      this.$goBack();
    }
    // changeList(pageNo, pageSize) {
    //   let start = pageNo,
    //     end = pageSize;
    //   if (pageNo > 0) {
    //     start = (pageNo - 1) * pageSize;
    //     end = start + pageSize;
    //   }
    //   this.sayList = this.content.slice(start, end);
    // }
  }
};
</script>
<style lang="scss" scoped>
.say-box {
  padding: 20px;
  border-radius: 3px;
  background-color: #fff;
  padding-bottom: 0px;
  h1 {
    font-family: "楷体";
    color: #666;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 32px;
    padding: 12px 0;
    padding-bottom: 30px;
    border-bottom: 1px solid #ddd;
  }

  ul.twiter {
    overflow: hidden;
    margin: 0 0;

    li {
      margin-left: 14px;
      .comments:before {
        content: "";
        position: absolute;
        top: 0px;
        left: 80px;
        width: 2px;
        top: -20px;
        bottom: -20px;
        background: rgba(0, 0, 0, 0.1);
      }
      .comments {
        position: relative;
        .comment:before {
          content: "";
          position: absolute;
          top: 13px;
          left: 82px;
          width: 10px;
          height: 10px;
          border: 3px solid #fff;
          border-radius: 100%;
          margin: 16px 0 0 -6px;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
            inset 0 1px 1px rgba(0, 0, 0, 0.1);
          background-color: #ccc;
        }
        .comment {
          overflow: hidden;
          padding: 0 0 1em;
          word-wrap: break-word;
          padding: 10px;
          padding-top: 21px;
          padding-bottom: 0px;
          img {
            float: left;
            margin-right: 30px;
            border-radius: 100%;
            overflow: hidden;
            box-shadow: 0px 0px 15px 1.5px #ccc;
            transform: translate(0, -10px);
            z-index: 100;
            transform: rotate(0);
            transition: transform 0.5s ease-in;
          }
          .comment-body {
            .text:before {
              content: "";
              position: absolute;
              top: 30px;
              left: 96px;
              width: 9px;
              height: 9px;
              border-width: 0 0 1px 1px;
              border-style: solid;
              border-color: #e5e5e5;
              background: #fff;
              transform: rotate(45deg);
            }
            .text {
              padding: 10px;
              color: #666;
              margin-left: 90px;
              border: 1px solid #e5e5e5;
              border-radius: 3px;
              font-size: 14px;
              background: #fff;
              .twiter_info {
                margin-top: 10px;
                margin-left: 5px;
                font-size: 12px;
                color: #989595;
                time {
                  margin-left: 15px;
                }
                i {
                  margin-right: 6px;
                }
              }
            }
          }
        }
      }
    }
  }
  ul.twiter:hover li .comment img {
    transform: rotate(360deg);
  }
  ul.twiter:hover li .comment:before {
    background-color: #666;
  }
}
.page {
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
</style>

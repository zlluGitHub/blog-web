<template>
  <div class="word box-bj-sd">
    <div class="massage public">
      <span>我要评论</span>
      <p class="email-span">
        <span>下述电子邮件地址不会被公开,只作为博主回复联系方式!</span>
      </p>
    </div>
    <div class="comments-box">
      <div class="comments-img">
        <img :src="URL+imgUrl" />
      </div>
      <div class="inner">
        <div class="input-box">
          <label>
            <Input
              prefix="ios-contact"
              v-model="name"
              placeholder="请输入您的称呼..."
              class="input-width"
            />
          </label>
          <label>
            <Input prefix="ios-mail" v-model="email" placeholder="请输入您的邮箱..." class="input-width" />
          </label>
          <label>
            <Input prefix="ios-mail" v-model="phone" placeholder="请输入您的网址..." class="input-width" />
          </label>
        </div>
        <div class="comments-warp">
          <textarea
            class="textarea"
            v-model="content"
            placeholder="客官，来都来了，怎么也不留个脚印呢，有什么想说的，尽情畅言吧..."
          ></textarea>
          <div class="comments-textarea">
            <span class="submit" @click="handlePublic">发布</span>
          </div>
        </div>
      </div>
    </div>
    <div class="massage">
      <span>评论内容</span>
      <p>
        <span>{{total}}</span>条评论
      </p>
    </div>
    <div v-if="replyData.length!==0">
      <div class="leave-list">
        <ul>
          <li v-for="item in replyData" :key="item.name">
            <div class="list">
              <img :src="URL+item.url" alt="头像" />
              <div class="text-box">
                <div class="user-name">
                  <h3>{{item.name}}</h3>
                  <div>
                    <span>发布于：</span>
                    {{item.time.slice(0,10)}}
                  </div>
                </div>
                <div class="text">{{item.content}}</div>
                <!-- <div class="repy">
                <span>回复</span>
                <span>点赞</span>
                </div>-->
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="page">
        <Page
          show-total
          @on-change="changePage"
          @on-page-size-change="changeSizePage"
          :total="total"
          show-sizer
        />
      </div>
    </div>
    <div v-else class="leave-list tip">暂无评论内容</div>
  </div>
</template>
<script>
// import { URL } from "../constant/constant.js";
// import { dateTime, getUrl, checkEmail } from "../assets/gloable.js";
// import Qs from "qs";
export default {
  name: "viwephotos",
  data: () => ({
    URL: "URL",
    imgUrl: "getUrl()",
    replyData: [],
    total: 0,
    content: "",
    email: "",
    name: "",
    time: " dateTime()",
    mark: true,
    pageNo: 0,
    pageSize: 10,
    artBid: "",
    artTitle: "",
    url: "getUrl()"
  }),
  props: ["word"],
  watch: {
    word(value) {
      // this.artBid = value;
      // this.getReplyData();
    }
  },
  created() {
    // this.artBid = this.bid;
    // this.getReplyData();
  },
  methods: {
    getReplyData() {
      const _this = this;
      //初始化数据
      this.axios
        .get(URL + "commentArticle/get.commentArticle.php", {
          params: {
            uid: _this.artBid
          }
        })
        .then(function(res) {
          if (res.data) {
            //  _this.replyData = res.data.list;
            let data = res.data.list;
            let list = [];
            for (let index = 0; index < data.length; index++) {
              if (data[index].isIssue === "yes") {
                list.push(data[index]);
              }
            }
            _this.replyData = list;
            _this.total = list.length;
            _this.$store.dispatch("getArticleReplyData", list);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changePage(event) {
      this.replyData = this.$store.getters.getArticleReplyPage(
        event,
        this.pageSize
      );
    },
    changeSizePage(event) {
      this.replyData = this.$store.getters.getArticleReplyPage(
        this.pageNo,
        event
      );
    },
    handlePublic() {
      if (this.name === "") {
        this.$Modal.info({
          title: "温馨提示",
          content: "请输入您的称呼！"
        });
      } else if (!this.email) {
        this.$Modal.info({
          title: "温馨提示",
          content: "请输入您的邮箱地址！"
        });
      } else if (!checkEmail(this.email)) {
        this.$Modal.info({
          title: "温馨提示",
          content: "邮箱格式不正确！"
        });
      } else if (!this.content) {
        this.$Modal.info({
          title: "温馨提示",
          content: "请输入评论内容！"
        });
      } else {
        const _this = this;
        if (this.mark) {
          this.$Message.loading({
            content: "数据正在提交...",
            duration: 0
          });
          this.mark = false;
          let data = {
            name: this.name,
            content: this.content,
            email: this.email,
            uid: this.artBid,
            url: this.url,
            time: this.time,
            title: this.artTitle
          };
          this.axios
            .post(
              URL + "commentArticle/add.commentArticle.php",
              Qs.stringify(data)
            )
            .then(function(res) {
              _this.name = "";
              _this.content = "";
              _this.email = "";
              _this.$Message.destroy();
              _this.$Message.success("留言提交成功！");
              _this.mark = true;
              _this.getReplyData();
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.$Message.error("数据正在提交...");
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.word {
  padding: 15px;
  .comments-box {
    margin: 10px;
    display: flex;
    .comments-img {
      margin-right: 10px;
      img {
        display: block;
        width: 100px;
        height: 100px;
        border-radius: 12px;
      }
    }
    .inner {
      flex-grow: 1;
    }
    .comments-warp {
      width: 100%;
      border: 1px solid #eee;
      border-radius: 5px;

      textarea {
        width: 97%;
        margin: 10px 1.5% 0;
        height: 95px;
        font-size: 14px;
        border-radius: 5px;
        border: none;
        color: #333;
        resize: none;
        overflow: auto;
        outline: 0;
      }
      .comments-textarea {
        width: 100%;
        bottom: 2px;
        font-size: 14px;
        border-top: 1px solid #eee;
        overflow: hidden;
        span.submit {
          float: right;
          display: inline-block;
          border: none;
          width: 60px;
          text-align: center;
          color: #999;
          padding: 7px;
          margin-right: 5px;
          line-height: 2;
          border-left: 1px solid #eee;
          cursor: url("../assets/image/b.png"), auto;
        }
      }
    }
  }
  .page {
    display: flex;
    padding: 20px;
    justify-content: center;
    border-top: 1px solid #eee;
  }
  .massage {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-family: Georgia;
    p {
      span {
        color: #d32;
        font-size: 12px;
        padding-right: 2px;
      }
    }
  }
  .public {
    // margin-top: 30px;
    border-bottom: 1px solid #eee;
    margin-bottom: 25px;
  }
  .leave-list {
    ul {
      color: #666;
      li {
        .list {
          display: flex;
          border-top: 1px solid #eee;
          padding-bottom: 3px;
          padding-top: 10px;
          padding-right: 20px;
          padding-left: 20px;
          margin-top: 10px;
          margin-bottom: 20px;
          img {
            width: 50px;
            height: 50px;
            border-radius: 10px;
          }
          .text-box {
            width: 92%;
            font-size: 13px;
            color: #666;
            margin-left: 12px;
            .user-name {
              display: flex;
              justify-content: space-between;
              h3 {
                margin: 0px;
                font-size: 16px;
                color: #d32;
                font-weight: 600;
              }
              div {
                margin-left: 10px;
              }
            }

            .text {
              padding: 5px 0px;
            }
            .repy {
              text-align: right;
            }
          }
        }
        .left {
          margin-left: 30px;
        }
      }
    }
  }
  .tip {
    text-align: center;
    color: #666;
    padding: 30px;
    border-top: 1px solid #eee;
  }
  textarea::-webkit-input-placeholder {
    color: #aab2bd;
    font-size: 12px;
  }
  .input-box {
    display: flex;
    padding-bottom: 12px;
    justify-content: space-between;
    label {
      flex-grow: 1;
      margin-right: 30px;
    }
    label:nth-child(3) {
      margin-right: 0px;
    }
  }
}
</style>

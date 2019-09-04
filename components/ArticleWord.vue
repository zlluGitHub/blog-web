<template>
  <div class="word box-bj-sd">
    <div class="massage public">
      <span>发表评论</span>
      <!-- <p class="email-span">
        <span>下述邮件地址不会被公开，只作为回复时的联系方式！</span>
      </p>-->
    </div>
    <div class="comments-box">
      <div class="comments-img">
        <!-- <img :src="URL+imgUrl" /> -->
        <img :src="imgUrl" />
      </div>
      <div class="inner" @click="makeFaceClose">
        <div class="input-box">
          <label>
            <Input
              prefix="ios-contact"
              v-model="name"
              placeholder="请输入您的称呼..."
              class="input-width"
            />
            <i>*</i>
          </label>
          <label>
            <Input prefix="ios-mail" v-model="email" placeholder="请输入您的邮箱..." class="input-width" />
            <i>*</i>
          </label>
        </div>
        <div class="comments-warp">
          <div class="publish_container">
            <p contenteditable="true" id="input_conta"></p>
          </div>
          <div class="comments-textarea">
            <!-- 表情容器 ，包裹生成的表情，绑定点击表情事件-->
            <div class="face-warp">
              <i @click.stop="makeFace" :class="isFaceShow?'i1':'i2'"></i>
              <span>表情</span>
              <transition name="show-face">
                <div
                  id="face"
                  class="box-bj-sd"
                  v-show="isFaceShow"
                  @click.stop="choiceFace($event)"
                >
                  <img v-for="(itemIcon,ind) in arrIcon" :src="itemIcon.name" :key="ind+'icon'" />
                </div>
              </transition>
            </div>
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
              <!-- <img :src="URL+item.url" alt="头像" /> -->
              <img :src="imgUrl" />
              <div class="text-box">
                <div class="user-name">
                  <h3>{{item.name}}</h3>
                  <div>
                    <span>发布于：</span>
                    {{item.time.slice(0,10)}}
                  </div>
                </div>
                <div class="text" v-html="item.content"></div>
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
import { dateTime, getUrl, checkEmail, icon } from "../assets/js/globle";
// import Qs from "qs";
export default {
  name: "viwephotos",
  data: () => ({
    isFaceShow: false,
    content: "",
    replyData: [],
    total: 0,
    email: "",
    name: "",
    webUrl: "",
    URL: process.env.baseUrl + "/zllublogAdmin/",
    arrIcon: [],
    imgUrl: process.env.baseUrl + "/zllublogAdmin/images/headimg/mo.jpg",
    //--------------------

    time: dateTime(),
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
    this.artBid = this.bid;

    this.artBid = this.$route.params.bid;

    this.getReplyData();
    this.handleIcon();
  },
  methods: {
    handleIcon() {
      this.arrIcon = icon.map(item => {
        // item.name = "https://zhenglinglu.cn/staticimg/icon/" + item.name;
        return {
          name: "https://zhenglinglu.cn/staticimg/icon/" + item.name
        };
      });
    },
    makeFaceClose() {
      this.isFaceShow = false;
    },
    makeFace() {
      this.isFaceShow = !this.isFaceShow; //显示表情容器
      if ($("#face>img").length == 0) {
        //动态生成表情，如果现在没有表情则生成
        for (var i = 1; i <= 75; i++) {
          //根据表情文件数量决定循环次数，这里为75个表情
          $("#face").append('<img src="/static/arclist/' + i + '.gif">'); //为表情容器里添加IMG标签，并赋予src值，路径为表情文件所在路径
        }
      }
    }, // 选择表情并插入到输入框
    choiceFace(e) {
      if (e.target.nodeName == "IMG") {
        var choice = e.target;
        var cEle = choice.cloneNode(true); //深度复制，复制节点下面所有的子节点 ，直接将整个表情的IMG标签复制，并添加到发布框的<p></p>里面
        $("p#input_conta").append(cEle);
      }
    },
    getReplyData() {
      // const _this = this;
      //初始化数据
      console.log(this);

      this.$axios
        .get(this.URL + "commentArticle/get.commentArticle.php", {
          params: {
            uid: this.artBid
          }
        })
        .then(res => {
          if (res.data) {
            //  _this.replyData = res.data.list;
            let data = res.data.list;
            let list = [];
            for (let index = 0; index < data.length; index++) {
              if (data[index].isIssue === "yes") {
                list.push(data[index]);
              }
            }
            this.replyData = list;
            this.total = list.length;
            // _this.$store.dispatch("getArticleReplyData", list);
          }
        })
        .catch(error => {
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
      var text = $("#input_conta").html(); //获得发布框的文本内容，表情会以整个img标签文本显示

      this.content = text;
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
        let data = {
          name: this.name,
          content: this.content,
          email: this.email,
          url: this.webUrl,
          uid: this.artBid,
          time: this.time,
          title: this.artTitle
        };
        console.log(data);

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
            url: this.webUrl,
            uid: this.artBid,
            time: this.time,
            title: this.artTitle
          };
          this.$axios
            .post(
              this.URL + "commentArticle/add.commentArticle.php",
              this.$qs.stringify(data)
            )
            .then(res => {
              this.name = "";
              // this.content = "";
              this.email = "";
              this.webUrl = "";
              $("#input_conta").html(""); //清除发布框的文本内容
              this.$Message.destroy();
              this.$Message.success("留言提交成功！");
              this.mark = true;
              this.getReplyData();
            })
            .catch(errr => {
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
  .show-face-enter-active {
    transition: all 0.25s ease-in;
  }
  .show-face-enter,
  .show-face-leave-to {
    /* transform: scale(0.9); */
    opacity: 0;
    margin-top: -6px;
  }
  .show-face-enter-to,
  .show-face-leave {
    opacity: 1;
    /* transform: scale(1); */
    margin-top: 0px;
  }
  .comments-box {
    margin: 10px;
    display: flex;
    .comments-img {
      margin-right: 10px;
      img {
        display: block;
        width: 60px;
        height: 60px;
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

      .comments-textarea {
        width: 100%;
        bottom: 2px;
        font-size: 15px;
        border-top: 1px solid #eee;
        // overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .submit {
          border: none;
          cursor: pointer;
          text-align: center;
          color: #888;
          padding: 8px 20px;
          border-left: 1px solid #eee;
          // cursor: url("../assets/image/b.png"), auto;
        }
        .submit:hover {
          color: #33aba0;
          // cursor: url("../assets/image/b.png"), auto;
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
    span {
      font-weight: bold;
      font-size: 16px;
    }
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
          > img {
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
  // .textarea::-webkit-input-placeholder {
  //   color: #aab2bd;
  //   font-size: 12px;
  // }
  .input-box {
    display: flex;
    padding-bottom: 12px;
    justify-content: space-between;
    label {
      flex-grow: 1;
      margin-right: 30px;
      position: relative;
      i {
        position: absolute;
        right: 10px;
        top: 7px;
        color: #d32;
      }
    }
    label:nth-child(3) {
      margin-right: 0px;
    }
  }
  .publish_container {
    > p {
      padding: 10px;
      min-height: 100px;
      border-style: none; /*  此步是必须的  */
    }
    img{
      width: 28px;
      height: 28px;
    }
  }
  .face-warp {
    position: relative;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      margin-left: 5px;
    }
    > i {
      display: block;
      width: 20px;
      height: 20px;
      margin-left: 10px;
      cursor: pointer;
    }
    > .i2 {
      background: url("../assets/image/fi1.png") no-repeat;
      background-size: 100%;
    }
    > .i1 {
      background: url("../assets/image/fihover.png") no-repeat;
      background-size: 100%;
    }
    > #face::after {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      top: -7px;
      left: 15px;
      border-color: #e5e5e5;
      border-style: solid;
      border-width: 1px 0 0 1px;
      background: #fff;
      transform: rotate(45deg);
      transition: opacity 0.3s ease-in;
    }
    > #face {
      position: absolute;
      top: 36px;
      left: 0;
      z-index: 10;
      padding: 10px;
      width: 480px;
      border-radius: 5px;
      background-color: #fff;
      border: 1px solid #ddd;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.17);
      transition: all 0.3s ease;
      img {
        float: left;
        margin: 5px;
        width: 28px;
        height: 28px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      img:hover {
        transform: scale(1.3);
      }
    }
  }
}
// .text {
//   img {
//     display: inline-block;
//     width: 25px;
//     width: 25px;
//   }
// }
</style>

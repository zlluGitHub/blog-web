<template>
  <div class="word">
    <!-- 输入框开始 -->
    <div class="comments-box">
      <div class="comments-img">
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
          <label>
            <Input prefix="md-at" v-model="webUrl" placeholder="请输入您的网址..." class="input-width" />
          </label>
        </div>
        <div class="comments-warp">
          <!-- 发布内容输入框，利用Html5的新属性contenteditable，实现可编辑文本 ，会自动将插入的IMG标签解析-->
          <div class="publish_container">
            <p contenteditable="true" id="input_conta"></p>
          </div>
          <div class="comments-textarea">
            <!-- 表情容器 ，包裹生成的表情，绑定点击表情事件-->
            <div class="face-warp">
              <i @click.stop="makeFace" :class="isFaceShow?'i1':'i2'"></i>
              <transition name="show-face">
                <div
                  id="face"
                  class="box-bj-sd"
                  v-show="isFaceShow"
                  @click.stop="choiceFace($event)"
                >
                  <img v-for="(itemIcon,ind) in arrIcon" :src="itemIcon.name" :key="ind+'icons'" />
                </div>
              </transition>
            </div>
            <span class="submit" @click="handlePublic">发布</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 输入框结束 -->
    <div class="massage">
      <span>留言内容</span>
      <p>
        <span>{{total}}</span>条评论
      </p>
    </div>
    <div v-if="sayList.length!==0">
      <div class="leave-list">
        <ul>
          <li v-for="(ele,i) in sayList" :key="'box'+i">
            <div
              v-for="(item,index) in ele.data"
              :key="item.bid+index"
              class="list"
              :style="'margin-left:'+(item.depth-1)*60+'px'"
            >
              <!-- <img :src="URL+item.url" alt="头像" /> -->
              <img :src="imgUrl" />
              <div class="text-box">
                <div class="user-name">
                  <h3>{{item.name}} <span>lv{{index+1}}</span> </h3>
                  <div>
                    <span>发布于：</span>
                    {{item.time.slice(0,10)}}
                  </div>
                </div>
                <div class="text" v-html="item.content"></div>
                <div class="repy">
                  <span @click="handleRepy(ele.bid,item.name,item.bid)">{{item.bid===uid?'收起':'回复'}}</span>
                  <!--  <span>  <i class="fa fa-thumbs-o-up"></i>0</span>-->
                </div>
                <!-- 回复开始 -->
                <div class="repy-box" v-if="item.bid===uid">
                  <p>
                    <span>
                      回复
                      <i>@{{item.name}}</i>
                    </span>
                  </p>

                  <div class="comments-box">
                    <div class="comments-img">
                      <img :src="imgUrl" />
                    </div>
                    <div class="inner" @click="makeFaceClose">
                      <div class="input-box">
                        <label>
                          <Input
                            prefix="ios-contact"
                            v-model="repyname"
                            placeholder="请输入您的称呼..."
                            class="input-width"
                          />
                          <i>*</i>
                        </label>
                        <label>
                          <Input
                            prefix="ios-mail"
                            v-model="repyemail"
                            placeholder="请输入您的邮箱..."
                            class="input-width"
                          />
                          <i>*</i>
                        </label>
                        <label>
                          <Input
                            prefix="md-at"
                            v-model="repywebUrl"
                            placeholder="请输入您的网址..."
                            class="input-width"
                          />
                        </label>
                      </div>
                      <div class="comments-warp">
                        <!-- 发布内容输入框，利用Html5的新属性contenteditable，实现可编辑文本 ，会自动将插入的IMG标签解析-->
                        <div class="publish_container">
                          <p contenteditable="true" :id="'input_conta'+item.bid"></p>
                        </div>
                        <div class="comments-textarea">
                          <!-- 表情容器 ，包裹生成的表情，绑定点击表情事件-->
                          <div class="face-warp">
                            <i @click.stop="makeFace" :class="repyisFaceShow?'i1':'i2'"></i>
                            <transition name="show-face">
                              <div
                                id="face"
                                class="box-bj-sd"
                                v-show="repyisFaceShow"
                                @click.stop="choiceFace($event)"
                              >
                                <img
                                  v-for="(itemIcon,ind) in arrIcon"
                                  :src="itemIcon.name"
                                  :key="ind+'icon'"
                                />
                              </div>
                            </transition>
                          </div>
                          <span class="submit" @click="handlePublic">发布</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="list">
              <img src="https://zhenglinglu.cn/static/img/touxiang0.ff5a451.jpg" />
              <div class="text-box">
                <div class="user-name">
                  <h3>{{item.name}}</h3>
                  <div>
                    <span>发布于：</span>
                    {{item.time.slice(0,10)}}
                  </div>
                </div>
                <div class="text" v-html="item.content"></div>
                <div class="repy">
                  <span>回复</span>
                </div>
              </div>
            </div>-->
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
    <div v-else class="leave-list tip">暂无内容</div>
  </div>
</template>
<script>
// import { URL } from "../constant/constant.js";
import {
  dateTime,
  getUrl,
  checkEmail,
  getuid,
  analysisString,
  icon
} from "../assets/js/globle";
// import Qs from "qs";
export default {
  name: "viwephotos",
  data: () => ({
    sayList: [], //部分数据
    content: [], //全部数据
    pageNo: 0,
    pageSize: 10,
    total: 0,
    bid: "",
    repybid: "", //回复id 用于判断
    uid: "", ///回复id传向后台修改
    repyNameHou: "", //回复谁
    arrIcon: [],
    colorArr:[],
    //----------------
    isFaceShow: false,
    repyisFaceShow: false,
    // content: "",
    replyData: [],
    // total: 0,
    email: "",
    name: "",
    webUrl: "",
    repyemail: "",
    repyname: "",
    repywebUrl: "",

    URL: process.env.baseUrl + "/zllublogAdmin/",
    imgUrl: process.env.baseUrl + "/zllublogAdmin/images/headimg/mo.jpg",
    //--------------------

    time: dateTime(),
    mark: true
  }),
  props: ["config"],
  computed: {
    commentAll() {
      return this.$store.state.comment.commentAll;
    }
  },
  watch: {
    commentAll() {
      this.handleData();
    }
  },

  created() {
    this.bid = getuid();
    // console.log(this.bid);
    // this.artBid = this.$route.params.bid;
    this.handleData();
    this.handleIcon();
  },

  methods: {
    handleIcon() {
      this.arrIcon = icon.map(item => {
        // item.name = "https://zhenglinglu.cn/staticimg/icon/" + item.name;
        return {
          name: this.URL+"/images/icon/" + item.name
        };
      });
    },
    handleData() {
      let data = this.$store.state.comment.commentAll;
      // console.log(data);
      this.content = data;
      this.total = data.length;

      this.sayList = data.slice(0, 10);
    },
    changePage(event) {
      this.pageNo = event;
      this.changeList(this.pageNo, this.pageSize);
       // 返回顶部
      this.$goBack();
    },
    changeSizePage(event) {
      this.pageSize = event;
      this.changeList(this.pageNo, this.pageSize);
       // 返回顶部
      this.$goBack();
    },
    changeList(pageNo, pageSize) {
      let start = pageNo,
        end = pageSize;
      if (pageNo > 0) {
        start = (pageNo - 1) * pageSize;
        end = start + pageSize;
      }
      this.sayList = this.content.slice(start, end);
    },
    makeFaceClose() {
      if (this.repybid) {
        this.repyisFaceShow = false;
      } else {
        this.isFaceShow = false;
      }
    },
    makeFace() {
      if (this.repybid) {
        this.repyisFaceShow = !this.repyisFaceShow; //显示表情容器
      } else {
        this.isFaceShow = !this.isFaceShow; //显示表情容器
      }
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
        $("p#input_conta" + this.uid).append(cEle);
        this.makeFaceClose();
      }
    },
    // 请求留言数据
    getContent() {
      this.$axios.get(this.URL + this.config.commentUrl).then(res => {
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
              // console.log(item2,'121212121');
              // console.log(analysisString(item2.toString()));
              return analysisString(item2.toString());
            });
          }
        });
        $("#input_conta" + this.uid).html(""); //清除发布框的文本内容
        this.name = "";
        this.email = "";
        this.webUrl = "";
        this.repyname = "";
        this.repyemail = "";
        this.repywebUrl = "";
        this.uid = "";
        this.repybid = "";
        this.$store.commit("setCommentAll", data);
        this.handleData();
        this.bid = getuid();
      });
    },
    //回复按钮
    handleRepy(bid, name, uid) {
      this.repyNameHou = name;
      this.bid = getuid();
      if (this.repybid) {
        this.uid = "";
        this.repybid = "";
      } else {
        this.repybid = bid;
        this.uid = uid; //用于匹配回复内容
      }
    },
    //提交数据
    handlePublic() {
      let text = $("#input_conta" + this.uid).html(); //获得发布框的文本内容，表情会以整个img标签文本显示
      let time = dateTime();
      let data = {
        time: time,
        bid: this.bid
      };
      if (this.repybid) {
        if (this.repyname === "") {
          this.$Modal.info({
            title: "温馨提示",
            content: "请输入您的称呼！"
          });
        } else if (!this.repyemail) {
          this.$Modal.info({
            title: "温馨提示",
            content: "请输入您的邮箱地址！"
          });
        } else if (!checkEmail(this.repyemail)) {
          this.$Modal.info({
            title: "温馨提示",
            content: "邮箱格式不正确！"
          });
        } else if (!text) {
          this.$Modal.info({
            title: "温馨提示",
            content: "请输入评论内容！"
          });
        } else {
          if (this.mark) {
            this.$Message.loading({
              content: "数据正在提交...",
              duration: 0
            });
            this.mark = false;
            data.name = this.repyname;
            data.content = text;
            data.email = this.repyemail;
            data.url = this.repyimgUrl;
            data.web = this.repywebUrl;
            data.uid = this.repybid;
            let newData = [];

            for (let index = 0; index < this.content.length; index++) {
              if (this.content[index].bid === this.repybid) {
                let depth = this.repyNameHou.split("回复@").length + 1;
                let pushData = {
                  depth: depth.toString(),
                  name: this.repyname + "回复@" + this.repyNameHou,
                  content: text,
                  bid: this.bid,
                  time: time,
                  url: this.repyimgUrl
                };

                newData = [...this.content[index].data];

                //查找元素插入的位置
                let startIndex = 0;
                for (let i = 0; i < newData.length; i++) {
                  if (newData[i].bid === this.uid) {
                    startIndex = i + 1;
                  }
                }
                //在指定位置添加元素,第一个参数指定位置,第二个参数指定要删除的元素,如果为0,则追加
                newData.splice(startIndex, 0, pushData);
                break;
              }
            }

            data.data = JSON.stringify(newData);

            this.submitData(data);
          } else {
            this.$Message.error("数据正在提交...");
          }
        }
      } else {
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
        } else if (!text) {
          this.$Modal.info({
            title: "温馨提示",
            content: "请输入评论内容！"
          });
        } else {
          if (this.mark) {
            this.$Message.loading({
              content: "数据正在提交...",
              duration: 0
            });
            this.mark = false;
            data.name = this.name;
            data.content = text;
            data.email = this.email;
            data.url = this.imgUrl;
            data.web = this.webUrl;
            data.uid = "";
            data.data = JSON.stringify([
              {
                depth: "1",
                name: this.name,
                content: text,
                bid: this.bid,
                time: time,
                url: this.imgUrl
              }
            ]);

            // data.bid = this.bid;
            this.submitData(data);
          } else {
            this.$Message.error("数据正在提交...");
          }
        }
      }
    },
    submitData(data) {
      this.$axios
        .post(this.URL + this.config.submitUrl, this.$qs.stringify(data))
        .then(res => {
          this.getContent();
          this.$Message.destroy();
          this.$Message.success("留言成功！");

          this.mark = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.word {
  padding: 15px;
  img {
    display: inline-block;
  }
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
  #input_conta,
  .text,
  .publish_container p,
  #face {
    img {
      width: 28px;
    }
  }
  .comments-box {
    margin: 0px 10px;
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
    margin-top: 40px;
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
        margin-right: 20px;
        .list {
          display: flex;
          border-top: 1px solid #eee;
          padding-bottom: 3px;
          padding-top: 10px;

          padding-left: 20px;
          margin-top: 10px;
          margin-bottom: 20px;
          > img {
            width: 35px;
            height: 35px;
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
                font-size: 14px;
                color: #6d757a;
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

              span {
                margin-left: 20px;
                cursor: pointer;

                i {
                  margin-right: 5px;
                }
              }
              span:hover {
                color: #33aba0;
              }
            }
            .repy-box {
              > p {
                border-bottom: 1px solid #eee;
                padding: 10px;
              }
              .comments-box {
                margin-top: 25px;
              }
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
  }
  .face-warp {
    position: relative;
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

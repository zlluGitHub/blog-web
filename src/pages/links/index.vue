<template>
  <div>
    <div class="web-box" v-if="data">
      <div v-if="data.shareF">
        <h2>博客推荐</h2>
        <ul>
          <li v-for="(item,i) in data.shareF" :key="i+'f'">
            <a :href="item.url" target="_blank" class="navs-link-logo">
              <img :src="$url+'/'+item.imgUrl" :alt="item.title" />
              <h3>{{item.title}}</h3>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="data.shareG">
        <h2>可视化图表库</h2>
        <ul>
          <li v-for="(item,i) in data.shareG" :key="i+'g'">
            <a :href="item.url" target="_blank" class="navs-link-logo">
              <img :src="$url+'/'+item.imgUrl" :alt="item.title" />
              <h3>{{item.title}}</h3>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="data.shareA">
        <h2>文档教程/社区</h2>
        <ul>
          <li v-for="(item,i) in data.shareA" :key="i+'a'">
            <a :href="item.url" target="_blank" class="navs-link-logo">
              <img :src="$url+'/'+item.imgUrl" :alt="item.title" />
              <h3>{{item.title}}</h3>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="data.shareB">
        <h2>前端框架/构建组件</h2>
        <ul>
          <li v-for="(item,i) in data.shareB" :key="i+'b'">
            <a :href="item.url" target="_blank" class="navs-link-logo">
              <img :src="$url+'/'+item.imgUrl" :alt="item.title" />
              <h3>{{item.title}}</h3>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="data.shareC">
        <h2>移动框架/构建组件</h2>
        <ul>
          <li v-for="(item,i) in data.shareC" :key="i+'c'">
            <a :href="item.url" target="_blank" class="navs-link-logo">
              <img :src="$url+'/'+item.imgUrl" :alt="item.title" />
              <h3>{{item.title}}</h3>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="data.shareD">
        <h2>前端常用工具</h2>
        <ul>
          <li v-for="(item,i) in data.shareD" :key="i+'d'">
            <a :href="item.url" target="_blank" class="navs-link-logo">
              <img :src="$url+'/'+item.imgUrl" :alt="item.title" />
              <h3>{{item.title}}</h3>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="data.shareE">
        <h2>开发平台</h2>
        <ul>
          <li v-for="(item,i) in data.shareE" :key="i+'e'">
            <a :href="item.url" target="_blank" class="navs-link-logo">
              <img :src="$url+'/'+item.imgUrl" :alt="item.title" />
              <h3>{{item.title}}</h3>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="web-box demo-spin-col">
      <i class="fa fa-spinner fa-pulse"></i>
    </div>
  </div>
</template>
<script>
// import { URL } from "../constant/constant.js";
export default {
  name: "links",
  data() {
    return {
      // URL: process.env.baseUrl + "/zllublogAdmin/",
      data: null
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
    // if (this.$store.state.share.shareData === 0) {
    // 请求在线文档数据
    this.$axios
      .get(this.$url + "/zll/links/list")
      .then(res => {
        if (res.data.result) {
          this.data = this.handleShareData(res.data.list);
        } else {
          this.$Message["error"]({
            background: true,
            content: "数据加载失败！呜呜~"
          });
        };
        this.$event.emit("inLoading", false);
       	let time = window.setTimeout(() => {
							window.clearTimeout(time);
							this.$event.emit("pageLoading", false);
						}, this.$loadingTime);

        // this.$store.commit("setShareData", res.data.list);
      })
      .catch(error => {
        console.log(error);
      });
    // } else {
    //   this.data = this.$store.getters.getShareData;
    // }
  },
  methods: {
    //分类
    handleShareData(data) {
      let shareA = [];
      let shareB = [];
      let shareC = [];
      let shareD = [];
      let shareE = [];
      let shareF = [];
      let shareG = [];
      data.map(item => {
        switch (item.type) {
          case "a":
            shareA.push(item);
            // mark = false;
            break;
          case "b":
            shareB.push(item);
            // mark = false;
            break;
          case "c":
            shareC.push(item);
            // mark = false;
            break;
          case "d":
            shareD.push(item);
            // mark = false;
            break;
          case "e":
            shareE.push(item);
            // mark = false;
            break;
          case "f":
            shareF.push(item);
            // mark = false;
            break;
          case "g":
            shareG.push(item);
            // mark = false;
            break;
          default:
            break;
        }
      });
      return { shareA, shareB, shareC, shareD, shareE, shareF, shareG };
    }
  }
};
</script>

<style lang="scss" scoped>
.web-box {
  width: 1200px;
  padding: 12px 30px;
  margin: auto;
  background-color: #fff;
  border-radius: 3px;
  margin-bottom: 10px;
  .tip {
    text-align: center;
    padding: 20px;
  }
  h2 {
    color: #666;
    font-size: 18px;
    padding: 10px 0;
    margin-top: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.035);
      padding: 10px;
      margin: 0 12px 12px 0;
      border-radius: 3px;
      transition: all 0.5s ease;
      a {
        font-size: 12px;
        color: #666;
      }
      a:hover {
        color: red;
      }
      .navs-link-logo {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 25px;
          height: 25px;
        }
        h3 {
          padding-left: 12px;
        }
      }
      .navs-link-info {
        margin-top: 10px;
        p {
          color: #666;
          width: 200px;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          // white-space: nowrap;
        }
        p.link {
          height: 70px;
        }
      }
      .click {
        display: flex;
        justify-content: space-around;
        a {
          margin-top: 7px;
          padding: 6px 10px;
          text-align: center;
          color: #fff;
          font-size: 12px;
          border-radius: 3px;
        }
        a:nth-child(1) {
          background-color: #1ab7cf;
        }
        a:nth-child(2) {
          background-color: #dc3545;
        }
      }
    }
    li:hover {
      background-color: #eee;
    }
  }
}
.demo-spin-col {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 450px;
  .fa-pulse {
    font-size: 28px;
  }
}
</style>

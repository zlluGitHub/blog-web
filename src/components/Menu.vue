<template>
  <div id="menu">
    <ul>
      <li>
        <router-link to="/">前往首页</router-link>
      </li>
      <li>
        <a @click="handleClik" href="javascript:void(0);">全站搜索</a>
      </li>
      <li>
        <a href="https://github.com/zlluGitHub">GitHub</a>
      </li>
      <li>
        <router-link to="/about">关于博主</router-link>
      </li>
      <li>
        <router-link to="/word">我要吐槽</router-link>
      </li>
      <!-- <li>
        <a href="javascript:void(0);" rel="sidebar" @click="addFavorite">加入收藏</a>
      </li> -->
      <!-- <li>
        <a @click="handleClikFeedBack" href="javascript:void(0);">建议/反馈</a>
      </li> -->
    </ul>
  </div>
</template>
<script>
export default {
  name: "maine",
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {
    var menu = document.getElementById("menu");
    document.oncontextmenu = function(ev) {
      var ev = ev || event;
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      menu.style.display = "block";
      menu.style.left = ev.clientX + "px";
      //当滑动滚动条时也能准确获取菜单位置
      menu.style.top = ev.clientY + scrollTop + "px";
      //阻止默认事件
      return false;
    };
    var app = document.querySelector('body');
    app.onclick = function(params) {
      document.getElementById("menu").style.display = "none";
    };
  },
  methods: {
    handleClik() {
       this.$store.commit("setSearchShow", true);
      // this.$store.dispatch("setChangingOver", {
      //   search: true
      // });
    },
    handleClikFeedBack() {
      // this.$store.dispatch("setChangingOver", {
      //   feedBack: true
      // });
    },
    addFavorite() {
      let url = window.location;
      let title = document.title;
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
      } else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
        alert(title, url);
      } else if (document.all) {
        try {
          window.external.addFavorite(url, title);
          alert(title, url);
        } catch (e) {
          alert("您的浏览器不支持,请按 Ctrl+D 手动收藏!");
        }
      } else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
        alert(title, url);
      } else {
        alert("您的浏览器不支持,请按 Ctrl+D 手动收藏!");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
#menu {
  width: 130px;
  position: absolute;
  display: none;
  z-index: 10000;
}
#menu ul {
  width: 100%;
  background-color: #fff;
  list-style: none;
  opacity: 0.9;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0px 0px 15px 1.5px #ccc;
  color: #999;
  padding: 10px 0px;
}
#menu ul li {
  font-size: 14px;
  color: #666;
  line-height: 30px;
  padding: 2px;
  text-align: center;
  a {
    color: #666;
  }
  a:hover {
    color: red;
  }
}
#menu ul li:hover {
  background-color: #eee;
}
</style>

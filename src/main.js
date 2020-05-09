import Vue from 'vue'
import App from './App.vue'

import 'font-awesome/css/font-awesome.css'
import './assets/css/APlayer.min.css'

//引入 iview
import iView from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(iView);

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)

// import './assets/js/particles'

// 引入echarts
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts;

import event from './utils/event';
Vue.prototype.$event = event;
Vue.prototype.$loadingTime = 500;

//返回顶部
const goBack = () => {
  //清除定时器
  clearInterval(timer);
  //设置定时器
  let timer = setInterval(function () {
    //获取滚动条到顶部的距离
    var osTop = document.documentElement.scrollTop || document.body.scrollTop;
    var ispeed = Math.floor(-osTop / 6);
    document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
    if (osTop == 0) {
      clearInterval(timer);
    };
  }, 30);
};

Vue.prototype.$goBack = goBack;

// Vue.prototype.$url = 'http://zhenglinglu.cn';

// Vue.prototype.$url = 'http://localhost:3000';
//引入axios
// import apiConfig from '../config/api.config.js'
import axios from 'axios'
import qs from 'qs'
// axios.defaults.baseURL = process.env.VUE_APP_URL;
Vue.prototype.$url = process.env.VUE_APP_URL;
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.$qs = qs           //全局注册，使用方法为:this.$qs

//全局引入模拟数据
// import mock from './mock'
// Vue.prototype.$mock = mock

Vue.config.productionTip = false

//实例化 store
import store from './store' // this.$store.commit("setUser", user); 

//引入路由文件
import router from './router'
//// 路由拦截
router.beforeEach((to, from, next) => {
  //如果未匹配到路由
  if (to.matched.length === 0) {
    //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    from.name ? next({ name: from.name }) : next('/');
  } else {
    //如果匹配到正确跳转
    next();
  }

});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

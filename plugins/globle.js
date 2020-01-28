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
import Vue from 'vue';

Vue.prototype.$goBack = goBack;

Vue.prototype.$url = 'http://zhenglinglu.cn';

// Vue.prototype.$url = 'http://localhost:3000';
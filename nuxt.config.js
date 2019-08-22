const axios = require('axios');
module.exports = {
  mode: 'universal',//同构应用程序（服务器端呈现+客户端导航）
  // mode: 'spa',//没有服务器端呈现（仅客户端导航）
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#4B75D8', height: '5px' },
  /*
  ** 全局 CSS 样式
  */
  css: [
    { src: "iview/dist/styles/iview.css" },
    // 项目里要使用的 SCSS 文件
    { src: "@/assets/css/globle.scss" },
    { src: "~/assets/css/font-awesome/font-awesome.min.css" },
    { src: "swiper/dist/css/swiper.css" },
    // 文章样式
    { src: "~/assets/css/editorCss/content.min.css" },
    { src: "~/assets/css/editorCss/content.mobile.min.css" },
    { src: "~/assets/css/APlayer.min.css" },
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/iview' },
    { src: "~/plugins/vue-swiper.js", ssr: false },
    { src: "~/plugins/back.js", ssr: false },
    { src: "~/plugins/apiayer.js", ssr: false },
    { src: "~/plugins/jquery.js", ssr: false },
  ],
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    // prefix: '/api/',
    proxy: true // Can be also an object with default options
  },
  proxy: {//只适合在开发环境下解决跨域问题
    '/api/': {
      // target: 'https://zhenglinglu.cn',
      target: 'http://localhost:9096',
      pathRewrite: { '^/api/': '/' },
      // changeOrigin: true,
      // secure: false
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    analyze: false,
    extend(config, ctx) {
    }
  },
  // router: {
  // base: 'dist/',
  //   middleware: 'auth'//每个路由改变时被调用
  // },
  generate: {
    subFolders: true,//true 时为每个路由创建一个目录并生成index.html文件
    // interval: 500,
    // 动态路由生成静态文件

    // 方法一
    // routes: function (callback) {
    //   axios.get('https://zhenglinglu.cn/zllublogAdmin/article/get.article.php')
    //     .then((res) => {
    //       var routes = res.data.list.map((user) => {
    //         return '/detail/' + user.id
    //       })
    //       callback(null, {routes:routes,data:user})
    //     })
    //     .catch(callback)
    // }

    //方法二
    async routes() {
      let data = await axios.get('https://zhenglinglu.cn/zllublogAdmin/article/get.article.php')
        .then((res) => {
          let totle = res.data.list.length - 1;
          return res.data.list.map((data, index, oldArr) => {
            return {
              route: '/detail/' + data.bid,
              payload: {
                prev: index !== 0 ? oldArr[index - 1] : false,
                middle: data,
                next: index !== totle ? oldArr[index + 1] : false
              }
            }
          })
        })

      // let data2 = await axios.get(process.env.BASE_URL + '/zllublogAdmin/article/get.article.php')
      //   .then((res) => {
      //     return res.data.list.map((user) => {
      //       return {
      //         route: '/detail/' + user.id,
      //         payload: user
      //       }
      //     })
      //   })
      return [...data]
    }
  }
}

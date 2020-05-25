import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  mode: 'history',
  // mode: 'hash', //默认 有#号
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../pages/index')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/about')
    },
    // // {
    // //   path: '/',
    // //   name: 'album',
    // //   component: () => import('../pages/album')
    // // },
    // // {
    // //   path: '/albumlist',
    // //   name: 'albumlist',
    // //   component: () => import('../pages/albumlist')
    // // },
    {
      path: '/backstage',
      name: 'backstage',
      component: () => import('../pages/backstage')
    },
    // {
    //   path: '/albumlist',
    //   name: 'albumlist',
    //   component: () => import('../pages/albumlist')
    // },
    {
      path: '/base',
      name: 'base',
      component: () => import('../pages/base')
    },
    // {
    //   path: '/charteditor',
    //   name: 'charteditor',
    //   component: () => import('../pages/charteditor')
    // },
    {
      path: '/charts',
      name: 'charts',
      component: () => import('../pages/charts')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../pages/detail')
    },
    {
      path: '/links',
      name: 'links',
      component: () => import('../pages/links')
    },
    // {
    //   path: '/music',
    //   name: 'music',
    //   component: () => import('../pages/music')
    // },
    {
      path: '/other',
      name: 'other',
      component: () => import('../pages/other')
    },
    {
      path: '/reception',
      name: 'reception',
      component: () => import('../pages/reception')
    },
    {
      path: '/say',
      name: 'say',
      component: () => import('../pages/say')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../pages/search')
    },
    // {
    //   path: '/study',
    //   name: 'study',
    //   component: () => import('../pages/study')
    // },
    // {
    //   path: '/subunit',
    //   name: 'subunit',
    //   component: () => import('../pages/subunit')
    // },
    // // {
    // //   path: '/tabs',
    // //   name: 'tabs',
    // //   component: () => import('../pages/tabs')
    // // },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('../pages/tags')
    },
    // {
    //   path: '/template',
    //   name: 'template',
    //   component: () => import('../pages/template')
    // },
    {
      path: '/word',
      name: 'word',
      component: () => import('../pages/word')
    },
    {
      path: '/works',
      name: 'works',
      component: () => import('../pages/works')
    },
    {
      path: '/wxcx',
      name: 'wxcx',
      component: () => import('../pages/wxcx')
    },
    // // {
    // //   path: '/second',
    // //   name: 'secondIndex',
    // //   component: secondIndex,
    // //   redirect: '/Index',//设置默认指向的路径
    // //   children: [ //这里就是二级路由的配置
    // //     {
    // //       path: '/talent',
    // //       name: 'TalentMain',
    // //       component: TalentMain
    // //     }
    // //   ]
    // // },
  ]
})

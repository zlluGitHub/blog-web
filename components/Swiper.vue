
<template>
  <div
    class="swiper swiperBox"
    v-swiper:swiper="swiperOption"
    ref="swiperBox"
    @mouseenter="stopSwiper"
    @mouseleave="startSwiper"
  >
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner,i) in banners" :key="i">
        <img :src="banner" />
      </div>
    </div>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev fa fa-angle-left fa-4x" slot="button-prev"></div>
    <div class="swiper-button-next fa fa-angle-right fa-4x" slot="button-next"></div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      banners: [
        "https://www.zhenglinglu.cn/zllublogAdmin/images/aside/banner1.jpg",
        "https://www.zhenglinglu.cn/zllublogAdmin/images/aside/banner2.jpg",
        "https://www.zhenglinglu.cn/zllublogAdmin/images/aside/banner4.jpg"
      ],
      // 所有配置均为可选（同Swiper配置）
      swiperOption: {
        loop: true,
        speed: 500,
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        slidesPerView: "auto",
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },

        spaceBetween:30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChange() {
            // console.log('onSlideChangeEnd', this);
          },
          tap() {
            // console.log('onTap', this);
          }
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        // autoplayDisableOnInteraction: false,
        // effect:'cube',
        //  effect: 'free',
        // mousewheel: true,
        // preloadImages: false,
        lazy: true
      }
    };
  },
  swiper() {
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    return this.$refs.swiperBox.swiper;
  },
  methods: {
    stopSwiper() {
      this.swiper.autoplay.stop();
    },
    startSwiper() {
      this.swiper.autoplay.start();
    }
  }
};
</script>
<style lang="scss" scoped>
// .my-swiper {
// //   height: 300px;
//   width: 100%;
// //   .swiper-slide {
// //     text-align: center;
// //     font-size: 38px;
// //     font-weight: 700;
// //     background-color: #eee;
// //     display: flex;
// //     justify-content: center;
// //     align-items: center;
// //   }
// //   .swiper-pagination {
// //     > .swiper-pagination-bullet {
// //       background-color: red;
// //     }
// //   }
// }
</style>
<style lang="scss" scoped>
.swiper-slide {
  img {
    width: 100%;
    height: 290px;
  }
}
</style>
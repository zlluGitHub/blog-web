
<template>
  <div class="swiperBox">
    <Carousel autoplay v-model="value2" loop :autoplay-speed="3000">
      <!-- <CarouselItem v-for="(banner,i) in banners" :key="i">
        <img :src="banner" />
      </CarouselItem>-->
      <CarouselItem>
        <img
          src="../assets/image/20200627135247.jpg"
          alt="前端自动化部署平台"
          @click.stop="handleRouter('http://swd.zhenglinglu.cn/')"
        />
      </CarouselItem>
      <CarouselItem>
        <img
          src="../assets/image/20200627141721.jpg"
          alt="前端自动化部署平台"
          @click.stop="handleRouter('https://github.com/zlluGitHub/web-deploy')"
        />
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      value2: 0,
      banners: [
        this.$url + "/banner/img1.jpg",
        this.$url + "/banner/img2.jpg",
        this.$url + "/banner/img3.jpg"
      ]
    };
  },
  methods: {
    handleRouter(href) {
      let win = window.open();
      win.opener = null;
      win.location = href;
      win.target = "_blank";
    }
  }
};
</script>
<style lang="scss" scoped>
.swiperBox {
  img {
    width: 100%;
    height: 390px;
    display: block;
    cursor: pointer;
  }
}
</style>
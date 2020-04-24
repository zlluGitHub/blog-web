
<template>
  <div class="swiperBox">
    <Carousel autoplay v-model="value2" loop>
      <CarouselItem v-for="(banner,i) in banners" :key="i">
        <img :src="banner" />
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
  methods: {}
};
</script>
<style lang="scss" scoped>
.swiperBox {
  img {
    width: 100%;
    height: 390px;
  }
}
</style>
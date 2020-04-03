<template>
  <div class="album-list">
    <div>
      <h1>相册1</h1>
      <div class="wall-lines">
        <small>
          <i class="fa fa-calendar"></i>
          <span>2018-11-25</span>
        </small>
        <small>
          <i class="fa fa-eye"></i>
          <span>12</span>
        </small>
        <small>
          <i class="fa fa-photo"></i>
          <span class="t-orange">4</span>
        </small>
      </div>
      <!--效果html开始-->
      <div class="lanren">
        <div class="flip-3d" @click="handleClose">
          <figure>
            <img src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg" />
            <figcaption>Mouse</figcaption>
          </figure>
        </div>
        <div class="flip-3d" @click="handleClose">
          <figure>
            <img src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg" />
            <figcaption>Irrigation rats</figcaption>
          </figure>
        </div>
        <div class="flip-3d" @click="handleClose">
          <figure>
            <img src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg" />
            <figcaption>Rabbit</figcaption>
          </figure>
        </div>
        <div class="flip-3d" @click="handleClose">
          <figure>
            <img src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg" />
            <figcaption>Rabbit</figcaption>
          </figure>
        </div>
        <div class="flip-3d" @click="handleClose">
          <figure>
            <img src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg" />
            <figcaption>Rabbit</figcaption>
          </figure>
        </div>
        <div class="flip-3d" @click="handleClose">
          <figure>
            <img src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg" />
            <figcaption>Rabbit</figcaption>
          </figure>
        </div>
      </div>
      <!--效果html结束-->
      <transition name="carousel">
        <div class="click-box" v-if="isCarousel">
          <div class="carousel-warp">
            <Icon type="ios-close-circle-outline" @click="handleClose" />
            <Carousel v-model="value2" loop radius-dot>
              <CarouselItem>
                <div class="demo-carousel">
                  <img
                    src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div class="demo-carousel">
                  <img
                    src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div class="demo-carousel">
                  <img
                    src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div class="demo-carousel">
                  <img
                    src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div class="demo-carousel">
                  <img
                    src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div class="demo-carousel">
                  <img
                    src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div class="demo-carousel">
                  <img
                    src="http://asp.yangruolan.com/upload/photos/small/smallpic_20181125162556.jpg"
                  />
                </div>
              </CarouselItem>
            </Carousel>
          </div>
        </div>
      </transition>
      <transition name="carouselBgc">
        <div class="bgc" v-if="isCarouselBgc"></div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCarousel: false,
      isCarouselBgc: false,
      value2: 0
    };
  },
  methods: {
    handleClose() {
      this.isCarousel = !this.isCarousel;
      this.isCarouselBgc = this.isCarousel;
      if (!this.isCarousel) {
        let time = setTimeout(() => {
          this.isCarouselBgc = false;
        }, 250);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.album-list {
  background-color: #fff;
  padding: 20px 0px;
}
.wall-lines {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  small {
    margin: 0px 20px;
    span {
      margin: 0px 3px;
    }
  }
}
h1 {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.bgc {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  // opacity: 0.5;
  z-index: 100;
}
.click-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 102;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .carousel-warp {
    margin-top: 20px;
    z-index: 100;
    width: 70%;
    box-shadow: 0 0 10px #fff;
    margin: auto;
    border: 2px solid #fff;
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .ivu-icon {
    position: absolute;
    z-index: 1000;
    right: 10px;
    top: 10px;
    font-size: 30px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .ivu-icon:hover {
    transform: scale(1.1);
    color: red;
  }
  // .ivu-icon-ios-close-circle-outline:before{
  //     position: absolute;
  //     z-index: 2000;
  // }
}
// 列表部分
.lanren {
  overflow: hidden;
  margin: 0 auto;
}
.flip-3d {
  //   perspective: 1200px;
  width: 25%;
  float: left;
}

.flip-3d figure {
  position: relative;
  transform-style: preserve-3d;
  transition: 1s transform;
  font-size: 1.6rem;
  margin: 12px;
  border-radius: 3px;
  box-shadow: 0 0 10px #999;
}

.flip-3d figure img {
  border: 2px solid #eee;
  border-radius: 3px;
  display: block;
  width: 100%;
  height: auto;
}
.flip-3d figure img {
  border: 2px solid #eee;
  border-radius: 3px;
  display: block;
  width: 100%;
  height: auto;
}

.flip-3d figure figcaption {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 0;
  transform: rotateY(0.5turn) translateZ(1px);
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  padding-top: 45%;
  opacity: 0.6;
  transition: 1s 0.5s opacity;
}

.flip-3d:hover figure {
  transform: rotateY(0.5turn);
}

.flip-3d:hover figure figcaption {
  opacity: 1;
}

.flip-3d figure:after {
  content: " ";
  display: block;
  //   height: 8vw;
  width: 100%;
  transform: rotateX(90deg);
  background-image: radial-gradient(
    ellipse closest-side,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

@media screen and (max-width: 800px) {
  #flip-3d {
    perspective-origin: center top;
  }

  div#flip-3d figure {
    float: none;
    width: 50%;
    margin: 0 auto;
    margin-bottom: 12vw;
  }

  .flip-3d figure figcaption {
    font-size: 0.8rem;
  }

  div#flip-3d figure:last-child {
    display: none;
  }
}
</style>
<template>
  <div
    class="bSwiper"
    v-show="show"
  >
    <div class="bSwiper-head">
      <i
        class="iconfont icon-chahao bSwiper-head-del"
        @click="handleHide"
      ></i>
    </div>
    <md-swiper
      class="bSwiper-wrap"
      ref="swiper"
      :is-loop="false"
      :useNative-driver="false"
      :autoplay="0"
      v-bind="$attrs"
    >
      <md-swiper-item
        v-for="(item) in imgs"
        :key="'img' + item.src"
      >
        <img
          :src="item.src"
          alt=""
          class="bSwiper-img"
        >
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>
import {
  Swiper,
  SwiperItem
} from 'mand-mobile';

export default {
  name: 'BSwiper',
  inheritAttrs: true,
  components: {
    'md-swiper': Swiper,
    'md-swiper-item': SwiperItem,
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    imgs: {
      type: Array
    }
  },
  methods: {
    handleHide() {
      this.$emit('update:show', false);
    }
  }
};
</script>

<style lang="scss">
  .bSwiper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(47, 47, 47, .6);
  }

  .bSwiper-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #2F2F2F;
    opacity: .6;
  }

  .bSwiper-head {
  }

  $bSwiperHeadDelSize: 34px;
  .bSwiper-head-del {
    display: block;
    width: 30px;
    height: 30px;
    color: #fff;
    font-size: 30px;
    margin-left: auto;
    margin-top: 24px;
    margin-right: 24px;
  }

  .bSwiper-img {
    width: 100%;
    max-height: 800px;
  }

  .bSwiper-wrap {
    width: 650px;
    margin-left: auto;
    margin-right: auto;
    margin-top: percentage(120/375);
  }
</style>

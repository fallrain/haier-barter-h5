<template>
  <div class="bUpload-img-par">
    <div
      v-show="imgs.length"
      class="bUpload-img-preshow"
    >
      <div
        class="bUpload-preshow"
        v-for="(item,index) in imgs"
        :key="item"
      >
        <i class="iconfont del icon-shanchu" @click="delFun(index)"></i>
        <img
          :src="item"
        >
      </div>
    </div>
    <vue-core-image-upload
      v-bind="$attrs"
    >
      <div class="bUpload">
        <i class="iconfont icon-jiahao bUpload-icon"></i>
      </div>
    </vue-core-image-upload>
  </div>
</template>
<script>
import VueCoreImageUpload from 'vue-core-image-upload';

export default {
  name: 'BUpload',
  components: { VueCoreImageUpload },
  props: {
    imgs: {
      type: Array,
      default: () => []
    },
    delFun: {
      type: Function
    },
    imgObj:{
      type:Object,
      default:() => {}
    }
  },
};
</script>
<style lang="scss">
  .bUpload {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 140px;
    height: 140px;
    border: 1px solid #D0D0D0;
    text-align: center;
    border-radius: 6px;
  }

  .bUpload-icon {
    color: #D0D0D0;
    font-size: 70px;
  }

  .bUpload-img-preshow {
    display: flex;
  }

  .bUpload-img-par {
    display: flex;
    flex-wrap: wrap;
  }

  .bUpload-preshow {
    position: relative;
    width: 56px;
    height: 56px;
    margin-right: 20px;
    justify-content: space-between;

    img {
      width: 100%;
      height: 100%;
    }

    .del {
      font-size: 18px;
      position: absolute;
      color: #333;
      right: -6px;
      top: -6px;
      background: #fff;
      border-radius: 100%;
    }
  }
</style>

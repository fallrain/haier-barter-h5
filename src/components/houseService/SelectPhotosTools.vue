<template>
  <div class="dialog" v-show="showMask">
    <div class="dialog-container">
      <div class="md-example-child md-example-child-reader md-example-child-reader-0">
        <ul class="image-reader-list">
          <li
            class="image-reader-item"
            v-for="(img, index) in imageList['reader0']"
            :key="index"
            :style="{
          'backgroundImage': `url(${img})`,
          'backgroundPosition': 'center center',
          'backgroundRepeat': 'no-repeat',
          'backgroundSize': 'cover'
        }"
          >
            <md-tag
              class="image-reader-item-del"
              size="small"
              shape="quarter"
              fill-color="#111A34"
              type="fill"
              font-color="#fff"
              @click.native="onDeleteImage('reader0', index)"
            >
              <md-icon name="close"></md-icon>
            </md-tag>
          </li>
          <li class="image-reader-item add">
            <md-image-reader
              name="reader0"
              @select="onReaderSelect"
              @complete="onReaderComplete"
              @error="onReaderError"
              is-multiple
            ></md-image-reader>
            <md-icon name="camera" size="md" color="#CCC"></md-icon>
          </li>
        </ul>
      </div>
      <div class="bottomClass">
        <button>取消</button>
        <button>确定插入</button>
      </div>
      <div class="close-btn" @click="closeMask">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>

import {
  Toast,
  DropMenu,
  Popup,
  PopupTitleBar,
  Button,
  Icon,
  ImageReader,
  Switch,
  Tag,
  Dialog,
  TextareaItem, Field
} from 'mand-mobile';

export default {
  name: 'SelectPhotosTools',

  components: {
    [DropMenu.name]: DropMenu,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [ImageReader.name]: ImageReader,
    [Switch.name]: Switch,
    [Tag.name]: Tag,
    [TextareaItem.name]: TextareaItem,
    [Field.name]: Field,
  },

  props: {
    list: {
      type: Array,
      require: true
    },
    showMask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imageList: {
        reader0: [
          '//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
          '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7'
        ],
        reader1: []
      },
    };
  },
  methods: {
    onReaderSelect(name, { files }) {
      files.forEach((file) => {
        console.log(
          '[Mand Mobile] ImageReader Selected:',
          `File Name ${file.name}`
        );
      });
      Toast.loading('图片读取中...');
    },
    onReaderComplete(name, { dataUrl, file }) {
      Toast.hide();
      console.log(
        '[Mand Mobile] ImageReader Complete:',
        `File Name ${file.name}`
      );
      setTimeout(() => {
        const demoImageList = this.imageList[name] || [];
        demoImageList.push(dataUrl);
        this.$set(this.imageList, name, demoImageList);
      }, 100);
    },
    onReaderError(name, { msg }) {
      Toast.failed(msg);
    },
    onDeleteImage(name, index) {
      const demoImageList = this.imageList[name] || [];
      demoImageList.splice(index, 1);
      this.$set(this.imageList, name, demoImageList);
    },
    closeMask() {
      this.$emit('clickCloseMask', '123');
    },
  }
};
</script>

<style scoped lang="scss">
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  .dialog-container {
    width: 689px;
    height: 819px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    position: relative;
    padding: 15px;
  }
  .close-btn {
    position: absolute;
    background: yellow;
    top: 16px;
    right: 16px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      font-weight: 600;
    }
  }
}
.md-example-child-reader {
  .image-reader-list {
    float: left;
    width: 100%;
  }
  .image-reader-item {
    position: relative;
    float: left;
    width: 193px;
    padding-bottom: 23.5%;

    background: #fff;
    box-shadow: 0 5px 20px rgba(197, 202, 213, 0.25);
    box-sizing: border-box;
    list-style: none;
    border-radius: 4px;
    background-size: cover;
    overflow: hidden;
    // &: nth-of-type(4n)
    margin-left: 20px;
    margin-top: 40px;
    //  &.add;
    .md-icon {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.5;
    }
    .image-reader-item-del {
      background: #ff0000;
    }
  }
  .bottomClass {
    display: flex;
    flex-direction: row;
    background: #4a90e2;
  }
}
</style>

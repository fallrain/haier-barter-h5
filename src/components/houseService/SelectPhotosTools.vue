<template>
  <div class="dialog" v-show="showMask">
    <div class="dialog-container">
      <div class="md-example-child md-example-child-reader md-example-child-reader-0">
        <ul class="image-reader-list">
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
          <li
            class="image-reader-item"
            v-for="(img, index) in imageList['reader0']"
            :key="index"
            @click="checkTab(img)"
            :style="{
              backgroundImage: `url(${img.img})`,
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }"
          >
            <div v-for="(img1, index1) in checkedList" :key="index1" v-show="img.id === img1.id">
              <img class="selectclass" src="@/assets/images/houseServicer/selecticon-done.png">
            </div>
          </li>
        </ul>
      </div>
      <div class="bottomClass">
        <button @click="closeMask">取消</button>
        <button @click="insertMask">确定插入</button>
      </div>
      <!-- <div class="close-btn" @click="closeMask">
        <i class="iconfont icon-close"></i>
      </div>-->
    </div>
  </div>
</template>

<script>
import {
  Button,
  Dialog,
  DropMenu,
  Field,
  Icon,
  ImageReader,
  Popup,
  PopupTitleBar,
  Switch,
  Tag,
  TextareaItem,
  Toast
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
    [ImageReader.name]: ImageReader
  },

  props: {
    customerIdSelect: String,
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
        reader0: [],
        reader1: []
      },
      checkedList: []
    };
  },
  mounted() {
    // this.getDefaultImgList(this.customerIdSelect);
    // debugger;
  },
  created() {
    if (this.customerIdSelect) {
      this.getDefaultImgList(this.customerIdSelect);
    }
  },
  methods: {
    // 拿到原始文件的base64的格式
    getImgFun(originalImg) {
      const that = this;
      const base64Arr = originalImg.split(',');
      let imgtype = '';
      let base64String = '';
      if (base64Arr.length > 1) {
        // 如果是图片base64，去掉头信息
        base64String = base64Arr[1];
        imgtype = base64Arr[0].substring(
          base64Arr[0].indexOf(':') + 1,
          base64Arr[0].indexOf(';')
        );
      }
      // 将base64解码
      const bytes = atob(base64String);
      // let bytes = base64;
      const bytesCode = new ArrayBuffer(bytes.length);
      // 转换为类型化数组
      const byteArray = new Uint8Array(bytesCode);
      // 将base64转换为ascii码
      for (let i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i);
      }
      // 生成Blob对象（文件对象）
      const bolbObj = new Blob([bytesCode], { type: imgtype });
      const reader = new FileReader(); // 这个方法读取文件的bolb对象
      // 将图片转成base64格式
      reader.readAsDataURL(bolbObj);
      return new Promise((r) => {
        reader.onloadend = function () {
          const result = this.result;
          const img = new Image();
          img.src = result;
          console.log('********未压缩前的图片大小********');
          console.log(result.length / 1024);
          img.onload = function () {
            const data = that.compress(img, 0.1);
            return r(data);
          };
        };
      });
    },
    // 压缩图片
    compress(img, size) {
      // 创建canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = img.width;
      const height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
      // 进行最小压缩
      const ndata = canvas.toDataURL('image/jpeg', size);
      console.log('*******压缩后的图片大小*******');
      console.log(ndata.length / 1024);
      return ndata;
    },
    getDefaultImgList(customerIdSelect) {
      this.basicService.queryHoseHoldPicturesForStory(customerIdSelect).then((res1) => {
        if (res1.code === 1) {
          this.imageList.reader0 = res1.data.map((v, index) => ({
            id: `${new Date().getTime()}-${index}`,
            img: v
          }));
        }
      });
    },
    checkTab(img) {
      const index = this.checkedList.findIndex(v => v.id === img.id);
      if (index === -1) {
        this.checkedList.push(img);
      } else {
        this.checkedList.splice(index, 1);
      }
    },
    // 相册获取图片代理
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
        this.getImgFun(dataUrl).then((data) => {
          demoImageList.unshift({
            id: new Date().getTime(),
            img: data
          });
        });
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
    // 取消
    closeMask() {
      this.$emit('clickCloseMask', '');
    },
    // 确定插入
    insertMask() {
      console.log('确定插入');
      if (this.checkedList !== undefined && this.checkedList.length > 0) {
        this.$emit('insertList', this.checkedList.map(v => v.img));
        // 重置选中
        this.checkedList = [];
        // 重置已上传的图片列表
        this.imageList.reader0 = [];
      } else {
        Toast.info('请点击图片，选中要插入的图片');
      }
    }
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
      // overflow-y: auto;
      width: 689px;
      height: 869px;
      background: #ffffff;
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
      overflow-y: auto;
      float: left;
      width: 100%;
      height: 700px;
    }

    .image-reader-item {
      position: relative;
      float: left;
      width: 193px;
      height: 193px;
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

      .selectclass {
        position: absolute;
        width: 36px;
        height: 36px;
        right: 10px;
        top: 10px;
      }
    }
  }

  .bottomClass {
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 40px;
    right: 20px;
  }

  .bottomClass button {
    border: 1px solid #1969c6;
    color: #1969c6;
    border-radius: 28px;
    background: #fff;
    height: 56px;
    margin-left: 20px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 25px;
  }
</style>
<style lang="scss" scope>
  .md-toast .md-popup {
    z-index: 99700;
  }
</style>

<template>
  <div class="upload">
    <div class="list">
      <div class="item interval" v-for="(item,index) in fileList" :key="index">
        <img :src="item" v-if="item">
        <div class="icon-close" @click.stop="handleRemove(index)">
          <uni-icon type="closeempty" size="20" color="#fff"></uni-icon>
        </div>
      </div>
      <div class="item" @click="chooseImage" v-if="fileList.length<limit">
        <uni-icon type="image" size="30" color="#cccccd"></uni-icon>
      </div>
    </div>
  </div>
</template>

<script>
import UniIcon from '@/components/haierHouse/uni/uni-icon.vue';

export default {
  name: 'ssUploadImage',
  components: {
    UniIcon
  },
  props: {
    limit: {
      type: Number,
      default: 3
    },
    count: {
      type: Number,
      default: 3
    },
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'file'
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    size: {
      type: Number,
      default: 5000000
    },
    // 最大选择图片数
    maxChooseImgNum: {
      type: Number,
      default: 3
    },
    header: {
      type: Object,
      default() {
        return {};
      }
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      uploadNum: 0
    };
  },
  methods: {
    chooseImage() {
      uni.chooseImage({
        count: this.maxChooseImgNum,
        success: (chooseImageRes) => {
          this.uploadNum += chooseImageRes.tempFiles.length;
          if (this.uploadNum > this.limit) {
            uni.showToast({
              title: `最多只能上传${this.limit}张图片`,
              icon: 'none'
            });
            this.uploadNum -= chooseImageRes.tempFiles.length;
            return;
          }
          const chooseLen = chooseImageRes.tempFiles.length;
          if (chooseLen > this.maxChooseImgNum) {
            uni.showToast({
              title: `最多只能选${this.maxChooseImgNum}张图片`,
              icon: 'none'
            });
            this.uploadNum -= chooseImageRes.tempFiles.length;
            return;
          }
          const overloadIndex = chooseImageRes.tempFiles.findIndex(file => file.size > this.size);
          debugger;
          if (overloadIndex !== -1) {
            uni.showToast({
              title: chooseLen > 1 ? `第${overloadIndex + 1}张图片过大，请重新选择` : '图片过大,请重新选择',
              icon: 'none'
            });
            chooseLen -= 1;
            return;
          }
          uni.showLoading({
            title: '图片正在上传'
          });

          const upLoadProgress = chooseImageRes.tempFilePaths.map(file => this.uploadFile(file));

          Promise.all(upLoadProgress).then(() => {
            uni.hideLoading();
          });
          /* uploadTask.onProgressUpdate((res) => {
              this.$emit('on-process', res)
            }) */
        }
      });
    },
    uploadFile(file) {
      /* 上传 */
      return new Promise((resolve) => {
        uni.uploadFile({
          url: this.url,
          name: this.name,
          filePath: file,
          sizeType: ['compressed'],
          formData: this.formData,
          header: this.header,
          success: (uploadFileRes, tempFiles) => {
            this.$emit('on-success', { data: JSON.parse(uploadFileRes.data), fileList: this.fileList });
            return resolve(uploadFileRes);
          },
          fail: (err) => {
            this.$emit('on-error', err);
            return resolve(err);
          }
        });
      });
    },
    handleRemove(index) {
      this.$emit('on-remove', { index, fileList: this.fileList });
    }
  }
};
</script>

<style lang="scss" scoped>
  .upload {
    .list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20upx;

      .item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140upx;
        height: 140upx;
        border-radius: 8upx;
        border: 2upx solid #D9D9D9;
        background-color: #f3f3f3;
        margin-bottom: 20upx;

        &.interval {
          margin-right: 16upx;
          border: none;
        }

        image {
          width: 100%;
          height: 100%;
          border-radius: 8upx;
          margin: 0;
        }

        .icon-close {
          position: absolute;
          top: 0;
          right: 0;
          width: 28upx;
          height: 28upx;
          // background-color: red;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0 8upx 0 0;
        }

        .icon {
          width: 48upx;
          height: 48upx;
        }
      }
    }
  }
</style>

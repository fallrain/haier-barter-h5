<template>
  <div style="width:100%">
    <div class="rich-editor" :style="{backgroundColor:this.bgColor,borderColor:this.bgColor}">
      <div class="content">
        <div class="addBtnClass">
          <img @click="addAction" src="@/assets/images/houseServicer/rugsAdd_icon.png"/>
        </div>
        <input
          class="title-input"
          v-if="hasTitle"
          v-model="strTitle"
          :placeholder="placeholder||'标题'"
          v-noSpace
          maxlength="20"
        >
        <input type="hidden" id="target" v-model="strContent">
        <editable class="editable" ref='editor' :content="strContent" :contentplaceholder="contentplaceholder"
                  @addimg="addimg($event)" @update="strContent = $event">
        </editable>
        <!-- <input @change="getFile" class="input" id="imageUpload" type="file" name="fileInput" accept="image/*"> -->
      </div>
    </div>
    <select-photos-tools
      :showMask="showMaska"
      @clickCloseMask="clickCloseMask"
      @insertList="insertList"
      :customerIdSelect="customerId"
    ></select-photos-tools>
  </div>
</template>
<script>
import lrz from 'lrz';
import editable from './editable';
import {
  SelectPhotosTools
} from '@/components/houseService';

export default {
  name: 'richEditor',
  components: {
    editable,
    'select-photos-tools': SelectPhotosTools,
  },
  data() {
    return {
      showMaska: false,
      selectImgList: [],
      strTitle: this.oldTitle || '',
      strContent: this.oldContent || ''
    };
  },
  props: {
    customerId: String,
    placeholder: String,
    contentplaceholder: String,
    oldContent: String,
    width: Number,
    oldTitle: String,
    hasTitle: {
      type: Boolean,
      default() {
        return false;
      }
    },
    description: String,
    title: String,
    bgColor: {
      type: String,
      default: '#cfd8dc'
    }
  },
  mounted() {
  },
  created() {
    console.log(this.customerId);
  },
  methods: {
    // 确定插入
    insertList(data) {
      this.selectImgList = data;
      this.selectImgList.forEach((item) => {
        this.$refs.editor.addImg(item);
      });
      this.showMaska = false;
    },
    // 取消
    clickCloseMask() {
      this.showMaska = false;
    },
    addAction() {
      this.showMaska = true;
    },
    getFile($event) {
      const file = $event.target.files[0]; // 获取要上传的文件
      lrz(file).then((res) => {
        this.$refs.editor.addImg(res.base64);
      });
    },
    addimg(imgurl) {
      this.strContent = `${this.strContent}<br><img class="rich-img" src="${imgurl}" style="max-width:100%"><br>`;
    }
  },
  watch: {
    strContent(o) {
      this.$emit('update:description', o);
    },
    strTitle(val) {
      this.$emit('update:title', val.trim());
    },
    title(o) {
      this.strTitle = o;
    },
    description(o) {
      this.strContent = o;
    }
  }
};
</script>
<style scoped>
  .editable {
    /* height: 600px; */
    min-height: 800px;
    width: 100%;
    user-select: text;
    overflow-y: auto;
    outline: none;
    cursor: text;
    border-top: 1px solid #EEEEEE;
    padding-top: 20px;
  }

  .content {
    position: relative;
    overflow: hidden;
    padding: 16px;
    font-size: 30px;
  }

  .title-input {
    width: 100%;
    border-style: none;
    background-color: transparent;
    line-height: 50px;
    padding: 8px 0;
    outline: none;
    -webkit-appearance: none;
    border-bottom: 1px solid #EEEEEE;
    margin-bottom: 34px;
    height: 50px;
  }

  .title-input:before {
    background-position: bottom;
    background-size: 3px 1px;
    background-repeat: repeat-x;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.87);
  }

  .input {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 24px;
    opacity: 0;
  }

  .rich-editor {
    border-radius: 2px;
    min-width: 0;
    position: relative;
    text-decoration: none;
    -webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  }

</style>

<template xmlns:v-slot="" >
  <div class="service-story">
    <!-- <div class="face-show">
      <div class="img-show">
        <img v-show="customerInfo.coverImage !== ''" :src="customerInfo.coverImage" alt="">
      </div>
      <span v-show="this.customerInfo.status !== 1" class="img-change">
        <b-wx-upload
          :maxLength="-1"
          @imageuploaded="(data, fileList)=>imageuploaded(data, fileList)"
          :uploadFn="uploadImgFn"
          @errorhandle="uploadError"
        >
        </b-wx-upload>
        更换封面图片</span>
    </div>-->
    <div class="content">
      <!-- <div class="title">
        <input
          type="text"
          v-show="this.customerInfo.status !== 1"
          v-model="customerInfo.title"
          @input="judgeTitleWord()"
          placeholder="请输入标题"
        />
        <input
          type="text"
          v-show="this.customerInfo.status === 1"
          v-model="customerInfo.title"
          disabled
          placeholder="请输入标题"
        />
        <!-- <div>{{customerInfo.tag}}</div>
      </div>-->
      <div class="mainbody">
        <rich-editor
          class="dasfgh"
          :title.sync="customerInfo.title"
          :description.sync="customerInfo.content"
          placeholder="请输入标题"
          contentplaceholder="正文"
          :hasTitle="true"
          :customerId="this.customerInfo.customerId"
        ></rich-editor>
        <!-- <md-textarea-item
          ref="demo0"
          title
          autosize
          class="example"
          v-model="customerInfo.mainbody"
          placeholder="正文"
          rows="20"
        />
        <div class="addBtnClass">
          <img class @click="addAction" src="@/assets/images/houseServicer/rugsAdd_icon.png" />
        </div>-->
      </div>
      <!-- <div class="templete-item">
        <div class="text-center mb16 mt16">心动之选</div>
        <div class="tip-style" v-show="customerInfo.status !== 1">编辑图文，描述用户购机原因</div>
        <div class="appendArea">
          <div class="append-item" v-for="(item, index) in customerInfo.heartInfo" :key="index">
            <div class="img-show">
              <div v-show="customerInfo.status !== 1">
                <b-wx-upload
                  :maxLength="-1"
                  @imageuploaded="(data, fileList)=>imageuploaded(data, fileList, item)"
                  :uploadFn="uploadImgFn"
                  @errorhandle="uploadError"
                >
                </b-wx-upload>
              </div>
              <div v-show="item.url === ''" class="add-tag">+</div>
              <img v-show="item.url!=''" :src="item.url" alt="">
            </div>
            <div class="text-input">
              <textarea v-show="customerInfo.status !== 1" class="w100per"
                        v-model="item.descript" rows="3"
                        @input="judgeContentWord('heartInfo',index)"
                        placeholder="添加对此图片的文字描述"></textarea>
              <textarea v-show="customerInfo.status === 1" disabled class="w100per" v-model="item.descript" rows="3"></textarea>
            </div>
          </div>
        </div>
        <div v-show="customerInfo.status !== 1" class="add-new" @click="addInfor(1)">+</div>
      </div>-->
      <!-- <div class="templete-item">
        <div class="text-center mb16 mt16">品质生活</div>
        <div class="tip-style" v-show="customerInfo.status !== 1">编辑图文，描述用户产品使用场景</div>
        <div class="appendArea">
          <div class="append-item" v-for="(item, index) in customerInfo.lifeInfo" :key="index">
            <div class="img-show">
              <div v-show="customerInfo.status !== 1">
                <b-wx-upload
                  :maxLength="-1"
                  @imageuploaded="(data, fileList)=>imageuploaded(data, fileList, item)"
                  :uploadFn="uploadImgFn"
                  @errorhandle="uploadError"
                >
                </b-wx-upload>
              </div>
              <div v-show="item.url === ''" class="add-tag">+</div>
              <img v-show="item.url!=''" :src="item.url" alt="">
            </div>
            <div class="text-input">
              <textarea v-show="customerInfo.status !== 1" class="w100per"
                        v-model="item.descript" rows="3"
                        @input="judgeContentWord('lifeInfo',index)"
                        placeholder="添加对此图片的文字描述"></textarea>
              <textarea v-show="customerInfo.status === 1" disabled class="w100per" v-model="item.descript" rows="3" placeholder=""></textarea>
            </div>
          </div>
        </div>
        <div class="add-new" v-show="customerInfo.status !== 1" @click="addInfor(2)">+</div>
      </div>-->
      <!-- <div class="templete-item">
        <div class="text-center mb16 mt16">用户心声</div>
        <div class="tip-style" v-show="customerInfo.status !== 1">编辑图文，描述用户产品使用场景</div>
        <div class="appendArea">
          <div class="append-item" v-for="(item, index) in customerInfo.userwordInfo" :key="index">
            <div class="img-show">
              <div v-show="customerInfo.status !== 1">
                <b-wx-upload
                  :maxLength="-1"
                  @imageuploaded="(data, fileList)=>imageuploaded(data, fileList, item)"
                  :uploadFn="uploadImgFn"
                  @errorhandle="uploadError"
                >
                </b-wx-upload>
              </div>
              <div v-show="item.url === ''" class="add-tag">+</div>
              <img v-show="item.url!=''" :src="item.url" alt="">
            </div>
            <div class="text-input">
              <textarea class="w100per" v-show="customerInfo.status !== 1"
                        v-model="item.descript"
                        @input="judgeContentWord('userwordInfo',index)"
                        rows="3" placeholder="添加对此图片的文字描述"></textarea>
              <textarea class="w100per" v-show="customerInfo.status === 1" disabled v-model="item.descript" rows="3"></textarea>
            </div>
          </div>
        </div>
        <div class="add-new" v-show="customerInfo.status !== 1" @click="addInfor(3)">+</div>
      </div>-->
      <div class="bottomThreeClass">
        <div class="switch-item">
          <div class="switch-info">
            <div class="fs28 text-666">用户是否同意在企业内部宣传展示</div>
            <div class="fs24 text-999">用户姓名、地址、电话严格保密，不会展示</div>
          </div>
          <md-switch v-show="customerInfo.status !== 1" v-model="switch1"></md-switch>
          <md-switch v-show="customerInfo.status === 1" v-model="switch1" disabled></md-switch>
        </div>
        <!-- <div class="switch-item">
          <div class="switch-info">
            <div class="fs28 text-666">提交申请作为优秀服务案例</div>
            <div class="fs24 text-999">勾选后，将提交中心和总部人员进行审核</div>
          </div>
          <md-switch v-show="customerInfo.status !== 1" v-model="switch2"></md-switch>
          <md-switch v-show="customerInfo.status === 1" v-model="switch2" disabled></md-switch>
        </div>-->
        <!--    底部按钮-->
        <div class="footer">
          <template>
            <div
              v-show="customerInfo.status !== 1"
              class="md-example-child md-example-child-button"
            >
              <div class="md-example-section">
                <md-button type="primary" class="wp48" inline plain @click="submitBack(0)">取消</md-button>
                <md-button type="primary" class="wp48" inline @click="submit(1)">保存</md-button>
                <!--            <md-button type="primary" inline plain >预览</md-button>-->
              </div>
            </div>
            <div
              v-show="customerInfo.status === 1"
              class="md-example-child md-example-child-button"
            >
              <div class="md-example-section">
                <md-button type="primary" class="wp48" inline plain @click="submitBack(0)">取消</md-button>
                <md-button type="primary" class="wp48" inline @click="submit(1)">确认修改</md-button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- SelectPhotosTools -->
    <select-photos-tools
      :showMask="showMaska"
      @clickCloseMask="clickCloseMask"
      @insertList="insertList"
    ></select-photos-tools>
  </div>
</template>

<script>
import {
  Toast,
  Popup,
  PopupTitleBar,
  Button,
  Icon,
  ImageReader,
  Switch,
  Tag,
  Dialog,
  TextareaItem,
  Field
} from 'mand-mobile';
import {
  BUpload, BWxUpload
} from '@/components/form';

import {
  SelectPhotosTools
} from '@/components/houseService';

import {
  RichEditor
} from '@/components/haierHouse';

export default {
  name: 'CompleteServiceStory',
  components: {
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [ImageReader.name]: ImageReader,
    [Switch.name]: Switch,
    [BUpload.name]: BUpload,
    [BWxUpload.name]: BWxUpload,
    [Tag.name]: Tag,
    [TextareaItem.name]: TextareaItem,
    [Field.name]: Field,
    [SelectPhotosTools.name]: SelectPhotosTools,
    [RichEditor.name]: RichEditor
  },
  data() {
    return {
      showMaska: false,
      slotDialog: {
        open: false,
        btns: [
          {
            text: '好的'
          }
        ]
      },
      isAddState: false,
      uploadUrl: '/api/file/simpleUpload',
      headers: {
        Authorization: ''
      },
      imgList: [],
      switch1: true,
      switch2: true,
      defaultInfo: {},
      customerInfo: {
        coverImage: '',
        title: '',
        content: '',
        mainbody: '',
        tag: '',
        authorizeFlag: 1,
        applyFlag: 1,
        heartInfo: [
          {
            url: '',
            descript: ''
          }
        ],
        lifeInfo: [
          {
            url: '',
            descript: ''
          }
        ],
        userwordInfo: [
          {
            url: '',
            descript: ''
          }
        ]
      }
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.headers.Authorization = `Bearer  ${localStorage.getItem(
      'acces_token'
    )}`;
    if (this.$route.query.planId) {
      this.customerInfo.planId = this.$route.query.planId;
    }
    if (this.$route.query.editor == 'true') {
      this.customerInfo.status = 1;
      // 编辑入户，先请求故事x详情信息
      this.houseService
        .searchStoryByPlanId({
          planId: this.customerInfo.planId
        })
        .then((res) => {
          if (res.code === 1) {
            this.customerInfo.id = res.data.id;
            this.customerInfo.content = res.data.content;
            this.customerInfo.title = res.data.title;
            this.isAddState = true;
          }
        });
    }
    if (this.$route.query.customerId) {
      this.customerInfo.customerId = this.$route.query.customerId;
    }
  },
  methods: {
    // 获取文本中的图片地址 默认取第一张 没有就提示
    getimgsrc(htmlstr) {
      const reg = /<img(\s|\S)*src="(\S*)"(\s|\S)*>/;
      const matchAy = htmlstr.match(reg);
      if (matchAy && matchAy.length) {
        return matchAy[2] || '';
      }
    },
    // 确定插入
    insertList(data) {
      debugger;
      this.imgList = data;
      this.showMaska = false;
    },
    // 取消
    clickCloseMask() {
      this.showMaska = false;
    },

    closeBtn() {
      this.$emit('cancel');
      this.closeMask();
    },
    dangerBtn() {
      this.$emit('danger');
      this.closeMask();
    },
    confirmBtn() {
      this.$emit('confirm');
      this.closeMask();
    },
    // 添加图片
    addAction() {
      this.showMaska = true;
    },
    judgeTitleWord() {
      if (this.customerInfo.title.length > 20) {
        Toast.failed('最多输入20个字符！');
        this.customerInfo.title = this.customerInfo.title.substring(0, 20);
      }
    },
    judgemainbodyWord() {
      if (this.customerInfo.mainbody.length > 200) {
        Toast.failed('最多输入200个字符！');
        this.customerInfo.mainbody = this.customerInfo.mainbody.substring(
          0,
          200
        );
      }
    },
    judgeContentWord(key, index) {
      if (this.customerInfo[key][index].descript.length > 100) {
        Toast.failed('最多输入100个字符！');
        this.customerInfo[key][index].descript = this.customerInfo[key][
          index
        ].descript.substring(0, 100);
      }
    },
    addInfor(index) {
      const obj = {
        url: '',
        descript: ''
      };
      if (index == 1) {
        this.customerInfo.heartInfo.push(obj);
      }
      if (index == 2) {
        this.customerInfo.lifeInfo.push(obj);
      }
      if (index == 3) {
        this.customerInfo.userwordInfo.push(obj);
      }
    },
    submitBack() {
      this.$mBack();
    },
    submit(status) {
      const coverImage = this.getimgsrc(this.customerInfo.content);
      if (coverImage) {
        this.customerInfo.coverImage = coverImage;
      }


      if (this.customerInfo.coverImage === '') {
        Toast.failed('请上传封面图片！');
        return;
      }
      if (this.customerInfo.title === '') {
        Toast.failed('请输入故事标题！');
        return;
      }
      if (this.customerInfo.content === '') {
        Toast.failed('请输入故事内容！');
        return;
      }
      if (!this.isAddState) {
        // 新增
        this.houseService.addStory(this.customerInfo).then((res) => {
          debugger;
          if (res.code === 1) {
            // if (status === 0) {
            //   Toast.succeed('暂存成功');
            //   setTimeout(() => {
            //     this.$router.go(-1);
            //     // this.$destroy();
            //   }, 500);
            // } else {
            Toast.succeed('提交成功');
            this.$mBack();

            this.houseService
              .completeStory({
                planId: this.customerInfo.planId
              })
              .then((res) => {
                if (res.code === 1) {
                  setTimeout(() => {
                    this.$router.go(-1);
                    // this.$destroy();
                  }, 500);
                }
              });
          }
          // }
        });
      } else if (this.isAddState) {
        this.customerInfo;
        // 修改
        this.houseService.modifyStory(this.customerInfo).then((res) => {
          if (res.code === 1) {
            Toast.succeed('提交成功');
            this.$mBack();
            this.houseService
              .completeStory({
                planId: this.customerInfo.planId
              })
              .then((res) => {
                if (res.code === 1) {
                  debugger;
                  setTimeout(() => {
                    // this.$router.go(-1);
                    // this.$destroy();
                  }, 500);
                }
              });
          }
          // }
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    uploadImgFn(mediaId) {
      return this.basicService.uploadByMediaId(
        {},
        {
          mediaId
        }
      );
    },
    imageuploaded(data, fileList, item) {
      if (data.code === 1) {
        // 上传成功
        if (item) {
          item.url = data.data;
        } else {
          this.customerInfo.coverImage = data.data;
        }
        // fileList.push(data.data);
      }
    },
    uploadError(res) {
      /* 上传错误 */
      const errorObj = {
        'FILE IS TOO LARGER MAX FILE IS': '图片最大不能超过5M'
      };
      for (const p in errorObj) {
        if (new RegExp(p).test(res)) {
          Toast.failed(errorObj[p]);
          return;
        }
      }
      Toast.failed(res || '上传失败');
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();
  }
};
</script>
<style lang="scss">
textarea:disabled,
input:disabled {
  background: #fff;
}
.app-container {
  background: white;
}
.service-story {
  .dasfgh {
    .editable {
      // height: 800px;
    }
  }
}
.service-story .g-core-image-upload-btn {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}
.service-story .click-upload {
  width: 140px;
  height: 140px;
  position: absolute;
  left: 0;
  top: 0;
}
.face-show {
  position: relative;
  .img-show {
    background: #ebebeb;
    height: 400px;
    .add-icon {
      height: 100%;
      color: #d0d0d0;
      font-size: 200px;
      text-align: center;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img-change {
    background: #fff;
    color: #333;
    padding: 10px 10px;
    border-radius: 6px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: block;
    .click-upload {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
.content {
  padding: 24px;
  background: #fff;
  .title {
    padding-right: 10px;
    border-bottom: 1px solid #eeeeee;
    input {
      background: rgba(0, 0, 0, 0);
      border: none;
      margin: 24px 0;
      width: 100%;
      font-size: 32px;
      font-weight: bold;
    }
    div {
      text-align: center;
      font-size: 24px;
      color: #999;
    }
  }
  .mainbody {
    position: relative;
    input {
      background: rgba(0, 0, 0, 0);
      border: none;
      // margin: 24px 0;
      width: 100%;
      font-size: 32px;
      // font-weight: bold;
    }
    .addBtnClass {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .addBtnClass img {
      width: 47px;
      height: 47px;
    }
  }
  .templete-item {
    .tip-style {
      width: 100%;
      padding: 24px;
      background: #dcdcdc;
      color: #333;
      font-size: 28px;
      margin-bottom: 16px;
      border: none;
    }
    .append-item {
      display: flex;
      justify-content: space-between;
      .img-show {
        position: relative;
        width: 140px;
        height: 140px;
        margin-right: 16px;
        .add-tag {
          height: 100%;
          color: #d0d0d0;
          background: #ebebeb;
          font-size: 100px;
          text-align: center;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text-input {
        flex-grow: 1;
        textarea {
          padding: 24px;
          font-size: 28px;
          height: 140px;
          color: #333;
          border: none;
        }
      }
    }
    .add-new {
      width: 60px;
      height: 60px;
      text-align: center;
      font-size: 50px;
      font-weight: bold;
      margin: 0 auto;
      color: #fff;
      background: #1969c6;
      line-height: 58px;
      border-radius: 50%;
    }
  }
  .switch-item {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
  }
}

.footer {
  padding: 24px;
  .md-example-section {
    display: flex;
    justify-content: space-between;
    button {
      height: 84px;
    }
  }
}
.wp48 {
  width: 48%;
}
.wp96 {
  width: 96%;
}
.br-b {
  border-bottom: 1px solid #d0d0d0;
}
.ml10 {
  margin-left: 10px;
}
.mt16 {
  margin-top: 16px;
}
.mbn {
  margin-bottom: 0 !important;
}
.lh36 {
  line-height: 36px;
}
.lh60 {
  line-height: 60px;
}
.fs24 {
  font-size: 24px;
}
.fs28 {
  font-size: 28px;
}
.fs30 {
  font-size: 30px;
}
.fs34 {
  font-size: 34px;
}
.icon-color {
  color: #4a90e2;
}
.text-333 {
  color: #333333;
}
.text-666 {
  color: #666666;
}
.text-999 {
  color: #999999;
}
.text-ccc {
  color: #cccccc;
}
.text-primary {
  color: #1969c6;
}
.text-danger {
  color: #ff0000;
}
.text-bold {
  font-weight: bold;
}
.bottomThreeClass {
  margin-top: 30px;
  // position: absolute;
  // bottom: 10px;
  // width: 95%;
  // padding-left: 10px;
  // padding-right: 10px;
}
</style>
<style lang="scss" scoped>
</style>

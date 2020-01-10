<template xmlns:v-slot="">
  <div class="service-story">
    <div class="face-show">
      <div class="img-show">
<!--        <div v-show="customerInfo.coverImage === ''" class="add-icon">+</div>-->
        <img v-show="customerInfo.coverImage !== ''" :src="customerInfo.coverImage" alt="">
      </div>
      <span v-show="this.customerInfo.status !== 1" class="img-change">
        <!--<b-upload
          :crop="false"
          inputOfFile="file"
          :max-file-size="1024*1024*5"
          :maxWidth="1280"
          :maxLength="-1"
          :compress="70"
          :headers="headers"
          @imageuploaded="(data, fileList)=>imageuploaded(data, fileList)"
          extensions="png,jpg,jpeg,gif"
          :url="uploadUrl"
          :multiple-size="1"
          @errorhandle="uploadError"
        >
        </b-upload>-->
        <b-wx-upload
          :maxLength="-1"
          @imageuploaded="(data, fileList)=>imageuploaded(data, fileList)"
          :uploadFn="uploadImgFn"
          @errorhandle="uploadError"
        >
        </b-wx-upload>
        更换封面图片</span>
    </div>
    <div class="content">
      <div class="title">
        <input type="text" v-show="this.customerInfo.status !== 1"
               v-model="customerInfo.title"
               @input="judgeTitleWord()"
               placeholder="请输入标题">
        <input type="text" v-show="this.customerInfo.status === 1" v-model="customerInfo.title" disabled placeholder="请输入标题">
        <div>{{customerInfo.tag}}</div>
      </div>
      <div class="templete-item">
        <div class="text-center mb16 mt16">心动之选</div>
        <div class="tip-style" v-show="customerInfo.status !== 1">编辑图文，描述用户购机原因</div>
        <div class="appendArea">
          <div class="append-item" v-for="(item, index) in customerInfo.heartInfo" :key="index">
            <div class="img-show">
              <div v-show="customerInfo.status !== 1">
                <!--<b-upload
                  :crop="false"
                  inputOfFile="file"
                  :max-file-size="1024*1024*5"
                  :maxWidth="1280"
                  :maxLength="-1"
                  :compress="70"
                  :headers="headers"
                  @imageuploaded="(data, fileList)=>imageuploaded(data, fileList, item)"
                  extensions="png,jpg,jpeg,gif"
                  :url="uploadUrl"
                  :multiple-size="1"
                  @errorhandle="uploadError"
                >
                </b-upload>-->
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
      </div>
      <div class="templete-item">
        <div class="text-center mb16 mt16">品质生活</div>
        <div class="tip-style" v-show="customerInfo.status !== 1">编辑图文，描述用户产品使用场景</div>
        <div class="appendArea">
          <div class="append-item" v-for="(item, index) in customerInfo.lifeInfo" :key="index">
            <div class="img-show">
              <div v-show="customerInfo.status !== 1">
                <!--<b-upload
                  :crop="false"
                  inputOfFile="file"
                  :max-file-size="1024*1024*5"
                  :maxWidth="1280"
                  :maxLength="-1"
                  :compress="70"
                  :headers="headers"
                  @imageuploaded="(data, fileList)=>imageuploaded(data, fileList, item)"
                  extensions="png,jpg,jpeg,gif"
                  :url="uploadUrl"
                  :multiple-size="1"
                  @errorhandle="uploadError"
                >
                </b-upload>-->
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
      </div>
      <div class="templete-item">
        <div class="text-center mb16 mt16">用户心声</div>
        <div class="tip-style" v-show="customerInfo.status !== 1">编辑图文，描述用户产品使用场景</div>
        <div class="appendArea">
          <div class="append-item" v-for="(item, index) in customerInfo.userwordInfo" :key="index">
            <div class="img-show">
              <div v-show="customerInfo.status !== 1">
               <!-- <b-upload
                  :crop="false"
                  inputOfFile="file"
                  :max-file-size="1024*1024*5"
                  :maxWidth="1280"
                  :maxLength="-1"
                  :compress="70"
                  :headers="headers"
                  @imageuploaded="(data, fileList)=>imageuploaded(data, fileList, item)"
                  extensions="png,jpg,jpeg,gif"
                  :url="uploadUrl"
                  :multiple-size="1"
                  @errorhandle="uploadError"
                >
                </b-upload>-->
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
      </div>
      <div class="switch-item">
        <div class="switch-info">
          <div class="fs28 text-666">用户是否同意在企业内部宣传展示</div>
          <div class="fs24 text-999">用户姓名、地址、电话严格保密，不会展示</div>
        </div>
        <md-switch
          v-show="customerInfo.status !== 1"
          v-model="switch1"
        ></md-switch>
        <md-switch
          v-show="customerInfo.status === 1"
          v-model="switch1"
          disabled
        ></md-switch>
      </div>
      <div class="switch-item">
        <div class="switch-info">
          <div class="fs28 text-666">提交申请作为优秀服务案例</div>
          <div class="fs24 text-999">勾选后，将提交中心和总部人员进行审核</div>
        </div>
        <md-switch
          v-show="customerInfo.status !== 1"
          v-model="switch2"
        ></md-switch>
        <md-switch
          v-show="customerInfo.status === 1"
          v-model="switch2"
          disabled
        ></md-switch>
      </div>
    </div>
    <!--    底部按钮-->
    <div class="footer">
      <template>
        <div v-show="customerInfo.status !== 1" class="md-example-child  md-example-child-button">
          <div class="md-example-section">
            <md-button type="primary" class="wp48" inline @click="submit(1)">提交</md-button>
            <md-button type="primary" class="wp48" inline plain @click="submit(0)">暂存</md-button>
<!--            <md-button type="primary" inline plain >预览</md-button>-->
          </div>
        </div>
        <div v-show="customerInfo.status === 1" class="md-example-child  md-example-child-button">
          <div class="md-example-section">
            <md-button class="w100per" type="primary" inline @click="goBack">返回</md-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {
  Toast, Popup, PopupTitleBar, Button, Icon, ImageReader, Switch
} from 'mand-mobile';
import {
  BUpload,
  BWxUpload
} from '@/components/form';

export default {
  name: 'CompleteServiceStory',
  components: {
    Toast,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [ImageReader.name]: ImageReader,
    [Switch.name]: Switch,
    BUpload,
    BWxUpload
  },
  data() {
    return {
      isAddState: false,
      uploadUrl: '/api/file/simpleUpload',
      headers: {
        Authorization: ''
      },
      switch1: true,
      switch2: true,
      defaultInfo: {},
      customerInfo: {
        coverImage: '',
        title: '',
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
  computed: {
  },
  mounted() {
  },
  created() {
    this.headers.Authorization = `Bearer  ${localStorage.getItem('acces_token')}`;
    if (this.$route.query.planId) {
      this.customerInfo.planId = this.$route.query.planId;
      this.houseService.searchStoryByPlanId({
        planId: this.customerInfo.planId
      }).then((res) => {
        if (res.code === 1) {
          debugger;
          if (res.data === null) {
            this.isAddState = false;
          } else {
            this.isAddState = true;
            this.customerInfo = res.data;
            const obj = JSON.parse(this.customerInfo.content);
            this.customerInfo.heartInfo = obj.heartInfo;
            this.customerInfo.lifeInfo = obj.lifeInfo;
            this.customerInfo.userwordInfo = obj.userwordInfo;
          }
          return res;
        }
      }).then(() => {
        // 查询直销员信息
        this.basicService.userInfo().then((res) => {
          if (res.code === 1) {
            const storeName = res.data.storeInfo.storeName;
            const username = res.data.username;
            this.customerInfo.tag = `${storeName}/${username}`;
            console.log(this.customerInfo);
          }
        });
      });
    }
  },
  methods: {
    judgeTitleWord() {
      if (this.customerInfo.title.length > 20) {
        Toast.failed('最多输入20个字符！');
        this.customerInfo.title = this.customerInfo.title.substring(0, 20);
      }
    },
    judgeContentWord(key, index) {
      if (this.customerInfo[key][index].descript.length > 100) {
        Toast.failed('最多输入100个字符！');
        this.customerInfo[key][index].descript = this.customerInfo[key][index].descript.substring(0, 100);
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
    submit(status) {
      this.customerInfo.authorizeFlag = this.switch1 === true ? 1 : 0;
      this.customerInfo.applyFlag = this.switch2 === true ? 1 : 0;
      this.customerInfo.status = status;
      const content = {
        heartInfo: this.customerInfo.heartInfo,
        lifeInfo: this.customerInfo.lifeInfo,
        userwordInfo: this.customerInfo.userwordInfo,
      };
      this.customerInfo.content = JSON.stringify(content);
      if (status === 1) {
        if (this.customerInfo.coverImage === '') {
          Toast.failed('请上传封面图片！');
          this.customerInfo.status = 0
          return;
        }
        if (this.customerInfo.title === '') {
          Toast.failed('请输入故事标题！');
          this.customerInfo.status = 0
          return;
        }
        if (this.customerInfo.content === '{"heartInfo":[{"url":"","descript":""}],"lifeInfo":[{"url":"","descript":""}],"userwordInfo":[{"url":"","descript":""}]}') {
          Toast.failed('请输入故事内容！');
          this.customerInfo.status = 0
          return;
        }
      }
      if (!this.isAddState) { // 新增
        this.houseService.addStory(this.customerInfo).then((res) => {
          if (res.code === 1) {
            if (status === 0) {
              Toast.succeed('暂存成功');
              setTimeout(() => {
                this.$router.go(-1);
                this.$destroy();
              }, 500);
            } else {
              Toast.succeed('提交成功');
              this.houseService.completeStory({
                planId: this.customerInfo.planId
              }).then((res) => {
                if (res.code === 1) {
                  setTimeout(() => {
                    this.$router.go(-1);
                    this.$destroy();
                  }, 500);
                }
              });
            }
          }
        });
      } else if (this.isAddState) { // 修改
        this.houseService.modifyStory(this.customerInfo).then((res) => {
          if (res.code === 1) {
            if (status === 0) {
              Toast.succeed('暂存成功');
              setTimeout(() => {
                this.$router.go(-1);
                this.$destroy();
              }, 500);
            } else {
              Toast.succeed('提交成功');
              this.houseService.completeStory({
                planId: this.customerInfo.planId
              }).then((res) => {
                if (res.code === 1) {
                  setTimeout(() => {
                    this.$router.go(-1);
                    this.$destroy();
                  }, 500);
                }
              });
            }
          }
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    uploadImgFn(mediaId) {
      return this.basicService.uploadByMediaId({}, {
        mediaId
      });
    },
    imageuploaded(data, fileList, item) {
      if (data.code === 1) { // 上传成功
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
  textarea:disabled, input:disabled{
    background: #fff;
  }
  .service-story .g-core-image-upload-btn{
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
  .face-show{
    position: relative;
    .img-show{
      background: #EBEBEB;
      height: 400px;
      .add-icon{
        height: 100%;
        color: #D0D0D0;
        font-size: 200px;
        text-align: center;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img-change{
      background: #fff;
      color: #333;
      padding: 10px 10px;
      border-radius: 6px;
      position: absolute;
      bottom: 20px;
      right: 20px;
      display: block;
      .click-upload{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
  .content{
    padding: 24px;
    /*background: #fff;*/
    .title{
      input{
        background: rgba(0,0,0,0);
        border: none;
        margin: 24px 0;
        width: 100%;
        text-align: center;
        font-size: 32px;
        font-weight: bold;
      }
      div{
        text-align: center;
        font-size: 24px;
        color: #999;
      }
    }
    .templete-item{
      .tip-style{
        width: 100%;
        padding: 24px;
        background: #dcdcdc;
        color: #333;
        font-size: 28px;
        margin-bottom: 16px;
        border: none;
      }
      .append-item{
        display: flex;
        justify-content: space-between;
        .img-show{
          position: relative;
          width: 140px;
          height: 140px;
          margin-right: 16px;
          .add-tag{
            height: 100%;
            color: #D0D0D0;
            background: #ebebeb;
            font-size: 100px;
            text-align: center;
          }
          img{
            width: 100%;
            height: 100%;
          }
        }
        .text-input{
          flex-grow: 1;
          textarea{
            padding: 24px;
            font-size: 28px;
            height: 140px;
            color: #333;
            border: none;
          }
        }
      }
      .add-new{
        width: 60px;
        height: 60px;
        text-align: center;
        font-size: 50px;
        font-weight: bold;
        margin: 0 auto;
        color: #fff;
        background: #1969C6;
        line-height: 58px;
        border-radius: 50%;
      }
    }
    .switch-item{
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
  .wp48{
    width: 48%;
  }
  .wp96{
    width: 96%;
  }
  .br-b{
    border-bottom: 1px solid #D0D0D0;
  }
  .ml10{
    margin-left: 10px;
  }
  .mt16{
    margin-top: 16px;
  }
  .mbn{
    margin-bottom: 0!important;
  }
  .lh36{
    line-height: 36px;
  }
  .lh60{
    line-height: 60px;
  }
  .fs24{
    font-size: 24px;
  }
  .fs28{
    font-size: 28px;
  }
  .fs30{
    font-size: 30px;
  }
  .fs34{
    font-size: 34px;
  }
  .icon-color{
    color: #4A90E2;
  }
  .text-333{
    color: #333333;
  }
  .text-666{
    color: #666666;
  }
  .text-999{
    color: #999999;
  }
  .text-ccc{
    color: #CCCCCC;
  }
  .text-primary{
    color: #1969C6;
  }
  .text-danger{
    color: #FF0000;
  }
  .text-bold{
    font-weight: bold;
  }
</style>

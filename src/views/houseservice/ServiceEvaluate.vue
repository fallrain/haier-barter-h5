<template>
  <div style="padding-bottom: 60px;">
    <div class="content-header">
      您的满意，是我们前进的方向，请您根据实际感受，留下 您的反馈和建议吧~
    </div>
    <div class="evaluate-point">
      <div class="evaluate-title">为{{servicerName}}的上门服务打分</div>
      <div class="star-style">
        <div class="start-item" @click="clickStar(1)">
          <img v-show="customerInfo.score > 0" src="@/assets/images/houseServicer/star.png" alt="" class="">
          <img v-show="customerInfo.score < 1" src="@/assets/images/houseServicer/star_default.png" alt="" class="">
        </div>
        <div class="start-item" @click="clickStar(2)">
          <img v-show="customerInfo.score > 1" src="@/assets/images/houseServicer/star.png" alt="" class="">
          <img v-show="customerInfo.score < 2" src="@/assets/images/houseServicer/star_default.png" alt="" class="">
        </div>
        <div class="start-item" @click="clickStar(3)">
          <img v-show="customerInfo.score > 2" src="@/assets/images/houseServicer/star.png" alt="" class="">
          <img v-show="customerInfo.score < 3" src="@/assets/images/houseServicer/star_default.png" alt="" class="">
        </div>
        <div class="start-item" @click="clickStar(4)">
          <img v-show="customerInfo.score > 3" src="@/assets/images/houseServicer/star.png" alt="" class="">
          <img v-show="customerInfo.score < 4" src="@/assets/images/houseServicer/star_default.png" alt="" class="">
        </div>
        <div class="start-item" @click="clickStar(5)">
          <img v-show="customerInfo.score > 4" src="@/assets/images/houseServicer/star.png" alt="" class="">
          <img v-show="customerInfo.score < 5" src="@/assets/images/houseServicer/star_default.png" alt="" class="">
        </div>
      </div>
    </div>
    <div class="content-header">
      您认为您的专属服务顾问还需要提升以下哪方面的能力 后会更加优秀？
    </div>
    <div class="tag-content">
      <span :class="[{ active: tagList.indexOf('1')>-1 }, 'tag-item']" @click="clickTag('1')">服务态度</span>
      <span :class="[{ active: tagList.indexOf('2')>-1 }, 'tag-item']" @click="clickTag('2')">服务流程</span>
      <span :class="[{ active: tagList.indexOf('3')>-1 }, 'tag-item']" @click="clickTag('3')">服务质量</span>
      <span :class="[{ active: tagList.indexOf('4')>-1 }, 'tag-item']" @click="clickTag('4')">人员素质</span>
    </div>
    <div class="evaluate-fb">评价内容</div>
    <div class="evaluate-content">
      <textarea rows="5" class="w100per"
                @input="dealKeyWord"
                v-model="customerInfo.description"
                placeholder="请输入您的评价内容（可不填）"></textarea>
    </div>
    <div class="md-example-child  md-example-child-button md-example-child-button-3">
      <div class="md-example-section">
        <md-button type="primary" inline plain @click="dealCancle">取消</md-button>
        <md-button type="primary" inline @click="dealSave">保存</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Toast,
  Button
} from 'mand-mobile';

export default {
  name: 'SearchProduct',
  components: {
    [Button.name]: Button,
  },
  created() {
    if (this.$route.query.planId) {
      this.customerInfo.planId = this.$route.query.planId;
      this.customerInfo.userId = this.$route.query.userId;
      this.customerInfo.userName = this.$route.query.userName;
      this.servicerName = this.$route.query.servicerName;
    }
  },
  data() {
    return {
      servicerName: '',
      customerInfo: {
        planId: '',
        userId: '',
        userName: '',
        score: 0,
        improve: [],
        description: ''
      },
      tagList: []
    };
  },
  methods: {
    clickStar(score) {
      this.customerInfo.score = score;
    },
    clickTag(tag) {
      const offset = this.tagList.indexOf(tag);
      if (offset < 0) {
        this.tagList.push(tag);
      } else {
        this.tagList.splice(offset, 1);
      }
    },
    dealKeyWord() {
      if (this.customerInfo.description.length > 200) {
        Toast.failed('最多输入200个字');
        this.customerInfo.description = this.customerInfo.description.substr(0, 200);
      }
    },
    dealSave() {
      if (this.customerInfo.score === 0) {
        Toast.failed('请为本次服务打分！');
        return;
      }
      if (this.tagList.length > 0) {
        this.tagList.sort();
        this.customerInfo.improve = this.tagList.join(',');
      }
      this.houseService.appraiseAdd({
        ...this.customerInfo
      }).then(res => res).then((res) => {
        if (res.code === 1) {
          this.houseService.completeAppraise({
            planId: this.customerInfo.planId
          }).then((res1) => {
            if (res1.code === 1) {
              Toast.succeed('评价成功！谢谢~~');
              this.$router.go(-1);
            }
          });
        }
      });
    },
    dealCancle() {
      this.$router.go(-1);
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();// 必须要有这个，否则无法跳转
  },
};
</script>

<style lang="scss">
  .content-header{
    color: #333;
    font-size: 28px;
    line-height: 40px;
    padding: 23px 25px ;
  }
  .evaluate-point{
    text-align: center;
    color: #999;
    background: #fff;
    padding: 30px;
    .star-style{
      text-align: center;
      .start-item{
        width: 66px;
        height: 61px;
        display: inline-block;
        position: relative;
        margin-right: 24px;
        margin-top: 50px;
        img{
          position: absolute;
          left: 0px;
          top: 0px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .evaluate-content{
    textarea{
      border: none;
      padding: 24px 25px;
      color: #666;
    }
  }
  .tag-content{
    padding: 24px;
    text-align: center;
    background: #fff;
    .tag-item{
      font-size: 24px;
      margin-right: 30px;
      padding: 7px;
      border: 1px solid #666;
      border-radius: 5px;
      color: #666;
    }
    .tag-item.active{
      color: #1969C6;
      border-color: #1969C6;
    }
  }
  .evaluate-fb{
    font-size:30px;
    font-weight:bold;
    color:#333;
    line-height:70px;
    height: 70px;
    padding-left: 20px;
  }
  .md-example-child{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 24px;
    button{
      width: 50%;
    }
  }
</style>

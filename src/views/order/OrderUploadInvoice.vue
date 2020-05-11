<template>
  <div>
    <b-notice-bar
      :show.sync="noticeShow"
      content="温馨提示：因微信版本接口bug，若发票上传请求失败，请退出兑呗，并将微信升级为最新版本，再重新登录兑呗！"
      type="error"
    >
    </b-notice-bar>
    <div class="orderUploadInvoice">
      <div v-if="isMustUploadInvoice">
        <div class="orderUploadInvoice-head">请选择领取权益方式</div>
        <div class="orderUploadInvoice-head-radio-wrap">
          <b-radio-item
            class="orderUploadInvoice-head-radios"
            :inline="true"
            :list="uploadTypes"
            v-model="rightsReceiveType"
          ></b-radio-item>
        </div>
      </div>
      <div v-show="rightsReceiveType===1 || !isMustUploadInvoice">
        <div class="orderUploadInvoice-head mt23">
          <span>上传产品购机凭证</span>
          <span
            class="orderUploadInvoice-head-btn"
            @click="showExample"
          >查看示例</span>
        </div>
        <div class="orderUploadInvoice-cnt">
          <b-product-mult-upload
            :products="products"
            v-model="invoiceImg"
            @uploadSuccess="uploadSuccess"
            @uploadErr="uploadErr"
            @delImg="delImg"
            @imgClick="imgClick"
          ></b-product-mult-upload>
        </div>
      </div>
      <div class="orderUploadInvoice-tips mt16">
        <p class="orderUploadInvoice-tips-title">温馨提示：</p>
        <p>{{warmTips}}</p>
      </div>
      <div
        class="orderUploadInvoice-question mt16"
        v-show="rightsReceiveType!==2"
      >
        <p class="orderUploadInvoice-question-title">问题解答：</p>
        <ul>
          <li
            class="orderUploadInvoice-question-item"
          >
            <p class="orderUploadInvoice-question-item-q">
              Q1、为什么需要上传购机凭证
            </p>
            <p class="orderUploadInvoice-question-item-answer">
              A：通过购机凭证校验销售订单的真实性
            </p>
          </li>
          <li
            class="orderUploadInvoice-question-item"
          >
            <p class="orderUploadInvoice-question-item-q">
              Q2、购机凭证都支持哪些类型
            </p>
            <p class="orderUploadInvoice-question-item-answer">
              A：上传购机凭证包括：发票、购机小票、系统订单截图
            </p>
          </li>
        </ul>
      </div>
      <div class="orderEntry-btns-par">
        <button
          v-if="!isMustUploadInvoice"
          type="button"
          class="common-submit-btn-primary"
          @click="skipUpload"
        >跳过
        </button>
        <button
          v-else
          type="button"
          class="common-submit-btn-primary"
          @click="$mBack"
        >上一步
        </button>
        <button
          v-show="rightsReceiveType===1 || !isMustUploadInvoice"
          type="button"
          class="common-submit-btn-default"
          @click="updateSubmit"
        >上传凭证
        </button>
        <button
          v-show="rightsReceiveType===2"
          type="button"
          class="common-submit-btn-default"
          @click="updateSubmit"
        >下一步
        </button>
      </div>
    </div>
    <b-swiper
      :show.sync="isShowInvoice"
      :imgs="invoiceExampleList"
    ></b-swiper>
    <b-swiper
      :show.sync="invoicePreviewShow"
      :imgs="invoiceImgList"
      ref="bSwiper"
    ></b-swiper>
  </div>
</template>

<script>
import {
  Toast
} from 'mand-mobile';

import {
  BProductMultUpload
} from '@/components/business';

import {
  mapGetters
} from 'vuex';

import {
  GET_USER
} from '@/store/mutationsTypes';

import {
  BNoticeBar,
  BRadioItem
} from '@/components/form';
import BSwiper from '../../components/form/BSwiper';

import invoiceExample1 from '@/assets/images/uploadInvoice/invoiceExample1@2x.jpg';
import invoiceExample2 from '@/assets/images/uploadInvoice/invoiceExample2@2x.jpg';
import invoiceExample3 from '@/assets/images/uploadInvoice/invoiceExample3@2x.jpg';

export default {
  name: 'OrderUploadInvoice',
  components: {
    BSwiper,
    BRadioItem,
    BNoticeBar,
    BProductMultUpload,
  },
  data() {
    return {
      // isUpload: false, // 是否必须上传发票标识
      invoiceList: [],
      fileMap: {},
      // 上传类型类型单选
      uploadTypes: [
        {
          key: 1,
          value: '上传发票'
        },
        {
          key: 2,
          value: '用户扫机身码'
        }
      ],
      // 权益领取方式（0：默认，1：上传发票，2：用户扫机身码）
      rightsReceiveType: 0,
      // 产品
      products: [],
      // 发票图片地址
      invoiceImg: [],
      orderNo: '',
      // 必须上传发票
      isMustUploadInvoice: false,
      // 提示显示隐藏
      noticeShow: true,
      // 预览发票显示隐藏
      invoicePreviewShow: false,
      // 预览的图片列表
      invoiceImgList: [],
      // 轮播默认的索引
      invoiceDefaultIndex: 0,
      // 是否显示发票示例
      isShowInvoice: false,
      // 发票图片数组
      invoiceExampleList: []
    };
  },
  activated() {
    console.log('tag', this.$route.params);
    if (this.$route.params.orderNo) {
      this.orderNo = this.$route.params.orderNo;
      this.orderFollowId = this.$route.params.orderFollowId;
      this.getData();
    }
    // 去掉是否必须上传发票标识判断
    // if (this.$route.params.subInfo) {
    //   const subInfo = this.$route.params.subInfo;
    //   if (subInfo.rightsUserJson !== '' || subInfo.orderType === 1) {
    //     this.isUpload = true;
    //   } else {
    //     this.isUpload = false;
    //   }
    // }
  },
  computed: {
    ...mapGetters([
      GET_USER
    ]),
    warmTips() {
      /* 温馨提示 */
      let tips = '';
      const rightsTips = '包含权益的订单必须上传购机凭证。';
      if (this.isMustUploadInvoice) {
        tips = {
          1: rightsTips,
          2: '用户扫码激活后才可领取权益'
        }[this.rightsReceiveType];
      } else {
        tips = rightsTips;
      }
      return tips;
    }
  },
  methods: {
    showExample() {
      /* 显示发票示例 */
      this.isShowInvoice = true;
      this.invoiceExampleList = [

        {
          src: invoiceExample1
        },
        {
          src: invoiceExample2
        },
        {
          src: invoiceExample3
        }
      ];
    },
    async checkMustUploadInvoice() {
      /* 检查是否必须上传发票 */
      const { code, data } = await this.orderService.ifUploadInvoice({
        hmcId: this[GET_USER].hmcid,
        orderNo: this.$route.params.orderNo
      });
      if (code === 1) {
        this.isMustUploadInvoice = data;
      }
      return {
        checkCode: code,
        status: data
      };
    },
    skipUpload() {
      /* 跳过 */
      //  if (this.isUpload) {
      //   Toast.failed('套购订单及权益订单必须上传发票，不能“跳过”，否则将无法提交订单和发放权益!');
      //   return;
      // }
      this.$router.push({
        name: 'Order.OrderConfirm',
        params: {
          orderNo: this.orderNo,
          orderFollowId: this.orderFollowId
        }
      });
    },
    uploadSuccess(data, fileMap, product) {
      const orderDetailId = product.id || product.orderDetailId;
      // 存在更新invoiceUrl
      const invoiceObj = this.invoiceList.find(v => v.orderDetailId === orderDetailId);
      if (invoiceObj) {
        invoiceObj.invoiceUrl = data.invoiceUrl;
      }
    },
    imgClick(src) {
      /* 图片点击事件 */
      this.invoiceImgList = this.invoiceList.filter(v => v.invoiceUrl).map(product => ({ src: product.invoiceUrl }));
      // 设置第一个显示的图的索引
      const invoiceDefaultIndex = this.invoiceImgList.findIndex(v => v.src === src);
      this.invoiceDefaultIndex = invoiceDefaultIndex > -1 ? invoiceDefaultIndex : 0;
      this.$refs.bSwiper.$refs.swiper.goto(invoiceDefaultIndex);
      this.invoicePreviewShow = true;
    },
    addInvoiceList(data, id) {
      /* 发票数据添加进发票list */
      const dataTemp = JSON.parse(JSON.stringify(data));
      dataTemp.orderNo = this.orderNo;
      dataTemp.orderDetailId = id;
      dataTemp.invoiceUpload = 1;
      delete dataTemp.id;
      this.invoiceList.push(dataTemp);
    },
    genInvoiceList(products) {
      /* 再次编辑的时候，生成发票列表 */
      this.invoiceList = [];
      if (products) {
        products.forEach((v) => {
          this.addInvoiceList(v, v.id || v.orderDetailId);
        });
      }
    },
    uploadErr() {
      // Toast.failed(msg);
    },
    delImg(fileList, product) {
      /* invoiceList里已经有发票图片重置为null */
      const orderDetailId = product.id || product.orderDetailId;
      const delInvoice = this.invoiceList.find(v => v.orderDetailId === orderDetailId);
      delInvoice.invoiceUrl = null;
    },
    indexOf(val) {
      // todo 毫无意义的代码，以后删除
      for (let i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
      }
      return -1;
    },
    remove(val) {
      const index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    },
    updateSubmit() {
      const invoiceList = JSON.parse(JSON.stringify(this.invoiceList));
      if (this.rightsReceiveType === 2) {
        // 选择扫码，是无需上传的情况，invoiceUrl重置为null
        invoiceList.forEach((v) => {
          v.invoiceUrl = null;
        });
      } else {
        if (!this.invoiceList.find(v => v.invoiceUrl)) {
          Toast.failed('请上传凭证！');
          return;
        }
      }
      this.orderService.uploadInvoice(invoiceList, {
        orderNo: this.orderNo,
        rightsReceiveType: this.rightsReceiveType
      }).then((res) => {
        if (res.code === 1) {
          Toast.succeed('上传成功');
          setTimeout(() => {
            this.$router.push({
              name: 'Order.OrderConfirm',
              params: {
                orderNo: this.orderNo,
                orderFollowId: this.orderFollowId
              }
            });
          }, 800);
        }
      });
    },
    getData() {
      // 改为接口多种情况判断
      const checkMustUploadInvoice = this.checkMustUploadInvoice();
      const queryOrderDetailAndInvoice = this.orderService.queryOrderDetailAndInvoice({}, { orderNo: this.orderNo });
      Promise.all([checkMustUploadInvoice, queryOrderDetailAndInvoice]).then(([
        { status },
        { code, data }
      ]) => {
        if (code === 1) {
          const {
            orderDetailAndInvoiceDtoList,
            rightsReceiveType
          } = data;
          this.products = orderDetailAndInvoiceDtoList;
          // 必须上传的时候，如果rightsReceiveType返回了0，则置为1
          let type;
          if (status && !rightsReceiveType) {
            type = 1;
          } else {
            type = rightsReceiveType || 0;
          }
          this.rightsReceiveType = type;
          // 生成发票
          this.genInvoiceList(this.products);
        }
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Order.OrderEntry' || to.name === 'Order.OrderModify') { // 此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
      localStorage.setItem('invoice', 'true');
      to.params.orderNo = this.orderNo;
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          if (this.$vnode.componentOptions) {
            const key = this.$vnode.key == null
              ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
              : this.$vnode.key;
            const cache = this.$vnode.parent.componentInstance.cache;
            const keys = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                const index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
    }
    next();
  },

};
</script>

<style lang="scss">
  .orderUploadInvoice {
    width: 100%;
    padding: 24px;

    .md-radio-label {
      color: #666;
      font-size: 28px;
    }
  }

  .orderUploadInvoice-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #333;
    font-size: 30px;
    font-weight: 600;
    line-height: 42px;
  }

  .orderUploadInvoice-head-btn {
    color: #1969C6;
    font-size: 24px;
    font-weight: 400;
  }

  .orderUploadInvoice-head-radio-wrap {
    display: flex;
    align-items: center;
    height: 88px;
    background: #fff;
    margin-top: 23px;

    .orderUploadInvoice-head-radios {
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
      padding-left: 70px;
      padding-right: 70px;
    }
  }

  .orderUploadInvoice-cnt {
    margin-top: 23px;
  }

  .orderUploadInvoice-tips {
    padding: 24px;
    font-size: 24px;
    color: #999;
    background: #fff;
    border-radius: 8px;
  }

  .orderUploadInvoice-tips-title {
    color: #F5A623;
    font-size: 28px;
    margin-bottom: 18px;
  }

  .orderUploadInvoice-question {
    padding: 24px;
    background: #fff;
  }

  .orderUploadInvoice-question-title {
    color: #666;
    font-size: 28px;
    margin-top: 4px;
    margin-bottom: 18px;
  }

  .orderUploadInvoice-question-item {
    font-size: 24px;
    line-height: 36px;
  }

  .orderUploadInvoice-question-item-q {
    color: #999;
  }

  .orderUploadInvoice-question-item-answer {
    color: #1969C6;
  }

  .bSwiper-showExample {
    .md-swiper-item {
      width: 100% !important;
    }
  }
</style>

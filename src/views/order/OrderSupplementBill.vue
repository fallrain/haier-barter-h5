<template>
  <!-- 补录票据 -->
  <div class="orderUploadInvoice">
    <div class="orderUploadInvoice-head">上传产品购机凭证</div>
    <div class="orderUploadInvoice-cnt">
      <b-product-mult-upload
        :products="products"
        :merge="uploadType===1"
        v-model="invoiceImg"
        @uploadSuccess="uploadSuccess"
        @uploadErr="uploadErr"
        @delImg="delImg"
      ></b-product-mult-upload>
    </div>
    <div>
      <b-item
        title="申请原因"
        :arrow="true"
        :value="applyReason"
        @rightClick="showApplyReason"
        @arrowClick="showApplyReason"
      ></b-item>
    </div>
    <div class="reason-warning" v-show="applyReasonWarningShow">
      请输入申请补传票据原因
    </div>
    <div class="orderEntry-btns-par">
      <button
        type="button"
        class="common-submit-btn-default"
        @click="updateSubmit"
      >上传凭证
      </button>
    </div>
    <b-pop-check-list
      type="radio"
      :show.sync="applyReasonPopShow"
      title="选择申请原因"
      :list="applyReasonList"
      v-model="applyReasonVal"
    ></b-pop-check-list>
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
    BActivityList,
    BDatePicker,
    BFieldset,
    BItem,
    BOrderProduct,
    BPop,
    BPopAddressList,
    BPopCheckList,
    BRadioItem, BTimeSectionPicker, BOrderProductConfirm
  } from '@/components/form';
  export default {
    name: 'OrderSupplementBill',
    components: {
      BProductMultUpload,
      BPopCheckList,
      BItem
    },
    computed: {
      ...mapGetters([
        GET_USER
      ])
    },
    activated() {
      console.log('tag', this.$route.params);
      if (this.$route.params.orderNo) {
        this.orderNo = this.$route.params.orderNo;
        this.orderFollowId = this.$route.params.orderFollowId;
        this.getData();
      }
    },
    data() {
      return {
        invoiceList: [],
        // 上传类型
        uploadType: 2,
        // 产品
        products: [],
        // 发票图片地址
        invoiceImg: [],
        // 申请原因pop show
        applyReasonPopShow: false,
        // pop 申请原因
        applyReasonList: [
          {
            id: 1,
            name: '录错/录重'
          },
          {
            id: 2,
            name: '3天后获取票据'
          },
          {
            id: 3,
            name: '7天后获取票据'
          },
          {
            id: 4,
            name: '送货时间晚'
          },
          {
            id: 5,
            name: '大型活动获取票据延迟'
          },
          {
            id: 6,
            name: '自定义',
            reason: '',
            placeholder: '请输入申请原因'
          }
        ],
        // 选中的原因id 数组
        applyReasonVal: [],
        applyReasonWarningShow: false
      }
    },
    computed: {
      applyReason() {
        const obj =  this.applyReasonList.find(v => this.applyReasonVal[0] === v.id);
        if(obj){
          this.applyReasonWarningShow = false;
          if(obj.id === 6){
            return obj.reason;
          }
          return obj.name;
        }
        return '';
      }
    },
    methods: {
      showApplyReason() {
        this.applyReasonPopShow = true;
      },
      uploadSuccess(data, fileMap, product) {
        const orderDetailId = product.id || product.orderDetailId;
        // 存在更新invoiceUrl
        const invoiceObj = this.invoiceList.find(v => v.orderDetailId === orderDetailId);
        if (invoiceObj) {
          invoiceObj.invoiceUrl = data.invoiceUrl;
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
      getData() {
        this.orderService.queryOrderDetailAndInvoice({}, { orderNo: this.orderNo }).then(({ code, data }) => {
          if (code === 1) {
            data = data.orderDetailAndInvoiceDtoList;
            console.log("products",data);
            //需求不想显示之前的发票图片
            for(var i=0;i<data.length;i++){
              data[i].invoiceUrl=''
            }
            this.products = data;
            // 生成发票
            this.genInvoiceList(data);
          }
        });
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
      addInvoiceList(data, id) {
        /* 发票数据添加进发票list */
        const dataTemp = JSON.parse(JSON.stringify(data));
        dataTemp.orderNo = this.orderNo;
        dataTemp.orderDetailId = id;
        dataTemp.invoiceUpload = 1;
        delete dataTemp.id;
        this.invoiceList.push(dataTemp);
      },
      updateSubmit() {
        if(!this.applyReason){
          this.applyReasonWarningShow = true;
          return;
        }
        if (!this.invoiceList.find(v => v.invoiceUrl)) {
          Toast.failed('请上传凭证！');
          return;
        }
        this.orderService.hmcUploadInvoiceForOrderFreeze(this.invoiceList, { orderNo: this.orderNo, orderUnfreezeRemark: this.applyReason }).then((res) => {
          if (res.code === 1) {
            Toast.succeed('上传成功');
            setTimeout(() => {
              this.$router.push({
                name: 'Order.OrderFollowSearch',
                params: {
                  refreshPage : true
                }
              });
            }, 800);
          }
        });
      },
    },
  }
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
    color: #333;
    font-size: 28px;
  }

  .orderUploadInvoice-cnt {
    margin-top: 36px;
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

  .reason-warning {
    color: red;
    margin-top: 10px;
    font-size: 24px;
  }
</style>

<template>
  <md-dialog
    class="orderInputCouponsWithProduct-dialog"
    :closable="false"
    v-model="isShow"
    :btns="btns"
    title="消费券核销"
  >
    <div class="orderInputCouponsWithProduct-dialog-cnt">
      <ul class="orderInputCouponsWithProduct-dialog-cnt-list">
        <li
          class="orderInputCouponsWithProduct-dialog-cnt-item"
          v-for="(item) in couponsCodeList"
          :key="item.id"
        >
          <div class="orderInputCouponsWithProduct-dialog-cnt-item-cnt-wrap">
            <div
              class="orderInputCouponsWithProduct-dialog-cnt-item-cnt"
            >
              <span class="orderInputCouponsWithProduct-dialog-cnt-item-product">{{item.productModel}}</span>
              <input
                type="text"
                class="orderInputCouponsWithProduct-dialog-cnt-item-ipt"
                :class="[item.errorMsg && 'error']"
                v-model="item.code"
                maxlength="20"
                v-resetInput
                @input="codeInput(item)"
              >
            </div>
          </div>
          <p
            class="orderInputCouponsWithProduct-dialog-cnt-item-error"
            v-show="item.errorMsg"
          >{{item.errorMsg}}</p>
        </li>
      </ul>
    </div>
  </md-dialog>
</template>

<script>
/**
   * 输入券码并核销组件，券码跟已经选择的产品一一对应显示
   * */
import {
  Dialog
} from 'mand-mobile';

export default {
  name: 'OrderInputCouponsWithProduct',
  components: {
    'md-dialog': Dialog,
  },
  props: {
    /* 显示隐藏 */
    isShow: {
      type: Boolean,
      default: false
    },
    // 直销员手机号
    userPhone: {
      type: String,
      default: '',
      required: true
    },
    // 选择的产品型号数组
    productList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      open: true,
      btns: [
        {
          text: '取消',
          handler: this.couponInputDialogCancel,
        },
        {
          text: '确定',
          handler: this.couponInputDialogConfirm,
        }
      ],
      // 券码数据
      couponsCodeList: []
    };
  },
  watch: {
    isShow(val) {
      this.$emit('update:isShow', val);
      // 关闭的时候清空数据(真不知道需求怎么想的)
      if (val === false) {
        this.couponsCodeList.forEach((v) => {
          v.code = '';
          v.errorMsg = '';
        });
      }
    },
    //
    productList(val) {
      /* 生成卡券列表 */
      this.couponsCodeList = val.map((v, codeIndex) => ({
        id: v.id,
        productModel: v.productModel,
        code: '',
        errorMsg: '',
        // 用来标记哪个产品填了券码，避免遍历
        codeIndex
      }));
    }
  },
  methods: {
    couponInputDialogConfirm() {
      /* 输入优惠券对话框确认 */
      const choseCoupons = [];
      this.couponsCodeList.forEach((v) => {
        const { code } = v;
        if (code && /^\d+$/.test(code)) {
          choseCoupons.push({
            ...v
          });
        }
      });
      // 无核销码视作重置
      if (!choseCoupons.length) {
        this.$emit('confirm', []);
        this.$emit('update:isShow', false);
        return;
      }
      // 提交接口前清空错误
      this.couponsCodeList.forEach((v) => {
        v.errorMsg = '';
      });
      this.orderService.checkAdjCouponNum({
        userPhone: this.userPhone,
        couponNum: choseCoupons.map(v => v.code).join(',')
      }).then(({ code, data, msg }) => {
        if (code === 1) {
          const sendData = choseCoupons.map((v, index) => ({
            ...v,
            ...data[index]
          }));
          this.$emit('confirm', sendData);
          this.$emit('update:isShow', false);
        } else if (code === 2) {
          // 为错误的券码设置提示信息
          data.forEach(({ entryID, msg: errorMsg }) => {
            const coupons = this.couponsCodeList.filter(v => v.code === entryID);
            if (coupons.length) {
              // 错误提示信息
              coupons.forEach((v) => {
                v.errorMsg = errorMsg;
              });
            }
          });
        } else {
          this.$dialog.alert({
            content: msg
          });
        }
      });
    },
    couponInputDialogCancel() {
      /* 输入优惠券对话框取消 */
      this.$emit('update:isShow', false);
    },
    codeInput(item) {
      /* 输入框change */
      item.code = item.code.replace(/\D/g, '');
    }
  }
};
</script>

<style lang="scss">
  .orderInputCouponsWithProduct-dialog {
    .md-dialog-body {
      padding: 20px 24px;
      max-height: 768px;
      overflow: hidden;
    }

    .md-dialog-content {
      width: 660px;
    }

    .md-dialog-title {
      font-size: 36px;
      font-weight: 600;
      text-align: center;
      height: 68px;
      margin-bottom: 0;
    }
  }

  .orderInputCouponsWithProduct-dialog-cnt {
    display: flex;
    max-height: 700px;
    overflow-y: auto;
  }

  $orderInputCouponsWithProduct-dialog-cnt-title-width: 86px;

  .orderInputCouponsWithProduct-dialog-cnt-list {
    width: 100%;
  }

  .orderInputCouponsWithProduct-dialog-cnt-item {
    margin-bottom: 20px;
  }

  .orderInputCouponsWithProduct-dialog-cnt-item-cnt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .orderInputCouponsWithProduct-dialog-cnt-item-cnt-wrap {
    display: flex;
    align-items: center;
  }

  .orderInputCouponsWithProduct-dialog-cnt-item-product{
    color: #333;
    flex-grow: 1;
  }

  $orderInputCouponsWithProduct-dialog-cnt-item-error-color: #F52211;
  .orderInputCouponsWithProduct-dialog-cnt-item-ipt {
    border: 1px solid #ddd;
    width: 370px;
    height: 48px;
    border-radius: 6px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 20px;
    flex-shrink: 0;

    &.error {
      border: 1px solid $orderInputCouponsWithProduct-dialog-cnt-item-error-color;
    }
  }

  .orderInputCouponsWithProduct-dialog-cnt-item-error {
    margin-top: 6px;
    padding-left: 250px;
    color: $orderInputCouponsWithProduct-dialog-cnt-item-error-color;
    font-size: 24px;
    line-height: 1;
  }
</style>

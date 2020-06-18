<template>
  <md-dialog
    class="orderInputCoupons-dialog"
    :closable="false"
    v-model="isShow"
    :btns="btns"
    title="确定核销"
  >
    <div class="orderInputCoupons-dialog-cnt">
      <ul class="orderInputCoupons-dialog-cnt-list">
        <li
          class="orderInputCoupons-dialog-cnt-item"
          v-for="(item,index) in couponsCodeList"
          :key="item.id"
        >
          <div class="orderInputCoupons-dialog-cnt-item-cnt-wrap">
            <div
              class="orderInputCoupons-dialog-cnt-title"
              v-if="!index"
            >券码：
            </div>
            <div
              class="orderInputCoupons-dialog-cnt-item-cnt"
              :class="[index && 'orderInputCoupons-dialog-cnt-item-cnt-ml']"
            >
              <input
                type="text"
                class="orderInputCoupons-dialog-cnt-item-ipt"
                :class="[item.errorMsg && 'error']"
                v-model="item.code"
                maxlength="20"
                v-resetInput
                @input="codeInput(item)"
              >
              <div
                class="orderInputCoupons-dialog-cnt-item-btn-add"
                @click="add(index)"
              >
                <i class="iconfont icon-jiahao1"></i>
              </div>
              <div
                v-if="index || (!index && couponsCodeList.length > 1)"
                class="orderInputCoupons-dialog-cnt-item-btn-del"
                @click="del(index)"
              >
                <i class="iconfont icon-jianquminus24"></i>
              </div>
            </div>
          </div>
          <p
            class="orderInputCoupons-dialog-cnt-item-error"
            v-show="item.errorMsg"
          >{{item.errorMsg}}</p>
        </li>
      </ul>
    </div>
  </md-dialog>
</template>

<script>
/**
   * 输入卡券的组件，可自由输入卡券码，可增加可减少
   * */
import {
  Dialog
} from 'mand-mobile';

export default {
  name: 'OrderInputCoupons',
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
      couponsCodeList: [
        {
          id: new Date().getTime(),
          // 有无错误
          errorMsg: '',
          code: ''
        }
      ]
    };
  },
  watch: {
    isShow(val) {
      this.$emit('update:isShow', val);
      // 关闭的时候清空数据
      if (val === false) {
        this.couponsCodeList = [
          {
            id: new Date().getTime(),
            // 有无错误
            errorMsg: '',
            code: ''
          }
        ];
      }
    }
  },
  methods: {
    couponInputDialogConfirm() {
      /* 输入优惠券对话框确认 */
      const couponNum = [];
      this.couponsCodeList.forEach((v) => {
        const { code } = v;
        if (code && /^\d+$/.test(code)) {
          couponNum.push(code);
        }
      });
      // 无核销码视作重置
      if (!couponNum.length) {
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
        couponNum: couponNum.join(',')
      }).then(({ code, data, msg }) => {
        if (code === 1) {
          this.$emit('confirm', data);
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
    getNewCoupons() {
      return {
        id: new Date().getTime(),
        errorMsg: '',
        code: ''
      };
    },
    add(index) {
      /* 添加一条新的券码输入框 */
      const newCoupons = this.getNewCoupons();
      this.couponsCodeList.splice(index + 1, 0, newCoupons);
    },
    del(index) {
      /* 删除一条 */
      this.couponsCodeList.splice(index, 1);
    },
    codeInput(item) {
      /* 输入框change */
      item.code = item.code.replace(/\D/g, '');
    }
  }
};
</script>

<style lang="scss">
  .orderInputCoupons-dialog {
    .md-dialog-body {
      padding: 20px 16px 20px 16px;
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

  .orderInputCoupons-dialog-cnt {
    display: flex;
    max-height: 700px;
    overflow-y: auto;
  }

  $orderInputCoupons-dialog-cnt-title-width: 86px;
  .orderInputCoupons-dialog-cnt-title {
    width: $orderInputCoupons-dialog-cnt-title-width;
  }

  .orderInputCoupons-dialog-cnt-list {
  }

  .orderInputCoupons-dialog-cnt-item {
    margin-bottom: 20px;
  }

  .orderInputCoupons-dialog-cnt-item-cnt {
    display: flex;
    align-items: center;
  }

  .orderInputCoupons-dialog-cnt-item-cnt-wrap {
    display: flex;
    align-items: center;
  }

  .orderInputCoupons-dialog-cnt-item-cnt-ml {
    margin-left: $orderInputCoupons-dialog-cnt-title-width;
  }

  $orderInputCoupons-dialog-cnt-item-error-color: #F52211;
  .orderInputCoupons-dialog-cnt-item-ipt {
    border: 1px solid #ddd;
    width: 370px;
    height: 48px;
    border-radius: 6px;
    padding-left: 10px;
    padding-right: 10px;

    &.error {
      border: 1px solid $orderInputCoupons-dialog-cnt-item-error-color;
    }
  }

  .orderInputCoupons-dialog-cnt-item-btn-del,
  .orderInputCoupons-dialog-cnt-item-btn-add {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    text-align: center;
    line-height: 50px;
    margin-left: 30px;

    .iconfont {
      color: #fff;
      font-size: 28px;
    }
  }

  .orderInputCoupons-dialog-cnt-item-btn-add {
    background: #67c23a;
  }

  .orderInputCoupons-dialog-cnt-item-btn-del {
    background: #f56c6c;
  }

  .orderInputCoupons-dialog-cnt-item-error {
    margin-top: 6px;
    padding-left: $orderInputCoupons-dialog-cnt-title-width;;
    color: $orderInputCoupons-dialog-cnt-item-error-color;
    font-size: 24px;
    line-height: 1;
  }
</style>

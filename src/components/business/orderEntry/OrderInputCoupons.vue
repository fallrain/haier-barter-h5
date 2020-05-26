<template>
  <md-dialog
    class="orderModify-coupon-dialog"
    :closable="false"
    v-model="isShow"
    :btns="btns"
  >
    <div>
    </div>
  </md-dialog>
</template>

<script>
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
      ]
    };
  },
  watch: {
    isShow(val) {
      this.$emit('update:isShow', val);
    }
  },
  methods: {
    couponInputDialogConfirm() {
      /* 输入优惠券对话框确认 */
      this.$emit('update:isShow', false);
    },
    couponInputDialogCancel() {
      /* 输入优惠券对话框取消 */
      this.$emit('update:isShow', false);
    },
  }
};
</script>

<style scoped>

</style>

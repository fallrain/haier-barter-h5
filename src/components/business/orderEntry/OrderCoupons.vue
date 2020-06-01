<template>
  <md-dialog
    class="orderCoupons-dialog"
    :closable="false"
    v-model="isShow"
    :btns="btns"
    title="消费券"
  >
    <div class="orderModify-coupon-list-par">
      <ul
        v-if="coupons.length"
        class="orderModify-coupon-list"
      >
        <li
          class="orderModify-coupon-item"
          :class="[item.checked && 'active']"
          v-for="(item,index) in coupons"
          :key="index"
        >
          {{item.couponName}}
        </li>
      </ul>
      <div
        v-else
        class="orderModify-coupon-info"
      >
        暂无优惠券信息
      </div>
    </div>
  </md-dialog>
</template>

<script>
import {
  Dialog
} from 'mand-mobile';

export default {
  name: 'OrderCoupons',
  components: {
    'md-dialog': Dialog,
  },
  props: {
    /* 显示隐藏 */
    isShow: {
      type: Boolean,
      default: false
    },
    // 券
    coupons: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      btns: [
        {
          text: '取消',
          handler: this.couponDialogCancel,
        },
        {
          text: '确定',
          handler: this.couponDialogConfirm,
        }
      ],
    };
  },
  watch: {
    isShow(val) {
      this.$emit('update:isShow', val);
    }
  },
  methods: {
    couponDialogConfirm() {
      /* 查看优惠券对话框确认 */
      const choseCoupons = this.coupons.filter(v => v.checked);
      this.$emit('confirm', choseCoupons);
      this.$emit('update:isShow', false);
    },
    couponDialogCancel() {
      /* 查看优惠券对话框取消 */
      this.$emit('update:isShow', false);
    },
    choose(item) {
      /* 选择 */
      this.$set(item, 'checked', !item.checked);
    }
  }
};
</script>

<style lang="scss">
  .orderCoupons-dialog {
    .md-dialog-body {
      padding: 20px;
      max-height: none;
    }

    .md-dialog-title {
      font-size: 36px;
      font-weight: 600;
      text-align: center;
      height: 68px;
      margin-bottom: 0;
    }

    .md-dialog-content {
      width: 660px;
    }
  }

  .orderModify-coupon-list {
    width: 100%;
  }

  .orderModify-coupon-item {
    height: 68px;
    line-height: 60px;
    margin-bottom: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 22px;
    color: #999;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding-left: 20px;
    padding-right: 20px;

    &.active {
      border: 1px solid #29AB91;
      color: #29AB91;
    }
  }

  .orderModify-coupon-info {
    text-align: center;
  }

  .orderModify-coupon-list-par {
    max-height: 640px;
    overflow-y: auto;
  }
</style>

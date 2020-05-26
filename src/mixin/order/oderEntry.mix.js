export default {
  data() {
    return {
      // 模态框:已领优惠券
      couponDialog: {
        open: false,
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
      },
      // 显示隐藏输入优惠券对话框
      isShowInputCoupons: false
    };
  },
  methods: {
    couponDialogConfirm() {
      /* 查看优惠券对话框确认 */
      this.couponDialog.open = false;
    },
    couponDialogCancel() {
      /* 查看优惠券对话框取消 */
      this.couponDialog.open = false;
    },
    showReceivedCoupons() {
      /* 查看已领取的优惠券 */
      const hasFridge = this.productList.find(v => v.productCategoryCode === 'AA' || v.productCategoryCode === 'AB');
      // 冰箱 冰柜才有优惠券
      if (hasFridge) {
        const userPhone = this.customerInfo.mobile;
        if (!userPhone) {
          this.$dialog.alert({
            content: '请添加顾客'
          });
          return;
        }
        this.orderService.queryAdjCouponInfo({
          userPhone
        }).then(({ code, data }) => {
          if (code === 1) {
            this.receivedCoupons = (data && data[0].service.split(',')) || [];
            this.couponDialog.btns[0].text = this.receivedCoupons.length ? '核销' : '确定';
            this.couponDialog.open = true;
          }
        });
      } else {
        this.$dialog.alert({
          content: '暂无可用消费券'
        });
      }
    },
    showInputCoupons() {
      /* 展示输入优惠券对话框 */
      this.isShowInputCoupons = true;
    }
  }
};

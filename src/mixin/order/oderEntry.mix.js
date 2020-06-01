export default {
  data() {
    return {
      // 模态框:已领优惠券
      couponDialog: {
        open: true,
      },
      // 显示隐藏输入优惠券对话框
      isShowInputCoupons: false,
      // 显示优惠券对话框
      isShowCoupons: false,
      // 已领优惠券
      receivedCoupons: [],
      // 已选择的优惠券
      choseCoupons: []
    };
  },
  computed: {
    queryCouponsTitle() {
      /* 查询优惠券按钮文字 */
      return this.choseCoupons.length ? '重新选择' : '查询优惠券';
    },
    inputCouponsTitle() {
      /* 修改优惠券按钮文字 */
      return this.choseCoupons.length ? '重新选择' : '输入优惠券';
    }
  },
  methods: {
    showChooseCoupons() {
      /* 查看可选的优惠券 */
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
          const receivedCoupons = data || [];
          this.receivedCoupons = receivedCoupons.map(v => ({
            ...v,
            couponName: v.activityName
          }));
          this.isShowCoupons = true;
        }
      });
      // this.$dialog.alert({
      //   content: '暂无可用消费券'
      // });
    },
    showInputCoupons() {
      /* 展示输入优惠券对话框 */
      this.isShowInputCoupons = true;
    },
    showCoupons() {
      /* 展示输入优惠券对话框 */
      this.isShowCoupons = true;
    },
    chooseCouponsConfirm(choseCoupons) {
      /* 选择卡券确认 */
      const choseCouponsTemp = [...this.choseCoupons, ...choseCoupons];
      // activityId不能重复
      this.choseCoupons = choseCouponsTemp.filter((v, index) => {
        const { activityId } = v;
        return choseCouponsTemp.findIndex(searchCoupon => searchCoupon.activityId === activityId) === index;
      });
    },
    orderInputCouponsConfirm(data) {
      /* 核销确认 */
      this.choseCoupons = data.map(v => ({
        couponName: v.msg,
        ...v
      }));
    },
    genChoseCouponsByDetail(data) {
      /* 组合已选优惠券list */
      const {
        couponNum,
        couponName
      } = data;
      const couponNumAy = couponNum.split(',');
      const couponNameAy = couponName.split('&&');
      return couponNumAy.map((v, index) => ({
        entryID: v,
        couponName: couponNameAy[index],
        msg: couponNameAy[index]
      }));
    },
    genCouponName() {
      /* 组合couponNum couponName */
      const couponNumAy = [];
      const couponNameAy = [];
      this.choseCoupons.forEach((v) => {
        couponNumAy.push(v.entryID);
        couponNameAy.push(v.msg);
      });
      // 优惠券id
      const couponNum = couponNumAy.join(',');
      // 优惠券名字
      const couponName = couponNameAy.join('&&');
      return {
        couponNum,
        couponName
      };
    }
  }
};
